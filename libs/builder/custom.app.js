
const ImageMaskEditor = {
    shapes: [
        { name: "none", path: "none" },
        { name: "circle", path: "circle(50% at 50% 50%)" },
        { name: "ellipse", path: "ellipse(50% 40% at 50% 50%)" },
        { name: "triangle", path: "polygon(50% 0%, 0% 100%, 100% 100%)" },
        { name: "diamond", path: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" },
        { name: "pentagon", path: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" },
        { name: "hexagon", path: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" },
        { name: "star", path: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" },
        { name: "chevron", path: "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)" },
        { name: "rhombus", path: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" },
        { name: "trapezium-up", path: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" },
        { name: "trapezium-down", path: "polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)" },
        { name: "rounded-square", path: "inset(0% round 10%)" }
    ],

    init: function () {
        this.addStyles();
        this.renderShapes();
        this.bindEvents();
    },

    addStyles: function () {
        const style = document.createElement('style');
        style.innerHTML = `
            .shapes-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; max-height: 100px; overflow-y: auto; padding-right: 5px; margin-bottom: 10px; }
            .shape-item { width: 100%; aspect-ratio: 1; background: #f8f9fa; border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 2px solid transparent; transition: border-color 0.2s; }
            .shape-item.active, .shape-item:hover { border-color: #0d6efd; }
            .shape { width: 25px; height: 25px; background: #4d555e; }
            .shape.none { background: transparent; position: relative;}
            .shape.none::after { content: '🚫'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #dc3545; font-size: 20px; font-weight: bold; }
            .mask-popup { display: none; position: absolute; bottom: 100%; left: 0; z-index: 1000; background: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15); border: 1px solid #dee2e6; border-radius: 6px; padding: 12px; width: 260px; margin-bottom: 10px; }
            .mask-popup.show { display: block; }
            ${this.shapes.map(s => s.name !== 'none' ? `.shape.${s.name} { clip-path: ${s.path}; }` : '').join('\n')}
        `;
        document.head.appendChild(style);
    },

    renderShapes: function () {
        const shapesGrid = document.querySelector('.shapes-grid');
        if (shapesGrid) {
            shapesGrid.innerHTML = '';
            this.shapes.forEach((shape, index) => {
                const item = document.createElement('div');
                item.className = `shape-item ${index === 0 ? 'active' : ''}`;
                item.dataset.shape = shape.path;
                item.innerHTML = `<div class="shape ${shape.name}"></div>`;
                shapesGrid.appendChild(item);
            });
        }
    },

    bindEvents: function () {
        const maskingBtn = document.getElementById("masking-btn");
        const maskPopup = document.querySelector(".mask-popup");
        const shapesGrid = document.querySelector('.shapes-grid');
        const imagePosition = document.getElementById("image-mask-position");

        if (maskingBtn && maskPopup) {
            maskingBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();

                this.syncSelectedShape();

                const topDistance = maskingBtn.getBoundingClientRect().top;
                if (topDistance > 270) {
                    maskPopup.style.bottom = "100%";
                    maskPopup.style.top = "auto";
                } else {
                    maskPopup.style.bottom = "auto";
                    maskPopup.style.top = "110%";
                }
                maskPopup.classList.toggle("show");
            });

            maskPopup.addEventListener("click", (e) => e.stopPropagation());
        }

        if (shapesGrid) {
            shapesGrid.addEventListener("click", (e) => {
                const item = e.target.closest('.shape-item');
                if (!item) return;

                shapesGrid.querySelectorAll('.shape-item').forEach(el => el.classList.remove('active'));
                item.classList.add('active');

                this.applyStyleToSelected("clip-path", item.dataset.shape);
            });
        }

        if (imagePosition) {
            imagePosition.addEventListener("input", (e) => {
                this.applyStyleToSelected("object-position", e.target.value);
            });
        }
    },

    applyStyleToSelected: function (property, value) {
        const selectedEl = window.Vvveb ? Vvveb.Builder.selectedEl : null;

        if (selectedEl && selectedEl.tagName === "IMG") {
            const oldStyle = selectedEl.getAttribute("style") || "";

            if (property === "clip-path") {
                if (value === "none") {
                    selectedEl.style.removeProperty("clip-path");
                    selectedEl.style.removeProperty("-webkit-clip-path");
                } else {
                    selectedEl.style.clipPath = value;
                    selectedEl.style.WebkitClipPath = value;
                }
            } else if (property === "object-position") {
                if (!value || value.trim() === "") {
                    selectedEl.style.removeProperty("object-position");
                } else {
                    selectedEl.style.objectPosition = value;
                }
            }

            // Record Undo history using Vvveb core
            if (window.Vvveb && Vvveb.Undo) {
                Vvveb.Undo.addMutation({
                    type: "attributes",
                    target: selectedEl,
                    attributeName: "style",
                    oldValue: oldStyle,
                    newValue: selectedEl.getAttribute("style") || ""
                });
            }
        }
    },

    syncSelectedShape: function () {
        const selectedEl = window.Vvveb ? Vvveb.Builder.selectedEl : null;
        const shapesGrid = document.querySelector('.shapes-grid');

        if (!selectedEl || !shapesGrid || selectedEl.tagName !== "IMG") return;

        // Get current clip-path
        let currentClipPath =
            selectedEl.style.clipPath ||
            window.getComputedStyle(selectedEl).clipPath ||
            "none";

        // Normalize browser values
        if (
            !currentClipPath ||
            currentClipPath === "initial" ||
            currentClipPath === "unset"
        ) {
            currentClipPath = "none";
        }

        let matchedItem = null;

        shapesGrid.querySelectorAll('.shape-item').forEach(item => {
            item.classList.remove('active');

            if (item.dataset.shape === currentClipPath) {
                matchedItem = item;
            }
        });

        // If no match found, select "none"
        if (!matchedItem) {
            matchedItem = shapesGrid.querySelector('[data-shape="none"]');
        }

        matchedItem?.classList.add('active');
    }
};

const CustomEmojiPicker = {
    dictionary: {
        smileys: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥲", "🥹", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥸", "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😮‍💨", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🫣", "🤗", "🫡", "🤔", "🤫", "🫠", "🤥", "😶", "😶‍🌫️", "😐", "😑", "😬", "🫨", "😮", "😯", "😲", "🥱", "😴", "🤤", "😪", "😵", "😵‍💫", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿", "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖", "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😾"],
        gestures: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "💋", "🩸"],
        clothing: ["👑", "👒", "🎩", "🎓", "🧢", "🪖", "⛑️", "📿", "💄", "💍", "💎", "🥻", "🩱", "🩲", "🩳", "👙", "👚", "👕", "👖", "👔", "👗", "🥼", "🦺", "🧥", "🧦", "🥾", "👟", "🥿", "👠", "👡", "👢", "🛼", "🛹"],
        nature: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦤", "🦩", "🦚", "🦜", "🦢", "🦘", "🦬", "🐄", "🐖", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🦛", "🐁", "🐀", "🐇", "🐿️", "🦫", "🦔", "🦇", "🦥", "🦦", "🦨", "🦡", "🐾", "🐉", "🐲", "🌵", "🎄", "🌲", "🌳", "🌴", "🪵", "🌱", "🌿", "☘️", "🍀", "🎍", "🪴", "🎋", "🍃", "🍂", "🍁", "🍄", "🐚", "🪨", "🌾", "💐", "🌷", "🌹", "🥀", "🌺", "🌸", "🌼", "🌻"],
        food: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🥛", "☕", "🫖", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧋", "🧃", "🧉", "🧊"],
        activities: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🤼", "🤸", "⛹️", "🤾", "🧗", "🤺", "🧘", "🏄", "🏊", "🤽", "🚣", "🏇", "🚴", "🚵", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎫", "🎟️", "🎪", "🤹", "🎭", "🩰", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🪘", "🎷", "🎺", "🎸", "🪕", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩"],
        travel: ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🛵", "🚲", "🛴", "🦽", "🦼", "🛺", "🚉", "🚊", "🚝", "🚄", "🚅", "🚈", "🚂", "🚆", "🚇", "🚏", "🚢", "🛳️", "🛥️", "🚤", "⛴️", "⛵", "✈️", "🛩️", "🛫", "🛬", "💺", "🚁", "🚟", "🚠", "🚡", "🚀", "🛸", "🛰️", "🗺️", "🧭", "🏔️", "⛰️", "🌋", "🗻", "🏕️", "🏖️", "🏜️", "🏝️", "🏟️", "🏛️", "🏗️", "🧱", "🏘️", "🏚️", "🏠", "🏡", "🏢", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰", "💒", "🗼", "🗽", "⛪", "🕌", "🛕", "🕍", "⛩️", "🕋"],
        objects: ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸", "💵", "💴", "💶", "💷", "🪙", "💰", "💳", "⚖️", "🪜", "🧰", "🪛", "🔧", "🔨", "⚒️", "🛠️", "⛏️", "🪓", "🪚", "🔩", "⚙️", "🪤", "⛓️", "🧲", "🔫", "💣", "🧨", "🔪", "🗡️", "⚔️", "🛡️", "🚬", "⚰️", "🪦", "⚱️", "🏺", "🔮", "🧿", "💈", "🧪", "🔬", "🔭", "💉", "💊", "🩹", "🩺", "🩻", "🧬"],
        symbols: ["💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️", "❤️‍🔥", "❤️‍🩹", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤎", "🤍", "💯", "💢", "💥", "💫", "💦", "💨", "🕳️", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤", "🌐", "🌀", "♠️", "♥️", "♦️", "♣️", "🃏", "🀄", "🎴", "🔇", "🔈", "🔉", "🔊", "📢", "📣", "📯", "🔔", "🔕", "🎵", "🎶", "✴️", "✳️", "➕", "➖", "➗", "✖️", "♾️", "💲", "💱", "™️", "©️", "®️", "👁️", "🔤", "🔡", "🔠", "🔣"],
        flags: ["🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍⚧️", "🏴‍☠️"]
    },

    keywords: {
        "smile happy face grin joy laugh haha": ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃"],
        "wink flirt tease eye": ["😉", "😜", "😝", "😛", "😋"],
        "love heart kiss romance affection crush infatuate": ["😍", "🥰", "😘", "😗", "😙", "😚"],
        "cool glasses nerd smart sunglasses genius": ["😎", "🤓", "🧐", "🥸"],
        "party celebrate birthday fun": ["🥳"],
        "smirk cheeky sly proud": ["😏", "😌"],
        "sad cry tear sorrow bad depressed upset disappointed": ["🥲", "😢", "😭", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖"],
        "tired exhaust wear weary sigh groan": ["😫", "😩", "😮‍💨"],
        "plead beg puppy eyes cute": ["🥺", "🥹"],
        "angry mad hate rage furious annoyed curse swear": ["😤", "😠", "😡", "🤬", "👿", "😾"],
        "shock surprise wow gasp explode mind blown": ["🤯", "😳", "😱", "😨", "😰", "😥", "😓", "😮", "😯", "😲"],
        "scare peek hide shy": ["🫣", "🫣"],
        "hug embrace care open": ["🤗"],
        "salute respect sir army": ["🫡"],
        "think wonder ponder chin": ["🤔"],
        "shh quiet secret hush silence": ["🤫", "🤐", "😶"],
        "melt liquid disappear soft": ["🫠"],
        "lie pinocchio nose fake": ["🤥"],
        "neutral straight face blank sigh": ["😐", "😑"],
        "awkward cringe yikes teeth": ["😬"],
        "shake tremble earthquake vibrate": ["🫨"],
        "sleep tired bed snore yawn sleepy awake rest": ["😴", "🤤", "😪", "🥱", "💤"],
        "dizzy confused spinning hypnosis cross eyes": ["😵", "😵‍💫"],
        "drunk woozy tipy": ["🥴"],
        "sick ill vomit cold hot fever gross health medicine": ["🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🥶", "🥵"],
        "money rich dollar wealthy cash": ["🤑"],
        "cowboy hat western texas": ["🤠"],
        "evil devil horn bad demon": ["😈", "👿", "👹", "👺"],
        "clown joke circus funny": ["🤡"],
        "poop shit crap funny gross toilet": ["💩"],
        "ghost scary spooky spirit halloween skull death bone": ["👻", "💀", "☠️", "🎃"],
        "alien space ufo martian extraterrestrial": ["👽", "👾", "🛸"],
        "robot bot tech ai mechanical machine": ["🤖", "⚙️"],
        "cat kitty kitten meow feline pet": ["😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😾"],
        "hand point gesture wave stop hello hi greeting bye": ["👋", "🤚", "🖐️", "✋", "🖖"],
        "ok yes approve good perfect check correct tick": ["👍", "👌", "✅", "💯", "✔️", "☑️"],
        "no stop cancel bad wrong cross x fail down": ["👎", "✋", "🚫", "🛑", "❌", "✖️", "❎"],
        "pinch tiny small little": ["🤌", "🤏"],
        "peace victory v two scissors": ["✌️", "🤞"],
        "love finger heart snap sign": ["🫰", "🤟", "🤘", "🤙"],
        "point direction look index left right up down": ["👈", "👉", "👆", "🖕", "👇", "☝️"],
        "fist punch hit bro bump strike": ["✊", "👊", "🤛", "🤜"],
        "clap applause bravo hand wash wash open pray please thanks": ["👏", "🙌", "👐", "🤲", "🤝", "🙏"],
        "write pen sign nail polish beauty makeup selfie phone": ["✍️", "💅", "🤳"],
        "muscle strong arm flex bicep leg foot kick step body": ["💪", "🦾", "🦿", "🦵", "🦶"],
        "ear hear listen nose smell scent breath organ": ["👂", "🦻", "👃", "🫁"],
        "brain mind think smart organ heart vein teeth bone skeleton": ["🧠", "🫀", "🦷", "🦴", "🩸"],
        "eye see look watch vision tongue lick lips kiss mouth": ["👀", "👁️", "👅", "👄", "💋"],
        "crown king queen royal hat cap graduation magic hat": ["👑", "👒", "🎩", "🎓", "🧢", "🪖", "⛑️"],
        "jewelry ring diamond pearl marry wedding makeup lipstick": ["📿", "💄", "💍", "💎"],
        "shirt clothes pants dress tie suit jacket coat sock underwear": ["👚", "👕", "👖", "👔", "👗", "🥼", "🦺", "🧥", "🧦", "🩱", "🩲", "🩳", "👙"],
        "shoes boot heel run sneaker walk skate": ["🥾", "👟", "🥿", "👠", "👡", "👢", "🛼", "🛹"],
        "animal pet dog puppy hound": ["🐶", "🦮", "🐩"],
        "cat kitten feline meow": ["🐱", "🐈", "🐈‍⬛"],
        "mouse rat hamster rodent": ["🐭", "🐁", "🐀", "🐹"],
        "rabbit bunny hop spring": ["🐰", "🐇"],
        "fox orange wild forest": ["🦊"],
        "bear panda koala polar brown": ["🐻", "🐼", "🐻‍❄️", "🐨"],
        "tiger lion roar wild cat": ["🐯", "🦁"],
        "cow pig farm bacon pork moo": ["🐮", "🐄", "🐷", "🐖", "🐽"],
        "frog toad green pond hop": ["🐸"],
        "monkey ape gorilla primate chimp": ["🐵", "🙈", "🙉", "🙊", "🐒", "🦍", "🦧"],
        "chicken bird duck fly wings eagle owl feather": ["🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦤", "🦩", "🦚", "🦜", "🦢"],
        "sheep goat ram wool": ["🐏", "🐑", "🐐"],
        "camel desert sand animal": ["🐪", "🐫", "🦙"],
        "elephant rhino hippo giraffe heavy large zoo": ["🦒", "🐘", "🦣", "🦏", "🦛"],
        "squirrel hedgehog beaver badger bat sloth otter skunk kangaroo paw": ["🐿️", "🦫", "🦔", "🦇", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾"],
        "dragon dinosaur lizard monster fire": ["🐉", "🐲"],
        "tree plant wood leaf nature green spring fall autumn flower grass garden": ["🌵", "🎄", "🌲", "🌳", "🌴", "🪵", "🌱", "🌿", "☘️", "🍀", "🎍", "🪴", "🎋", "🍃", "🍂", "🍁"],
        "flower rose tulip sunflower blossom bloom bouquet": ["💐", "🌷", "🌹", "🥀", "🌺", "🌸", "🌼", "🌻"],
        "mushroom rock stone shell beach nature": ["🍄", "🐚", "🪨"],
        "food fruit sweet fresh apple pear orange lemon banana watermelon grape strawberry cherry peach mango pineapple coconut kiwi": ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝"],
        "veg vegetable healthy tomato eggplant avocado broccoli lettuce cucumber pepper corn carrot onion garlic potato sweet": ["🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠"],
        "bread carb bake toast croissant bagel pretzel pancake waffle": ["🥐", "🥯", "🍞", "🥖", "🥨", "🥞", "🧇"],
        "meat cook beef chicken bacon pork steak hotdog burger fries pizza sandwich taco burrito": ["🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙", "🧆"],
        "egg cook breakfast pan pot soup salad popcorn butter salt can bento rice noodle pasta sushi seafood": ["🥚", "🍳", "🥘", "🍲", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍢", "🍣", "🍤", "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦪"],
        "dessert sweet sugar ice cream donut cookie cake pie chocolate candy lollipop honey": ["🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯"],
        "drink liquid water milk coffee tea hot cold juice cup alcohol wine beer cocktail cheers ice bobba": ["🥛", "☕", "🫖", "🍵", "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤", "🧋", "🧃", "🧉", "🧊"],
        "sport play game ball soccer football basketball baseball tennis volleyball rugby pool ping pong hockey cricket golf box martial board ski skate surf swim gym bowl dart": ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🤼", "🤸", "⛹️", "🤾", "🧗", "🤺", "🧘", "🏄", "🏊", "🤽", "🚣", "🏇", "🚴", "🚵", "🎯", "🎳"],
        "win prize medal trophy ribbon ticket event circus juggle mask art paint movie mic sing music headphone piano drum guitar violin": ["🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎫", "🎟️", "🎪", "🤹", "🎭", "🩰", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🪘", "🎷", "🎺", "🎸", "🪕", "🎻"],
        "video game console controller dice chess puzzle luck play": ["🎲", "♟️", "🎮", "🎰", "🧩"],
        "car auto vehicle drive road taxi bus police ambulance fire truck tractor bike scooter train wheel metro station stop": ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🛵", "🚲", "🛴", "🦽", "🦼", "🛺", "🚉", "🚊", "🚝", "🚄", "🚅", "🚈", "🚂", "🚆", "🚇", "🚏"],
        "boat ship sail water cruise plane fly flight travel air helicopter rocket space satellite map compass": ["🚢", "🛳️", "🛥️", "🚤", "⛴️", "⛵", "✈️", "🛩️", "🛫", "🛬", "💺", "🚁", "🚟", "🚠", "🚡", "🚀", "🛸", "🛰️", "🗺️", "🧭"],
        "mountain hill volcano earth camp tent beach island stadium building house home city bank hospital school factory castle tower church temple": ["🏔️", "⛰️", "🌋", "🗻", "🏕️", "🏖️", "🏜️", "🏝️", "🏟️", "🏛️", "🏗️", "🧱", "🏘️", "🏚️", "🏠", "🏡", "🏢", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰", "💒", "🗼", "🗽", "⛪", "🕌", "🛕", "🕍", "⛩️", "🕋"],
        "watch time clock phone mobile text call screen laptop pc computer keyboard print mouse tape disc camera photo video movie radio tv mic sound compass hourglass battery plug wire light bulb flash candle": ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🪔"],
        "fire flame burn extinguisher oil barrel tool fix measure hammer wrench axe saw screw gear magnet tool ladder scale box": ["🧯", "🛢️", "⚖️", "🪜", "🧰", "🪛", "🔧", "🔨", "⚒️", "🛠️", "⛏️", "🪓", "🪚", "🔩", "⚙️", "🪤", "⛓️", "🧲"],
        "money cash dollar pay buy rich bill coin card jewel gem crystal": ["💸", "💵", "💴", "💶", "💷", "🪙", "💰", "💳", "💎"],
        "weapon gun bomb explosion knife sword shield dead coffin grave urn crystal magic pill blood needle health doctor dna": ["🔫", "💣", "🧨", "🔪", "🗡️", "⚔️", "🛡️", "🚬", "⚰️", "🪦", "⚱️", "🏺", "🔮", "🧿", "💈", "🧪", "🔬", "🔭", "💉", "💊", "🩹", "🩺", "🩻", "🧬"],
        "heart love shape emotion break heal fire color pink red orange yellow green blue purple black white brown": ["💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "❣️", "💔", "❤️", "❤️‍🔥", "❤️‍🩹", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤎", "🤍"],
        "100 perfect score anger comic splash sleep hole chat text talk thought globe spin card suit loud sound bell note math add subtract multiply divide infinity money brand trademark copyright eye text symbol abc": ["💯", "💢", "💥", "💫", "💦", "💨", "🕳️", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "💤", "🌐", "🌀", "♠️", "♥️", "♦️", "♣️", "🃏", "🀄", "🎴", "🔇", "🔈", "🔉", "🔊", "📢", "📣", "📯", "🔔", "🔕", "🎵", "🎶", "✴️", "✳️", "➕", "➖", "➗", "✖️", "♾️", "💲", "💱", "™️", "©️", "®️", "👁️", "🔤", "🔡", "🔠", "🔣"],
        "flag race country pride pirate japan white flag": ["🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍⚧️", "🏴‍☠️"]
    },

    maxRecentEmojis: 21,
    savedRange: null,
    isInitialized: false,

    init: function () {
        this.bindEvents();
    },

    getRecentEmojis: function () {
        const recents = localStorage.getItem("vvveb-recent-emojis");
        return recents ? JSON.parse(recents) : ["😀", "👍", "❤️", "✨", "🔥", "😂", "🎉"];
    },

    saveRecentEmoji: function (emoji) {
        let recents = this.getRecentEmojis();
        recents = recents.filter(e => e !== emoji);
        recents.unshift(emoji);
        if (recents.length > this.maxRecentEmojis) recents = recents.slice(0, this.maxRecentEmojis);
        localStorage.setItem("vvveb-recent-emojis", JSON.stringify(recents));
    },

    renderRecentSection: function () {
        const viewport = document.querySelector(".emoji-scroll-viewport");
        if (!viewport) return;
        let recentSection = viewport.querySelector('[data-cat-id="recent"]');

        if (!recentSection) {
            recentSection = document.createElement("div");
            recentSection.className = "emoji-category-section active";
            recentSection.dataset.catId = "recent";
            viewport.insertBefore(recentSection, viewport.firstChild);
        }

        recentSection.innerHTML = "";
        this.getRecentEmojis().forEach(emojiString => {
            const btn = document.createElement("button");
            btn.className = "emoji-btn";
            btn.type = "button";
            btn.textContent = emojiString;
            recentSection.appendChild(btn);
        });
    },

    initializePickerUI: function () {
        const container = document.getElementById("emoji-picker-container");
        if (!container) return;
        container.classList.add("phone-emoji-picker");

        container.innerHTML = `
            <div class="emoji-search-wrapper">
                <input type="text" class="emoji-search-input" placeholder="Search emoji..." autocomplete="off">
            </div>
            <div class="emoji-scroll-viewport"></div>
            <div class="outer-emoji-category-tabs">
            <div class="emoji-category-tabs">
                <button class="category-tab active" data-category="recent" title="Recently Used">🕒</button>
                <button class="category-tab" data-category="smileys" title="Smileys">😀</button>
                <button class="category-tab" data-category="gestures" title="Gestures">👍</button>
                <button class="category-tab" data-category="clothing" title="Clothing">👕</button>
                <button class="category-tab" data-category="nature" title="Nature">🐱</button>
                <button class="category-tab" data-category="food" title="Food">🍎</button>
                <button class="category-tab" data-category="activities" title="Activities">⚽</button>
                <button class="category-tab" data-category="travel" title="Travel">🚗</button>
                <button class="category-tab" data-category="objects" title="Objects">💡</button>
                <button class="category-tab" data-category="symbols" title="Symbols">❤️</button>
                <button class="category-tab" data-category="flags" title="Flags">🏁</button>
            </div>
            </div>
        `;

        const viewport = container.querySelector(".emoji-scroll-viewport");
        const searchInput = container.querySelector(".emoji-search-input");
        const tabsContainer = container.querySelector(".emoji-category-tabs");

        this.renderRecentSection();

        Object.keys(this.dictionary).forEach((categoryName) => {
            const section = document.createElement("div");
            section.className = "emoji-category-section";
            section.dataset.catId = categoryName;

            this.dictionary[categoryName].forEach(emojiString => {
                const btn = document.createElement("button");
                btn.className = "emoji-btn";
                btn.type = "button";
                btn.textContent = emojiString;
                section.appendChild(btn);
            });
            viewport.appendChild(section);
        });

        const searchResults = document.createElement("div");
        searchResults.className = "emoji-category-section";
        searchResults.dataset.catId = "search-results";
        viewport.appendChild(searchResults);

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();
            const allSections = viewport.querySelectorAll(".emoji-category-section");

            if (!query) {
                allSections.forEach(sec => sec.classList.remove("active"));
                const activeTab = tabsContainer.querySelector(".category-tab.active");
                if (activeTab) {
                    viewport.querySelector(`[data-cat-id="${activeTab.dataset.category}"]`).classList.add("active");
                }
                return;
            }

            allSections.forEach(sec => sec.classList.remove("active"));
            searchResults.classList.add("active");
            searchResults.innerHTML = "";

            let matchedEmojis = new Set();
            let exactMatchesFound = false;

            Object.keys(this.keywords).forEach(keywordString => {
                const keywords = keywordString.split(" ");
                const isMatch = keywords.some(word => word.startsWith(query));

                if (isMatch) {
                    this.keywords[keywordString].forEach(emj => matchedEmojis.add(emj));
                    exactMatchesFound = true;
                }
            });

            if (!exactMatchesFound) {
                Object.keys(this.dictionary).forEach(cat => {
                    if (cat.includes(query)) {
                        this.dictionary[cat].forEach(emj => matchedEmojis.add(emj));
                    }
                });
            }

            if (matchedEmojis.size > 0) {
                matchedEmojis.forEach(emojiString => {
                    const btn = document.createElement("button");
                    btn.className = "emoji-btn";
                    btn.type = "button";
                    btn.textContent = emojiString;
                    searchResults.appendChild(btn);
                });
            } else {
                searchResults.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 30px 10px; color: #8e8e93; font-family: sans-serif;">
                        <div style="font-size: 24px; margin-bottom: 8px;">🤔</div>
                        <div style="font-size: 14px;">No emojis found for "${query}"</div>
                    </div>`;
            }
        });

        searchInput.addEventListener("click", (e) => e.stopPropagation());

        viewport.addEventListener("click", (event) => {
            const btn = event.target.closest(".emoji-btn");
            if (!btn) return;

            const chosenEmoji = btn.textContent;
            this.saveRecentEmoji(chosenEmoji);
            this.insertEmojiAtCursor(chosenEmoji);

            searchInput.value = "";
            searchInput.dispatchEvent(new Event('input'));

            container.style.display = "none";
        });

        tabsContainer.addEventListener("click", (e) => {
            const tab = e.target.closest(".category-tab");
            if (!tab) return;

            searchInput.value = "";

            tabsContainer.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const targetCategory = tab.dataset.category;
            if (targetCategory === "recent") this.renderRecentSection();

            viewport.querySelectorAll(".emoji-category-section").forEach(sec => {
                sec.classList.toggle("active", sec.dataset.catId === targetCategory);
            });

            viewport.scrollTop = 0;
        });

        this.isInitialized = true;
    },

    bindEvents: function () {
        const emoticonPicker = document.getElementById("emoticon-picker");

        if (emoticonPicker) {
            emoticonPicker.addEventListener("click", (e) => {
                e.stopPropagation();

                const container = document.getElementById("emoji-picker-container");
                if (!container) return;

                if (container.style.display === "flex" || container.style.display === "block") {
                    container.style.display = "none";
                    return;
                }

                if (window.Vvveb && window.Vvveb.Builder && window.Vvveb.Builder.iframe) {
                    const iframeWindow = Vvveb.Builder.iframe.contentWindow;
                    const selection = iframeWindow.getSelection();

                    if (selection.rangeCount > 0) {
                        this.savedRange = selection.getRangeAt(0);
                    }
                }

                if (!this.isInitialized) {
                    this.initializePickerUI();
                } else {
                    this.renderRecentSection();
                    const tabsContainer = container.querySelector(".emoji-category-tabs");
                    tabsContainer.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
                    tabsContainer.querySelector('[data-category="recent"]').classList.add("active");

                    container.querySelectorAll(".emoji-category-section").forEach(sec => {
                        sec.classList.toggle("active", sec.dataset.catId === "recent");
                    });
                }

                container.style.display = "flex";

                const rect = emoticonPicker.getBoundingClientRect();
                const pickerHeight = 360;
                const gap = 10;

                const spaceAbove = rect.top;
                const spaceBelow = window.innerHeight - rect.bottom;

                container.style.left = `0px`;

                if (spaceAbove >= (pickerHeight + gap) && spaceAbove > spaceBelow) {
                    container.style.bottom = `100%`;
                    container.style.top = `auto`;
                    container.classList.add("open-top");
                    container.classList.remove("open-bottom");
                } else {
                    container.style.top = `100%`;
                    container.style.bottom = `auto`;
                    container.classList.add("open-bottom");
                    container.classList.remove("open-top");
                }
            });
        }

        document.addEventListener("click", (e) => {
            const container = document.getElementById("emoji-picker-container");
            if (container && (container.style.display === "block" || container.style.display === "flex") && !container.contains(e.target)) {
                container.style.display = "none";
            }
        });
    },

    insertEmojiAtCursor: function (emoji) {
        if (!window.Vvveb || !window.Vvveb.Builder || !window.Vvveb.Builder.iframe) return;

        const iframeWindow = Vvveb.Builder.iframe.contentWindow;
        const iframeDoc = iframeWindow.document;

        iframeWindow.focus();

        if (!this.savedRange) return;

        const selection = iframeWindow.getSelection();

        selection.removeAllRanges();
        selection.addRange(this.savedRange);

        const textNode = iframeDoc.createTextNode(emoji);

        this.savedRange.deleteContents();
        this.savedRange.insertNode(textNode);

        this.savedRange.setStartAfter(textNode);
        this.savedRange.setEndAfter(textNode);

        selection.removeAllRanges();
        selection.addRange(this.savedRange);

        Vvveb.Builder.selectNode(
            textNode.parentElement || textNode.parentNode
        );
    }
};

// Initialize both editors when the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    ImageMaskEditor.init();
    CustomEmojiPicker.init();
});

document.addEventListener("click", () => {
    const maskPanel = document.getElementById("mask-popup");
    if (maskPanel.classList.contains("show")) {
        maskPanel.classList.remove("show");
    }
});