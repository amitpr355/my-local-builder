
// New Code for Ai Writer Api

window.AIWriterAPI = {
  async generate({ action, tone, selectedText, userPrompt, hint }) {
    const cfg = window.chatgptOptions || {};
    // if (!cfg.key) throw new Error("No API key configured");

    const AI_DEBUG = true; // false kar do prod me

    // -----------------------------
    // Helpers
    // -----------------------------
    const countWords = (s = "") =>
      s.trim().split(/\s+/).filter(Boolean).length;

    const normalizeTone = (t) => {
      const toneKey = (t || "default").toLowerCase();

      const presets = {
        default: "Use a neutral, clear, website-friendly tone.",
        neutral: "Use a neutral, clear, website-friendly tone.",
        professional:
          "Use formal, concise, confident business language. Avoid slang.",
        friendly:
          "Use warm, conversational language. Slightly upbeat. Avoid being cheesy.",
        luxury:
          "Use premium, elegant wording. Refined and polished. Avoid casual slang.",
        bold: "Use punchy, confident short sentences. Strong verbs. No filler.",
        casual: "Use relaxed, informal wording. Natural and simple.",
        direct: "Be straight to the point. Minimal words. No fluff.",
      };

      return presets[toneKey] || `Use this tone: ${t}.`;
    };

    const getTemperature = (act) => {
      // If user configured global temperature, respect it.
      if (cfg.temperature !== undefined && cfg.temperature !== null) {
        return cfg.temperature;
      }

      const tempByAction = {
        grammar: 0.1,
        shorten: 0.25,
        expand: 0.35,
        rewrite: 0.6,
        catchy: 0.75,
        write: 0.7,
        transform: 0.55,
      };

      return tempByAction[act] ?? 0.35;
    };

    // -----------------------------
    // Pre-compute values
    // -----------------------------
    const toneGuide = normalizeTone(tone);
    const temperature = getTemperature(action);

    const srcText = (selectedText || "").trim();
    const srcWords = srcText ? countWords(srcText) : 0;

    // token budgeting (kept from your logic)
    let maxTokens = 120;
    let extraWords = 12;
    let targetShortWords = 0;

    if (action === "shorten") {
      const ratio =
        srcWords <= 12 ? 0.85 :
        srcWords <= 30 ? 0.7 :
        srcWords <= 60 ? 0.6 : 0.55;

      targetShortWords = Math.max(6, Math.round(srcWords * ratio));
      maxTokens = Math.ceil(targetShortWords * 1.6) + 30;
    }

    if (action === "expand") {
      extraWords = 10;
      if (srcWords > 30) extraWords = 12;
      if (srcWords > 60) extraWords = 15;

      const targetWords = srcWords + extraWords;
      maxTokens = Math.ceil(targetWords * 1.6) + 30;
    }

    // -----------------------------
    // Prompts
    // -----------------------------
    const buildSystemPrompt = () => {
      if (hint) return hint;

      const instructionsByAction = {
    transform: `
You are an expert website copywriter.

Your job:
1. Understand the USER INTENT.
2. Decide what change is required (shorten, expand, rewrite, simplify, etc.).
3. Apply that change correctly.

CRITICAL RULES:
- If the intent is to SHORTEN, the output MUST have fewer words than the original.
- Aim for at least 30–40% fewer words unless the text is already very short.
- If the intent is to EXPAND, the output MUST have more words than the original.
- Style (catchy, luxury, friendly, etc.) must NEVER override length intent.
- If the user specifies word/character limits, obey them strictly.

Style guide:
${toneGuide}

Output ONLY the final transformed text.
`.trim(),


        rewrite: `
Rewrite the text with the SAME meaning but noticeably different phrasing.
STRICT:
- Keep meaning the same
- Change sentence structure and wording (avoid close paraphrase)
- Keep length roughly similar
- Style guide: ${toneGuide}
Output ONLY the rewritten text.
        `.trim(),

        shorten: `
Shorten the text while keeping the meaning and tone.

STRICT RULES:
- Keep the core message intact (no new info)
- Remove filler, repetition, and weak phrases
- Improve clarity (rewrite, not just delete)
- Output as ONE paragraph
- Target length: about ${targetShortWords || "60%"} words
- End with a complete sentence and a full stop (.)

Style guide: ${toneGuide}
Output ONLY the shortened text.
        `.trim(),

        expand: `
Expand the given text by adding about ${extraWords} extra words.

STRICT RULES:
- Keep the SAME topic and meaning (no new ideas)
- Keep the SAME style and voice as the original
- Add only 1 short supporting sentence OR a few extra words (not multiple paragraphs)
- Do NOT write a vision/mission statement
- Do NOT add generic inspirational lines
- Output must be a single paragraph
- ALWAYS end with a complete sentence and a full stop (.)

Style guide: ${toneGuide}
Output ONLY the expanded text.
        `.trim(),

        write: `
Write fresh text suitable for this page element.
Style guide: ${toneGuide}
Output ONLY the text.
        `.trim(),

        catchy: `
Make the text more catchy and punchy (marketing-friendly, not spammy).
Style guide: ${toneGuide}
Output ONLY the improved text.
        `.trim(),

        grammar: `
Fix grammar, spelling, punctuation.
Keep wording as close as possible.
Style guide: ${toneGuide}
Output ONLY the corrected text.
        `.trim(),
      };

      return instructionsByAction[action] || instructionsByAction.rewrite;
    };


//     try {
//   const res = await window.AIWriterAPI.generate(opts);
// } catch (e) {
 
//   throw e;
// }

    const buildUserContent = () => `
ORIGINAL TEXT:
${srcText}

TONE REQUIREMENT:
${toneGuide}

USER INSTRUCTION (follow exactly, do not ignore):
${(userPrompt || "").trim()}

Return ONLY the final text. No bullets, no explanation.
    `.trim();


//     if (AI_DEBUG) {
//   console.groupCollapsed(
//     `%c[AI REQUEST] ${action.toUpperCase()} | tone: ${tone}`,
//     "color:#6366f1;font-weight:bold"
//   );

//   console.log("Action:", action);
//   console.log("Tone:", tone);
//   console.log("Temperature:", temperature);
//   console.log("Max tokens:", maxTokens);

//   console.log("Selected text:", selectedText);
//   console.log("User prompt:", userPrompt);

//   console.log("System prompt:", buildSystemPrompt());
//   console.log("User message:", buildUserContent());

//   console.groupEnd();
// }


    // const payload = {
    //   model: cfg.model || "gpt-4o-mini",
    //   temperature,
    //   max_tokens: maxTokens,
    //   messages: [
    //     { role: "system", content: buildSystemPrompt() },
    //     { role: "user", content: buildUserContent() },
    //   ],
    // };

    // -----------------------------
    // Request
    // -----------------------------
//     const res = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${cfg.key}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       const msg = data?.error?.message || "OpenAI request failed";
//       throw new Error(msg);
//     }

//     let text = data.choices?.[0]?.message?.content?.trim() || "";

 
// const inputCount = countWords(srcText);
// const outputCount = countWords(text);
// const intent = (userPrompt || "").toLowerCase();

// const wantsShorter = /short|brief|concise|smaller|less/i.test(intent);
// const wantsLonger = /longer|expand|elaborate|more detail/i.test(intent);

// // 🔁 Silent retry ONCE if rule breaks
// if (
//   action === "transform" &&
//   (
//     (wantsShorter && outputCount >= inputCount) ||
//     (wantsLonger && outputCount <= inputCount)
//   )
// ) {
//   // if (AI_DEBUG) {
//   //   console.warn("[AI RETRY] Output violated length intent. Retrying...");
//   // }

//   const retryPayload = {
//     ...payload,
//     messages: [
//       payload.messages[0],
//       {
//         role: "user",
//         content: `
// Your previous output did not follow the length requirement.

// Original word count: ${inputCount}
// Your output word count: ${outputCount}

// Rewrite again and FIX THIS.
// Return ONLY the corrected text.
//         `.trim(),
//       },
//     ],
//   };

//   const retryRes = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${cfg.key}`,
//     },
//     body: JSON.stringify(retryPayload),
//   });

//   const retryData = await retryRes.json();
//   text =
//     retryData.choices?.[0]?.message?.content?.trim() || text;
// }

//     const usedTokens = data.usage?.total_tokens || 0;

// //     if (AI_DEBUG) {
// //   console.groupCollapsed(
// //     `%c[AI RESPONSE] ${action.toUpperCase()}`,
// //     "color:#16a34a;font-weight:bold"
// //   );

// //   console.log("Output text:", text);
// //   console.log("Used tokens:", usedTokens);
// //   console.log("Full usage:", data.usage);

// //   console.groupEnd();
// // }

// // if (AI_DEBUG) {
// //   console.table({
// //     action,
// //     tone,
// //     temperature,
// //     input_words: (selectedText || "").split(/\s+/).length,
// //     output_words: (text || "").split(/\s+/).length,
// //     input_preview: selectedText?.slice(0, 80),
// //     output_preview: text?.slice(0, 80),
// //   });
// // }



//     // Keep your expand punctuation safeguard
//     if (action === "expand" && text && !/[.!?]$/.test(text)) text += ".";

//     return { text, usedTokens, usage: data.usage || {} };
await window.ZigrowTokenAPI._ensureCsrf();
const status = await window.ZigrowTokenAPI.status();

if (Number(status?.remaining_tokens ?? 0) <= 0) {
  throw new Error("Token limit exhausted. Please upgrade to continue.");
}

const xsrf = window.ZigrowTokenAPI._xsrfHeader();

const res = await fetch("/user/ai-writer/generate", {
  method: "POST",
  credentials: "include",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "X-XSRF-TOKEN": xsrf,
  },
  body: JSON.stringify({
    action,
    tone,
    text: srcText,             // selectedText
    userPrompt: (userPrompt || "").trim(),
    hint: buildSystemPrompt(), // optional
    maxTokens,                 // optional if backend wants it
    temperature,               // optional if backend wants it
    model: cfg.model || "gpt-4o-mini", // optional
  }),
});

const data = await window.ZigrowTokenAPI._safeJson(res);

if (!res.ok) {
  throw new Error(data?.message || "AI Writer failed");
}

if (data?.tokenStatus && window.updateTokenUI) {
  window.updateTokenUI(data.tokenStatus);
}


let text = (data.text || "").trim();
const usedTokens = Number(data.usedTokens || 0);

if (action === "expand" && text && !/[.!?]$/.test(text)) {
  text += ".";
}

return { text, usedTokens, usage: data.usage || {} };

  },
};






window.ZigrowTokenAPI ={
      _csrfReady: false,

  async _ensureCsrf() {
    if (this._csrfReady) return;

    // ✅ this sets XSRF-TOKEN cookie
    await fetch("/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
      headers: {
        "Accept": "application/json",
      },
    });

    this._csrfReady = true;
  },
  
  _getCookie(name) {
    const m = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
    return m ? m[2] : "";
  },

  _xsrfHeader() {
    const raw = this._getCookie("XSRF-TOKEN");
    return raw ? decodeURIComponent(raw) : "";
  },

  async _safeJson(res) {
    const text = await res.text();
    try { return JSON.parse(text); }
    catch { return { message: text?.slice(0, 200) || "Non-JSON response" }; }
  },

 async status() {
    const res = await fetch("/user/tokens/status", {
      method: "GET",
      credentials: "include",
      headers: { "Accept": "application/json" },
    });

    const data = await this._safeJson(res);
    if (!res.ok) throw new Error(data?.message || "Failed to fetch token status");

    if(window.updateTokenUI) window.updateTokenUI(data)
    return data;
  },

     async consume(tokens) {
    await this._ensureCsrf(); 

    const xsrf = this._xsrfHeader();

    const res = await fetch("/user/tokens/consume", {
      method: "POST",
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-XSRF-TOKEN": xsrf, // ✅ IMPORTANT
      },
      body: JSON.stringify({ tokens: Number(tokens || 0) }),
    });

    const data = await this._safeJson(res);
    if (!res.ok) throw new Error(data?.message || "Failed to consume tokens");

    if(window.updateTokenUI) window.updateTokenUI(data)
    return data;
  },

}





// document.querySelector("#select-actions #edit-code-btn").after(generateElements('<a id="ai-assistant-btn" href="" title="AI assistant"><i class="icon-color-wand"></i></a>')[0]);

// let aiResponseTemplate = `
// <div class="response">
// 	<div class="content">

// 		<div class="card">
// 		  <div class="card-body">
// 			<h5 class="card-title">Welcome to our website!</h5>
// 			<p class="card-text">Thank you for visiting our site. We hope you find everything you need.</p>
// 			<button class="btn btn-primary">Learn More</button>
// 		  </div>
// 		</div>

// 	</div>
	
// 	<div class="ai-actions">
// 		<button type="button" class="btn btn-sm btn-outline-primary btn-insert"><i class="icon-arrow-up"></i>Insert content</button>
// 		<button type="button" class="btn btn-sm btn-outline-primary btn-replace"><i class="icon-swap-horizontal-outline"></i> Replace with</button>
// 	</div>
// </div>	
// `;
			
// let aiModalTemplate = `<div class="modal fade" id="ai-assistant-modal" tabindex="-1" role="dialog" aria-labelledby="textarea-modal" aria-hidden="true">
//   <div class="modal-dialog modal-lg" role="document">
//     <div class="modal-content">
//       <div class="modal-header">
//         <p class="modal-title text-primary"><i class="icon-color-wand"></i> Ai assistant</p>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
//         </button>
//       </div>
//       <div class="modal-body">
        
//         <textarea rows="3" cols="150" class="form-control mb-3"></textarea>
      
// 	    <button type="button" class="btn btn-success btn-ask-ai"><i class="icon-color-wand la-lg"></i> Ask AI</button>
// 	    <button type="button" class="btn btn-light border btn-insert-content"><i class="icon-arrow-up la-lg"></i> Insert element content</button>
		
// 		<div class="spinner-border spinner-border-sm mx-3" role="status" style="display:none">
// 		  <span class="visually-hidden">Loading...</span>
// 		</div>
		
// 		<div class="responses mt-3 pt-3 border-top" style="display:none">
// 		</div>

//       </div>
//       <div class="modal-footer">
//         <!-- <button type="button" class="btn btn-primary btn-lg btn-save" data-bs-dismiss="modal"><i class="la la-save"></i> Save</button> -->
//         <button type="button" class="btn btn-secondary btn-lg close-btn" data-bs-dismiss="modal"><i class="la la-times"></i> Close</button>
//       </div>
//     </div>
//   </div>
// </div>
// <style>
// .responses {
// 	overflow-y: auto;
//     resize: vertical;
// 	height:300px;
// 	border-top:1px solid var(--bs-border-color);
// }

// .response {
// 	margin-top:1rem;
// 	padding-top:1rem;
// 	border-bottom:1px solid var(--bs-border-color);
// }
// .response .ai-actions{
// 	margin:1rem;	
// 	text-align:right;
// }

// .response .ai-actions i {
// 	font-size: 1.15rem;
//     line-height: 1;
//     vertical-align: text-top;
// }
// `;

// document.body.append(generateElements(aiModalTemplate)[0]);

// let aiModal = document.getElementById("ai-assistant-modal");
// let bsModal = bootstrap.Modal.getOrCreateInstance(aiModal);

// aiModal.querySelector(".btn-ask-ai").addEventListener("click", function(event) {
// 	aiAssistantSendQuery();
// 	return false;
// });

// aiModal.querySelector(".btn-insert-content",).addEventListener("click", function(event) {
// 	let selectedEl = Vvveb.Builder.selectedEl;
// 	let text = selectedEl.innerHTML.trim();
// 	let textarea = aiModal.querySelector("textarea");
// 	textarea.value = textarea.value + "\n" + text;
	
// 	return false;
// });
// /*
// aiModal.querySelector(".btn-save").addEventListener("click", function(event) {
// 	let selectedEl = Vvveb.Builder.selectedEl;
// 	selectedEl.innerHTML = $("textarea", aiModal).val();
// 	$("textarea", aiModal).val("")
// });
// */
// aiModal.querySelector(".close-btn").addEventListener("click", function(event) {
// 	aiModal.querySelector("textarea").value = "";
// 	let responses =  aiModal.querySelector(".responses");
// 	responses.innerHTML = "";
// 	responses.style.display = "none";
// });

// document.getElementById("ai-assistant-btn").addEventListener("click", function(event) {
// 	bsModal.show();
	
// 	event.preventDefault();
// 	return false;
// });


// document.addEventListener("click", function(event) {
// 	let element = event.target.closest(".btn-insert");
// 	if (element) {
// 		let response = element.closest(".response")
// 		let selectedEl = Vvveb.Builder.selectedEl;

// 		let node = response.querySelector(".content");
			
// 		selectedEl.append(node);
		
// 		Vvveb.Undo.addMutation({type: 'childList', 
// 								target: node.parentNode, 
// 								addedNodes: [node], 
// 								nextSibling: node.nextSibling});

// 		event.preventDefault();	
// 		return false;
// 	}
// });

// document.addEventListener("click", function(event) {
// 	let element = event.target.closest(".btn-replace");
// 	if (element) {
// 		let response = element.closest(".response")
// 		let selectedEl  = Vvveb.Builder.selectedEl;

// 		let node = response.querySelector(".content");
		
// 		Vvveb.Undo.addMutation({type: 'childList', 
// 								target: selectedEl.parentNode, 
// 								addedNodes: [node], 
// 								removedNodes: [selectedEl], 
// 								nextSibling: selectedEl.nextSibling});

// 		selectedEl.replaceWith(node);
	
// 		event.preventDefault();	
// 		return false;
// 	}
// });

// function aiAssistantSendQuery()  {
// 		if (!chatgptOptions["key"] ) {
// 			displayToast("bg-danger", "Error", 'No ChatGPT key configured! Enter a valid key in the plugin settings page.');
// 			return;
// 		}

// 		aiModal.querySelector(".spinner-border").style.display = '';
		
// 		let selection = aiModal.querySelector("textarea").value;
		
// 		const ChatGPT = {
// 			//api_key: chatgptOptions["key"] ?? null,
// 			model: chatgptOptions["model"] ?? "gpt-3.5-turbo-instruct",
// 			/*
// 			messages: [{
// 				role: "user",
// 				content: prompt
// 			  },{
// 				role: "system",
// 				content: "You are a Bootstrap 5 Html expert."
// 			  },
// 			],
// 			*/
// 			temperature: parseInt(chatgptOptions["temperature"] ?? 0),
// 			max_tokens: parseInt(chatgptOptions["max_tokens"] ?? 300),
// 			prompt: selection,
// 			//format: "html"
// 		};

// 		fetch("https://api.openai.com/v1/completions", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${chatgptOptions["key"]}`
// 			},
// 			body: JSON.stringify(ChatGPT)
// 		}).then(res => res.json()).then(data => {
// 			document.querySelector(".spinner-border", aiModal).style.display = 'none';
// 			if (data.error) {
// 				let message = '';
// 				for (name in data.error) {
// 					message += name +":" + data.error[name] + "\n";
// 				}
// 				//alert(message);
// 				displayToast("bg-danger", "Error", message);
// 				return;
// 			}
			
// 			let reply = '';
// 			for (let i = 0; i < data.choices.length; i++) {
// 				reply += data.choices[i].text + "\n";
// 			}

// 			let responses = document.querySelector(".responses");	
// 			let response = generateElements(aiResponseTemplate)[0];

			
// 			response.querySelector(".content").innerHTML = reply;
// 			responses.append(response);
// 			responses.style.display = '';
// 			response.scrollIntoViewIfNeeded();
			
// 			//$("textarea", aiModal).val(reply);
// 		}).catch(error => {
// 			aiModal.querySelector(".spinner-border").style.display = 'none';
// 			displayToast("bg-danger", "Error", error);
// 			console.log("something went wrong", error);
// 		})
// }
