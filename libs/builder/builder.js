/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/VvvebJs
*/

// Simple JavaScript Templating and buildParams
// John Resig - https://johnresig.com/ - MIT Licensed
(function () {
  let cache = {};
  let startTag = "{%";
  let endTag = "%}";
  let re1 = new RegExp(`((^|${endTag})[^\t]*)'`, "g");
  let re2 = new RegExp(`\t=(.*?)${endTag}`, "g");

  this.tmpl = function tmpl(str, data) {
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    let fn = /^[-a-zA-Z0-9]+$/.test(str)
      ? (cache[str] =
        cache[str] || tmpl(document.getElementById(str).innerHTML))
      : // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function(
        "obj",
        "let p=[],print=function(){p.push.apply(p,arguments);};" +
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split(startTag)
          .join("\t")
          .replace(re1, "$1\r")
          .replace(re2, "',$1,'")
          .split("\t")
          .join("');")
          .split(endTag)
          .join("p.push('")
          .split("\r")
          .join("\\'") +
        "');}return p.join('');"
      );
    // Provide some basic currying to the user
    return data ? fn(data) : fn;
  };
})();

function buildParams(prefix, obj, add) {
  let rbracket = /\[\]$/;

  if (Array.isArray(obj)) {
    // Serialize array item.
    for (const key in obj) {
      let v = obj[key];
      if (rbracket.test(prefix)) {
        // Treat each array item as a scalar.
        add(prefix, v);
      } else {
        // Item is non-scalar (array or object), encode its numeric index.
        buildParams(
          prefix + "[" + (typeof v === "object" && v != null ? key : "") + "]",
          v,
          add
        );
      }
    }
  } else if (typeof obj === "object") {
    // Serialize object item.
    for (const name in obj) {
      buildParams(prefix + "[" + name + "]", obj[name], add);
    }
  } else {
    // Serialize scalar item.
    add(prefix, obj);
  }
}

// Serialize an array of form elements or a set of
// key/values into a query string
function nestedFormData(a) {
  let prefix,
    s = [],
    add = function (key, valueOrFunction) {
      // If value is a function, invoke it and use its return value
      let value =
        typeof valueOrFunction === "function"
          ? valueOrFunction()
          : valueOrFunction;

      s[s.length] =
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(value == null ? "" : value);
    };

  if (a == null) {
    return "";
  }

  // If an array was passed in, assume that it is an array of form elements.
  if (Array.isArray(a) || Object.is(a)) {
    // Serialize the form elements
    for (const key in object) {
      let v = object[key];
      //jQuery.each( a, function() {
      add(key, v);
    }
  } else {
    // If traditional, encode the "old" way (the way 1.3.2 or older
    // did it), otherwise encode params recursively.
    for (const prefix in a) {
      buildParams(prefix, a[prefix], add);
    }
  }

  // Return the resulting serialization
  return s.join("&");
}

let delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

function isElement(obj) {
  return (
    typeof obj === "object" &&
    obj.nodeType === 1 &&
    typeof obj.style === "object" &&
    typeof obj.ownerDocument === "object" /* && obj.tagName != "BODY"*/
  );
}

function generateElements(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.children;
}

function offset(el) {
  box = el.getBoundingClientRect();
  docElem = document.documentElement;
  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft,
  };
}
// Custom Modificaion - Jayanti - 08-09-2025
// Add a new helper funcion below
/* === BG helpers (global) === */

function isSectionNode(node) {
  if (!node || node.nodeType !== 1) return false;
  const tag = node.tagName.toLowerCase();
  if (tag === "section" || tag === "header" || tag === "footer") return true;
  // if (node.hasAttribute("data-section") || node.classList.contains("section"))
  //     return true;
  return false;
}

// Custom Modification Ends Here - Jayanti - 08-09-2025
function _sectionCategoryFromEl(el) {
  const low = (s) => (s || "").toLowerCase();
  if (el?.dataset?.vvvebBlockCat) return low(el.dataset.vvvebBlockCat);

  const id = low(el.id);
  const tag = low(el.tagName);
  const cls = low(el.className);

  // Mutiple matched ids
  const matched = (keywords) =>
    keywords.some((k) => id.includes(k) || cls.includes(k));

  if (matched(["hero", "banner", "slider"])) return "hero";
  if (matched(["about-us", "about", "who-we-are", "about-section"]))
    return "about-us";
  if (
    matched([
      "services",
      "service",
      "our-services",
      "what-we-do",
      "choose-us",
      "our-programs",
    ])
  )
    return "service";
  if (matched(["contact", "contact-us", "get-in-touch"])) return "contact";
  if (
    matched(["team", "meet-the-team", "meet-team", "our-team", "our-experts"])
  )
    return "team";
  if (matched(["faq"])) return "faq";
  if (matched(["products", "our-products", "product"])) return "product";
  if (matched(["our-design", "our-gallery", "gallery"])) return "design";
  if (matched(["cta"])) return "cta";
  if (matched(["pricing", "pricing-table"])) return "pricing";
  if (matched(["my-profile", "profile", "portfolio"])) return "portfolio";
  if (matched(["client", "clients"])) return "client";

  return "other";
}

function getSectionIdForHIghlight(el, readableFallback) {
  if (!el) return;

  const tag = el.tagName?.toLowerCase() || "";

  const toCap = (str) =>
    str.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  if (tag === "section") {
    const id = (el.id || "").trim();
    return "Section" + (id ? ` - ${toCap(id)} ` : "");
  }

  return readableFallback || tag;
}

function generateUniqueId(baseId, doc) {
  doc = doc || document;

  const clean = (baseId || "section")
    .toString()
    .trim()
    .replace(/[^\w\-]+/g, "-") // non-word char -> "-"
    .replace(/-+/g, "-") // multiple "-" -> single "-"
    .replace(/^-|-$/g, ""); // start/end se "-" hatao

  const match = clean.match(/^(.*?)(-(\d+))?$/);
  const base = match && match[1] ? match[1] : clean;

  let maxIndex = 1;
  const escBase = base.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); // escape for regex
  const regex = new RegExp(`^${escBase}-(\\d+)$`);
  // let index = 2;
  // let candidate = cleanBase;

  doc.querySelectorAll("[id]").forEach((el) => {
    const id = el.id;
    const m = id.match(regex);
    if (m) {
      const num = m[1] ? parseInt(m[1], 10) : 1;
      if (num > maxIndex) {
        maxIndex = num;
      }
    }
  });
  const next = maxIndex + 1;
  return base + "-" + next;
}

function getElementBottomDistanceFromIframeBottom(el, iframe) {
  if (!el || !iframe) return null;

  const win = iframe.contentWindow;
  const doc = iframe.contentDocument || win?.document;
  const scroller = doc.scrollingElement || doc.documentElement || doc.body;

  const rect = el.getBoundingClientRect();
  const elBottomInDoc = rect.bottom + win.pageYOffset;

  return scroller.scrollHeight - elBottomInDoc;
}
window.getElementBottomDistanceFromIframeBottom =
  getElementBottomDistanceFromIframeBottom;

// Custom Modificaion Ends Here- Jayanti - 25-09-2025

// Amit's code starts from here for the addition of the Id
// helpers - add near top of undo file
function ensureVvvebId(el) {
  if (!el || el.nodeType !== 1) return null;
  if (el.hasAttribute("data-vvveb-id")) return el.getAttribute("data-vvveb-id");
  const id = "vvveb-" + Math.random().toString(36).slice(2, 10);
  el.setAttribute("data-vvveb-id", id);
  return id;
}

// Resolve an id across possible documents (frame vs parent). Returns found element or null.
function resolveVvvebTargetById(id) {
  if (!id) return null;
  // try frame document first if present
  try {
    if (window.FrameDocument) {
      const el = window.FrameDocument.querySelector(`[data-vvveb-id="${id}"]`);
      if (el) return el;
    }
  } catch (e) { }

  // try builder frameBody's ownerDocument if available
  try {
    if (Vvveb && Vvveb.Builder && Vvveb.Builder.frameBody) {
      const doc =
        Vvveb.Builder.frameBody.ownerDocument || Vvveb.Builder.frameBody;
      const el =
        doc.querySelector && doc.querySelector(`[data-vvveb-id="${id}"]`);
      if (el) return el;
    }
  } catch (e) { }

  // fallback to main document
  try {
    return document.querySelector(`[data-vvveb-id="${id}"]`);
  } catch (e) {
    return null;
  }
}
// Amit's code ends from here for the addition of the Id

if (Vvveb === undefined) var Vvveb = {};

Vvveb.defaultComponent = "_base";
Vvveb.preservePropertySections = true;
//icon = use component icon when dragging | html = use component html to create draggable element
Vvveb.dragIcon = "icon";
//if empty the html of the component is used to view dropping in real time but for large elements it can jump around for this you can set a html placeholder with this option
Vvveb.dragElementStyle =
  // "background:limegreen;width:100%;height:3px;border:1px solid limegreen;box-shadow:0px 0px 2px 1px rgba(0,0,0,0.14);overflow:hidden;";
  "width:100%;font-size: 18px; font-weight: normal;height:50px;border-radius: 4px;border:1px dashed limegreen;box-shadow:0px 0px 2px 1px rgba(0,0,0,0.14);overflow:hidden; color: limegreen; display: flex; justify-content: center; align-items: center; background: lightgrey;";

Vvveb.dragHtml = '<div style="' + Vvveb.dragElementStyle + '">Drop here</div>';

let hoveredSection = null;
let hoveredForm = null;
let colorPickerActive = false;
let colorPickerOldStyle = null;
let hoveredCard = null;

Vvveb.baseUrl = document.currentScript
  ? document.currentScript.src.replace(/[^\/]*?\.js$/, "")
  : "";
Vvveb.imgBaseUrl = Vvveb.baseUrl;

Vvveb.ComponentsGroup = {};
Vvveb.SectionsGroup = {};
Vvveb.BlocksGroup = {};

Vvveb.Components = {
  _components: {},

  _nodesLookup: {},

  _attributesLookup: {},

  _classesLookup: {},

  _classesRegexLookup: {},

  componentPropertiesElement: "#right-panel .component-properties",

  componentPropertiesDefaultSection: "content",

  get: function (type) {
    return this._components[type];
  },

  updateProperty: function (type, key, value) {
    let properties = this._components[type]["properties"];
    for (property in properties) {
      if (key == properties[property]["key"]) {
        return (this._components[type]["properties"][property] = Object.assign(
          properties[property],
          value
        ));
      }
    }
  },

  getProperty: function (type, key) {
    let properties = this._components[type]
      ? this._components[type]["properties"]
      : [];
    for (property in properties) {
      if (key == properties[property]["key"]) {
        return properties[property];
      }
    }
  },

  add: function (type, data) {
    data.type = type;

    this._components[type] = data;

    if (data.nodes) {
      for (let i in data.nodes) {
        this._nodesLookup[data.nodes[i]] = data;
      }
    }

    if (data.attributes) {
      if (data.attributes.constructor === Array) {
        for (let i in data.attributes) {
          this._attributesLookup[data.attributes[i]] = data;
        }
      } else {
        for (let i in data.attributes) {
          if (typeof this._attributesLookup[i] === "undefined") {
            this._attributesLookup[i] = {};
          }

          if (
            typeof this._attributesLookup[i][data.attributes[i]] === "undefined"
          ) {
            this._attributesLookup[i][data.attributes[i]] = {};
          }

          this._attributesLookup[i][data.attributes[i]] = data;
        }
      }
    }

    if (data.classes) {
      for (let i in data.classes) {
        this._classesLookup[data.classes[i]] = data;
      }
    }

    if (data.classesRegex) {
      for (let i in data.classesRegex) {
        this._classesRegexLookup[data.classesRegex[i]] = data;
      }
    }
  },

  extend: function (inheritType, type, data) {
    let newData = data;

    if ((inheritData = this._components[inheritType])) {
      newData = { ...inheritData, ...data };
      newData.properties = (data.properties ? data.properties : []).concat(
        inheritData.properties ? inheritData.properties : []
      );
    }

    //sort by order
    newData.properties.sort(function (a, b) {
      if (typeof a.sort === "undefined") a.sort = 0;
      if (typeof b.sort === "undefined") b.sort = 0;

      if (a.sort < b.sort) return -1;
      if (a.sort > b.sort) return 1;
      return 0;
    });

    this.add(type, newData);
  },

  matchNode: function (node) {
    let component = {};

    if (!node || !node.tagName) return false;

    if (node.attributes && node.attributes.length) {
      //search for attributes
      for (let i in node.attributes) {
        if (node.attributes[i]) {
          attr = node.attributes[i].name;
          value = node.attributes[i].value;

          if (attr in this._attributesLookup) {
            component = this._attributesLookup[attr];

            //currently we check that is not a component by looking at name attribute
            //if we have a collection of objects it means that attribute value must be checked
            if (typeof component["name"] === "undefined") {
              if (value in component) {
                return component[value];
              }
            } else {
              return component;
            }
          }
        }
      }

      for (let i in node.attributes) {
        attr = node.attributes[i].name;
        value = node.attributes[i].value;

        //check for node classes
        if (attr == "class") {
          classes = value.split(" ");

          for (j in classes) {
            if (classes[j] in this._classesLookup)
              return this._classesLookup[classes[j]];
          }

          for (regex in this._classesRegexLookup) {
            regexObj = new RegExp(regex);
            if (regexObj.exec(value)) {
              return this._classesRegexLookup[regex];
            }
          }
        }
      }
    }

    tagName = node.tagName.toLowerCase();
    if (tagName in this._nodesLookup) return this._nodesLookup[tagName];

    return false;
    //return false;
  },

  render: function (type, panel = false) {
    let component = this._components[type];
    if (!component) return;

    if (!panel) {
      //panel = document.querySelector(this.componentPropertiesElement);
      panel = this.componentPropertiesElement;
    }

    let defaultSection = this.componentPropertiesDefaultSection;
    let componentsPanelSections = {};

    document.querySelectorAll(panel + " .tab-pane").forEach((el, i) => {
      let sectionName = el.dataset.section;
      componentsPanelSections[sectionName] = el;
      for (const item of el.querySelectorAll(
        'label:not([data-header="default"]) + input,' +
        'label:not([data-header="default"]),' +
        '.section:not([data-section="default"])'
      )) {
        item.remove();
      }
    });

    let section = componentsPanelSections[defaultSection].querySelector(
      '.section[data-section="default"]'
    );

    if (!(Vvveb.preservePropertySections && section)) {
      let template = tmpl("vvveb-input-sectioninput", {
        key: "default",
        header: component.name,
      });

      componentsPanelSections[defaultSection].replaceChildren();
      componentsPanelSections[defaultSection].append(
        generateElements(template)[0]
      );

      section =
        componentsPanelSections[defaultSection].querySelector(".section");
    }

    componentsPanelSections[defaultSection].querySelector(
      '[data-header="default"] span'
    ).innerHTML = component.name;
    section.replaceChildren();

    if (component.beforeInit) component.beforeInit(Vvveb.Builder.selectedEl);

    let element;

    let fn = function (component, property) {
      if (property.input) {
        property.input.addEventListener("propertyChange", (event) => {
          element = selectedElement = Vvveb.Builder.selectedEl;
          let value = event.detail.value,
            input = event.detail.input,
            origEvent = event.detail.origEvent;

          if (property.child) element = element.querySelector(property.child);
          if (property.parent) element = element.parent(property.parent);

          if (property.onChange) {
            let ret = property.onChange(
              element,
              value,
              input,
              component,
              origEvent
            );
            //if on change returns an object then is returning the dom node otherwise is returning the new value
            if (typeof ret == "object") {
              element = ret;
            } else {
              value = ret;
            }
          } /* else */
          if (property.htmlAttr) {
            oldValue = element.getAttribute(property.htmlAttr);

            if (property.htmlAttr == "class" && property.validValues) {
              if (property.validValues) {
                element.classList.remove(
                  ...property.validValues.filter((v) => v)
                );
              }
              if (value) {
                element.classList.add(...value.split(" "));
              }
            } else if (property.htmlAttr == "style") {
              //keep old style for undo
              oldStyle =
                window.FrameDocument.getElementById(
                  "vvvebjs-styles"
                ).textContent;
              element = Vvveb.StyleManager.setStyle(
                element,
                property.key,
                value
              );
            } else if (property.htmlAttr == "innerHTML") {
              element = Vvveb.ContentManager.setHtml(element, value);
            } else if (property.htmlAttr == "innerText") {
              element = Vvveb.ContentManager.setText(element, value);
            } else {
              //if value is empty then remove attribute useful for attributes without values like disabled
              if (value) {
                element.setAttribute(property.htmlAttr, value);
              } else {
                // element.removeAttribute(property.htmlAttr);
                // Amit's code starts here for ignoring the href empty attribute
                // special case: keep empty href attribute
                if (property.htmlAttr === "href") {
                  element.setAttribute("href", "");
                } else {
                  element.removeAttribute(property.htmlAttr);
                }
                // Amit's code ends here for ignoring the href empty attribute
              }
            }

            if (property.htmlAttr == "style") {
              mutation = {
                type: "style",
                target: element,
                attributeName: property.htmlAttr,
                oldValue: oldStyle,
                newValue:
                  window.FrameDocument.getElementById("vvvebjs-styles")
                    .textContent,
              };

              Vvveb.Undo.addMutation(mutation);
            } else {
              Vvveb.Undo.addMutation({
                type: "attributes",
                target: element,
                attributeName: property.htmlAttr,
                oldValue: oldValue,
                newValue: element.getAttribute(property.htmlAttr),
              });
            }
          }

          if (component.onChange) {
            element = component.onChange(element, property, value, input);
          }

          if (property.child || property.parent) {
            Vvveb.Builder.selectNode(selectedElement);
          } else {
            Vvveb.Builder.selectNode(element);
          }

          return element;
        });
      }

      return property.input;
    };

    let nodeElement = Vvveb.Builder.selectedEl;

    for (let i in component.properties) {
      let property = component.properties[i];
      let element = nodeElement;

      if (property.beforeInit) property.beforeInit(element);

      if (property.child)
        element = element.querySelector(property.child) ?? element;
      if (property.parent)
        element = element.closest(property.parent) ?? element;

      if (property.data) {
        property.data["key"] = property.key;
      } else {
        property.data = { key: property.key };
      }

      if (typeof property.group === "undefined") property.group = null;

      property.input = property.inputtype.init(property.data, element);

      let value;
      if (property.init) {
        property.inputtype.setValue(property.init(element));
      } else if (property.htmlAttr) {
        if (property.htmlAttr == "style") {
          //value = element.css(property.key);//jquery css returns computed style
          value = Vvveb.StyleManager.getStyle(element, property.key); //getStyle returns declared style
        } else if (property.htmlAttr == "innerHTML") {
          value = Vvveb.ContentManager.getHtml(element);
        } else if (property.htmlAttr == "innerText") {
          value = Vvveb.ContentManager.getText(element);
        } else {
          value = element.getAttribute(property.htmlAttr);
        }

        //if attribute is class check if one of valid values is included as class to set the select
        if (value && property.htmlAttr == "class" && property.validValues) {
          let valid = value.split(" ").filter(function (el) {
            return property.validValues.indexOf(el) != -1;
          });

          if (valid && valid.length) {
            value = valid[0];
          } else {
            value = "";
          }
        }

        if (!value && property.defaultValue) {
          value = property.defaultValue;
        }

        property.inputtype.setValue(value);
      } else {
        if (!value && property.defaultValue) {
          value = property.defaultValue;
        }

        property.inputtype.setValue(value);
      }

      fn(component, property);

      let propertySection = defaultSection;
      if (property.section) {
        propertySection = property.section;
      }

      if (property.inputtype == SectionInput) {
        section = componentsPanelSections[propertySection].querySelector(
          '.section[data-section="' + property.key + '"]'
        );

        if (Vvveb.preservePropertySections && section) {
          section.replaceChildren();
        } else {
          componentsPanelSections[propertySection].append(property.input);
          section = componentsPanelSections[propertySection].querySelector(
            '.section[data-section="' + property.key + '"]'
          );
        }
      } else {
        let row = generateElements(tmpl("vvveb-property", property))[0];
        row.querySelector(".input").append(property.input);
        section.append(row);
      }

      if (property.inputtype.afterInit) {
        property.inputtype.afterInit(property.input);
      }

      if (property.afterInit) {
        property.afterInit(element, property.input);
      }
    }

    if (component.init) component.init(nodeElement);
  },
};

Vvveb.Blocks = {
  _blocks: {},

  get: function (type) {
    return this._blocks[type];
  },

  add: function (type, data) {
    data.type = type;
    this._blocks[type] = data;
  },
};

Vvveb.Sections = {
  _sections: {},

  get: function (type) {
    return this._sections[type];
  },

  add: function (type, data) {
    data.type = type;
    this._sections[type] = data;
  },
};

Vvveb.WysiwygEditor = {
  isActive: false,
  oldValue: "",
  doc: false,

  // editorSetStyle: function (tag, style = {}, toggle = false) {
  // Custom Modification - Jayanti - 24-09-2025 - Fix for issue when selecting text in one element and applying style from another element
  // let iframeWindow = Vvveb.Builder.iframe.contentWindow;
  // let selection = iframeWindow.getSelection();
  // let element = this.element;
  // let range;

  // if (!tag) {
  //   tag = "span";
  // }

  // if (selection.rangeCount > 0) {
  //   //check if the whole text is inside an existing node to use the node directly
  //   if (
  //     (selection.baseNode &&
  //       selection.baseNode.nextSibling == null &&
  //       selection.baseNode.previousSibling == null &&
  //       selection.anchorOffset == 0 &&
  //       selection.focusOffset == selection.baseNode.length) ||
  //     selection.anchorOffset == selection.focusOffset
  //   ) {
  //     element = selection.baseNode.parentNode;
  //   } else {
  //     element = document.createElement(tag);
  //     range = selection.getRangeAt(0);
  //     range.surroundContents(element);
  //     range.selectNodeContents(element.childNodes[0], 0);
  //   }
  // }

  // add cooldown flag and duration (ms)
  _styleCooldown: false,
  _styleCooldownMs: 500, // change to any number you want

  editorSetStyle: function (tag, style = {}, toggle = false, silent = false) {
    // if currently in cooldown, ignore this call
    const isColorChange =
      style && Object.prototype.hasOwnProperty.call(style, "color");

    if (!isColorChange && this._styleCooldown) {
      return null;
    }

    // enter cooldown
    this._styleCooldown = true;
    setTimeout(() => {
      this._styleCooldown = false;
    }, this._styleCooldownMs);

    let iframeWindow = Vvveb.Builder.iframe?.contentWindow;
    let iframeDoc = iframeWindow?.document;
    let selection = iframeWindow.getSelection();
    let element = this.element;

    let range;
    // inside Vvveb.WysiwygEditor.editorSetStyle before applying styles:
    const oldStyle = element.getAttribute("style") || "";

    if (!tag) tag = "span";

    // helper: check if selection is inside the element we are editing
    function _isInsideEditEl(node) {
      if (!node) return false;
      const el = Vvveb.WysiwygEditor.element;
      if (!el) return false;
      // text node => use its parent; else element directly
      const n = node.nodeType === 3 ? node.parentNode : node;
      return n === el || el.contains(n);
    }

    // use selection *only* if it's inside the edited element
    if (
      selection &&
      selection.rangeCount > 0 &&
      _isInsideEditEl(selection.getRangeAt(0).commonAncestorContainer)
    ) {
      // existing behavior
      if (
        (selection.baseNode &&
          selection.baseNode.nextSibling == null &&
          selection.baseNode.previousSibling == null &&
          selection.anchorOffset == 0 &&
          selection.focusOffset == selection.baseNode.length) ||
        selection.anchorOffset == selection.focusOffset
      ) {
        element = selection.baseNode.parentNode;
      } else {
        // element = document.createElement(tag || "span");
        element = (iframeDoc || document).createElement(tag || "span");
        range = selection.getRangeAt(0);
        try {
          range.surroundContents(element);
          range.selectNodeContents(element.childNodes[0], 0);
        } catch (e) {
          // fallback: if surround fails, just use the main edited element
          element = this.element;
        }
      }
    } else {
      // selection is outside or empty -> lock to the edited element
      element = this.element;
    }

    // Custom Modification Ends Here - Jayanti - 24-09-2025 - Fix for issue when selecting text in one element and applying style from another element

    if (element && style) {
      for (let name in style) {
        const raw = style[name];

        // toggle:
        if (!raw || (toggle && element.style.getPropertyValue(name))) {
          element.style.removeProperty(name);
          continue;
        }

        // !important detection
        let important = false;
        let value = raw;
        if (typeof raw === "string" && raw.includes("!important")) {
          important = true;
          value = raw.replace(/!important/gi, "").trim();
        }

        // setProperty
        element.style.setProperty(name, value, important ? "important" : "");
      }
    }

    //if edited text is an empty span remove the span
    if (
      element.tagName == "SPAN" &&
      element.style.length == 0 &&
      element.attributes.length <= 1
    ) {
      let textNode = iframeWindow.document.createTextNode(element.innerText);
      element.replaceWith(textNode);
      element = textNode;

      range = iframeWindow.document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    //select link element to edit link etc
    if (tag == "a") {
      Vvveb.Builder.selectNode(element);
      Vvveb.Builder.loadNodeComponent(element);
    }

    const newStyle = element.getAttribute("style") || "";

    if (
      !silent &&
      oldStyle !== newStyle &&
      Vvveb &&
      Vvveb.Undo &&
      typeof Vvveb.Undo.addMutation === "function"
    ) {
      Vvveb.Undo.addMutation({
        type: "attributes",
        target: element,
        attributeName: "style",
        oldValue: oldStyle,
        newValue: newStyle,
      });
    }
    return element;
  },

  // Amit's code start here for adding the link for the cross tags and normal text
  atageditorSetStyle: function (tag, style = {}, toggle = false) {
    try {
      const iframeWindow = Vvveb.Builder.iframe.contentWindow;
      const iframeDoc = iframeWindow.document;
      const selection = iframeWindow.getSelection();
      let element = this.element;
      let range;

      if (!tag) tag = "span";

      const ancestorsFullySelected = [];

      // helper: is element empty of meaningful content
      function isElementEmpty(el) {
        if (!el || el.nodeType !== 1) return false;
        // If there's any non-whitespace text or element child -> not empty
        for (let i = 0; i < el.childNodes.length; i++) {
          const c = el.childNodes[i];
          if (c.nodeType === 1) return false;
          if (c.nodeType === 3 && !/^\s*$/.test(c.nodeValue)) return false;
        }
        return true;
      }

      // helper: remove pure-whitespace text siblings around a node
      function removeAdjacentWhitespaceText(node) {
        let p = node.previousSibling;
        while (p && p.nodeType === 3 && /^\s*$/.test(p.nodeValue)) {
          const tmp = p.previousSibling;
          p.parentNode.removeChild(p);
          p = tmp;
        }
        let n = node.nextSibling;
        while (n && n.nodeType === 3 && /^\s*$/.test(n.nodeValue)) {
          const tmp = n.nextSibling;
          n.parentNode.removeChild(n);
          n = tmp;
        }
      }

      // helper: remove empty element siblings (safely)
      function removeEmptyElementSiblings(node) {
        let prev = node.previousSibling;
        while (prev) {
          const tmp = prev.previousSibling;
          if (prev.nodeType === 1 && isElementEmpty(prev)) {
            prev.parentNode.removeChild(prev);
          }
          prev = tmp;
        }
        let next = node.nextSibling;
        while (next) {
          const tmp = next.nextSibling;
          if (next.nodeType === 1 && isElementEmpty(next)) {
            next.parentNode.removeChild(next);
          }
          next = tmp;
        }
      }

      if (selection && selection.rangeCount > 0) {
        range = selection.getRangeAt(0);

        if (selection.isCollapsed) {
          element = selection.anchorNode && selection.anchorNode.parentNode;
        } else if (
          selection.anchorNode === selection.focusNode &&
          selection.anchorOffset === 0 &&
          (selection.focusNode.nodeType === 3
            ? selection.focusOffset === selection.focusNode.length
            : selection.focusOffset === selection.focusNode.childNodes.length)
        ) {
          element = selection.anchorNode.parentNode;
        } else {
          // collect fully-selected ancestors
          (function collectFullySelectedAncestors() {
            let common = range.commonAncestorContainer;
            let startEl =
              common && common.nodeType === 1
                ? common
                : common && common.parentNode;
            let node = startEl;
            while (
              node &&
              node !== iframeDoc.body &&
              node !== iframeDoc.documentElement
            ) {
              if (node.nodeType === 1) {
                try {
                  const nodeRange = iframeDoc.createRange();
                  nodeRange.selectNodeContents(node);
                  const startCmp = range.compareBoundaryPoints(
                    iframeWindow.Range.START_TO_START,
                    nodeRange
                  );
                  const endCmp = range.compareBoundaryPoints(
                    iframeWindow.Range.END_TO_END,
                    nodeRange
                  );
                  if (startCmp <= 0 && endCmp >= 0)
                    ancestorsFullySelected.push(node);
                } catch (e) {
                  /* ignore */
                }
              }
              node = node.parentNode;
            }
          })();

          // attempt surroundContents
          try {
            element = iframeDoc.createElement(tag);
            // Jayanti Changes below - attribute
            if (tag === "a") {
              element.setAttribute("data-temp-link", "true")
            }
            range.surroundContents(element);

            if (element.childNodes.length) {
              let innerRange = iframeDoc.createRange();
              innerRange.selectNodeContents(element.childNodes[0]);
              selection.removeAllRanges();
              selection.addRange(innerRange);
            }
          } catch (err) {
            // fallback: extract and insert
            element = iframeDoc.createElement(tag);
            if (tag === "a") {
              element.setAttribute("data-temp-link", "true")
            }
            const frag = range.extractContents();
            element.appendChild(frag);
            range.insertNode(element);

            // normalize around insertion
            try {
              if (element.parentNode) element.parentNode.normalize();
            } catch (e) { }

            // remove adjacent whitespace text nodes first
            removeAdjacentWhitespaceText(element);

            // remove empty siblings around the new element
            removeEmptyElementSiblings(element);

            // If an ancestor that we recorded now contains ONLY the inserted element (and maybe whitespace),
            // replace that ancestor with the element to remove the empty wrapper.
            for (let i = 0; i < ancestorsFullySelected.length; i++) {
              const anc = ancestorsFullySelected[i];
              if (!anc || !anc.parentNode) continue;
              if (anc === element || anc.contains(element) === false) {
                // if ancestor doesn't contain our inserted element, it was fully selected but not at insertion point;
                // it may have become empty — remove if empty.
                if (isElementEmpty(anc)) {
                  anc.parentNode.removeChild(anc);
                }
                continue;
              }

              // At this point anc contains the inserted element somewhere inside.
              // If anc has no meaningful children other than (maybe) whitespace and our element -> replace anc by element.
              const meaningfulChildren = [];
              for (let c = 0; c < anc.childNodes.length; c++) {
                const child = anc.childNodes[c];
                if (child.nodeType === 1) {
                  // element child
                  if (child === element) continue; // ignore our element for meaningful count
                  if (!isElementEmpty(child)) meaningfulChildren.push(child);
                } else if (child.nodeType === 3) {
                  if (!/^\s*$/.test(child.nodeValue))
                    meaningfulChildren.push(child);
                } else {
                  meaningfulChildren.push(child);
                }
              }

              if (meaningfulChildren.length === 0) {
                // only our element (and whitespace) -> replace ancestor with element
                try {
                  // preserve classes (but NOT ids)
                  if (anc.className && element.nodeType === 1) {
                    const classes = String(anc.className)
                      .split(/\s+/)
                      .filter(Boolean);
                    classes.forEach((c) => {
                      if (!element.classList.contains(c))
                        element.classList.add(c);
                    });
                  }

                  anc.parentNode.replaceChild(element, anc);

                  // reselect contents
                  const newRange = iframeDoc.createRange();
                  newRange.selectNodeContents(element);
                  selection.removeAllRanges();
                  selection.addRange(newRange);
                } catch (e) {
                  // ignore replace errors
                }
              } else {
                // Anc still contains other meaningful children. Remove any empty element children (like empty h5/p) adjacent to element.
                // Remove pure-empty element children to avoid stray empty tags.
                for (let c = anc.childNodes.length - 1; c >= 0; c--) {
                  const child = anc.childNodes[c];
                  if (child.nodeType === 1 && isElementEmpty(child)) {
                    anc.removeChild(child);
                  } else if (
                    child.nodeType === 3 &&
                    /^\s*$/.test(child.nodeValue)
                  ) {
                    anc.removeChild(child);
                  }
                }
              }
            } // end ancestors loop

            // re-normalize
            try {
              if (element.parentNode) element.parentNode.normalize();
            } catch (e) { }
          } // end fallback
        } // end else
      } // end range selection

      // apply inline styles
      if (element && element.nodeType === 1 && style) {
        for (let name in style) {
          if (
            !style[name] ||
            (toggle && element.style.getPropertyValue(name))
          ) {
            element.style.removeProperty(name);
          } else {
            element.style.setProperty(name, style[name]);
          }
        }
      }

      // new modified changes starts here
      // === NEW: ensure anchor has href attribute (preserve empty href) ===
      // If we created/modified an <a>, make sure it has href="" if none exists.
      // Also add an undo entry for attribute creation (if not applying undo programmatically).
      if (
        element &&
        element.nodeType === 1 &&
        element.tagName.toLowerCase() === "a"
      ) {
        try {
          // If anchor doesn't have href, create it as empty string (preserve empty href)
          if (!element.hasAttribute("href")) {
            const oldHref = null; // no attribute existed
            element.setAttribute("href", ""); // ensure href exists

            // add undo mutation for attribute creation (guard against programmatic undo application)
            // if (
            //   !window.__appIsApplyingUndo &&
            //   Vvveb &&
            //   Vvveb.Undo &&
            //   typeof Vvveb.Undo.addMutation === "function"
            // ) {
            //   console.log("Called attributes on 1191");

            //   //
            //   // Vvveb.Undo.addMutation({
            //   //   type: "attributes",
            //   //   target: element,
            //   //   attributeName: "href",
            //   //   oldValue: oldHref,
            //   //   newValue: element.getAttribute("href"),
            //   // });
            // }
          }
        } catch (e) {
          console.warn("Failed to ensure href on anchor:", e);
        }
      }
      // new modified changes ends here

      // remove empty span
      if (
        element &&
        element.nodeType === 1 &&
        element.tagName === "SPAN" &&
        element.style.length === 0 &&
        element.attributes.length <= 1
      ) {
        let textNode = iframeDoc.createTextNode(element.textContent || "");
        element.replaceWith(textNode);
        element = textNode;

        range = iframeDoc.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      // final select for anchor edit etc
      if (tag === "a") {
        setTimeout(() => {
          if (element) {
            Vvveb.Builder.selectNode(element);
            Vvveb.Builder.loadNodeComponent(element);
          }
        }, 0);
      }

      return element;
    } catch (err) {
      console.error("atagEditorSetStyle failed:", err);
      return null;
    }
  },

  // Amit's code ends here for adding the link for the cross tags and normal text

  init: function (doc) {
    this.doc = doc;
    let self = this;

    // document.getElementById("bold-btn").addEventListener("click", function (e) {
    //   //doc.execCommand('bold',false,null);
    //   //self.editorSetStyle("b", {"font-weight" : "bold"}, true);
    //   self.editorSetStyle(false, { "font-weight": "bold" }, true);
    //   e.preventDefault();
    //   return false;
    // });

    // Amit has readded to make font weight normal or bold.
    document.getElementById("bold-btn").addEventListener("click", function (e) {
      const el = self.element;
      if (!el) return;

      const currentWeight = window.getComputedStyle(el).fontWeight;
      if (parseInt(currentWeight, 10) >= 600) {
        self.editorSetStyle(false, { "font-weight": "normal" }, false);
      } else {
        self.editorSetStyle(false, { "font-weight": "bold" }, false);
      }
      e.preventDefault();
      return false;
    });
    // Amit has readded to make font weight normal or bold till here.

    // document                                               // Amit has commented this
    //   .getElementById("italic-btn")
    //   .addEventListener("click", function (e) {
    //     //doc.execCommand('italic',false,null);
    //     //self.editorSetStyle("i", {"font-style" : "italic"}, true);
    //     self.editorSetStyle(false, { "font-style": "italic" }, true);
    //     e.preventDefault();
    //     return false;
    //   });

    document
      .getElementById("italic-btn")
      .addEventListener("click", function (e) {
        const el = self.element;
        if (!el) return;

        const currentStyle = window.getComputedStyle(el).fontStyle;
        if (
          currentStyle.startsWith("italic") ||
          currentStyle.startsWith("oblique")
        ) {
          self.editorSetStyle(false, { "font-style": "normal" }, false);
        } else {
          self.editorSetStyle(false, { "font-style": "italic" }, false);
        }
        e.preventDefault();
        return false;
      });

    // document                                 // Amit has commented this
    //   .getElementById("underline-btn")
    //   .addEventListener("click", function (e) {
    //     e.preventDefault();
    //     //doc.execCommand('underline',false,null);
    //     //self.editorSetStyle("u", {"text-decoration" : "underline"}, true);
    //     self.editorSetStyle(false, { "text-decoration": "underline" }, true);
    //     return false;
    //   });

    document
      .getElementById("underline-btn")
      .addEventListener("click", function (e) {
        const el = self.element;
        if (!el) return;
        const decoration = window.getComputedStyle(el).textDecorationLine;
        if (decoration.includes("underline")) {
          self.editorSetStyle(false, { "text-decoration-line": "none" }, false);
        } else {
          self.editorSetStyle(
            false,
            { "text-decoration-line": "underline" },
            false
          );
        }
        e.preventDefault();
        return false;
      });

    document
      .getElementById("strike-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        //doc.execCommand('strikeThrough',false,null);
        //self.editorSetStyle("strike",  {"text-decoration" : "line-through"}, true);
        self.editorSetStyle(false, { "text-decoration": "line-through" }, true);
        return false;
      });

    // For the selection change enable/disable the link-btn
    // === Enable/disable Link button at runtime based on selection ===
    const linkBtn = document.getElementById("link-btn");
    const textAlignButtondiv = document.getElementById("divdropdownMenuButton");
    const dropdownMenuButton = document.getElementById("dropdownMenuButton");

    // visually-disabled style + click-block are already handled by CSS + the disabled prop
    function setLinkBtnEnabled(enabled) {
      if (enabled) {
        linkBtn.classList.remove("toolbar-btn-disabled");
        textAlignButtondiv.classList.add("toolbar-btn-disabled");
        if (Vvveb.Builder?.selectedEl?.tagName === "A") {
          linkBtn.setAttribute("data-bs-original-title", "Edit Link");
        } else {
          linkBtn.setAttribute("data-bs-original-title", "Create Link");
        }

        dropdownMenuButton.disabled = true;
        textAlignButtondiv.setAttribute(
          "data-bs-original-title",
          "Remove highlight to enable it"
        );
      } else {
        linkBtn.classList.add("toolbar-btn-disabled");
        if (Vvveb.Builder?.selectedEl?.tagName === "A") {
          linkBtn.setAttribute("data-bs-original-title", "Edit Link");
        } else {
          linkBtn.setAttribute(
            "data-bs-original-title",
            "Select text to enable this feature"
          );
        }
        textAlignButtondiv.classList.remove("toolbar-btn-disabled");
        dropdownMenuButton.disabled = false;
        textAlignButtondiv.setAttribute("data-bs-original-title", "Text Align");
      }
    }

    function hasNonEmptySelectionInIframe() {
      try {
        const win = Vvveb.Builder?.iframe?.contentWindow;
        const sel = win?.getSelection?.();
        if (!sel || sel.rangeCount === 0) return false;
        if (sel.isCollapsed) return false;
        return sel.toString().trim().length > 0;
      } catch (e) {
        return false;
      }
    }

    function updateLinkBtnState() {
      setLinkBtnEnabled(hasNonEmptySelectionInIframe());
    }

    // hook selection changes inside the editable iframe
    (function attachIframeSelectionListeners() {
      const win = Vvveb.Builder?.iframe?.contentWindow;
      const doc = win?.document;

      if (!doc) return;

      // runtime updates while user selects text
      doc.addEventListener("selectionchange", updateLinkBtnState);
      doc.addEventListener("keyup", updateLinkBtnState);
      doc.addEventListener("mouseup", updateLinkBtnState);

      // also handle iframe focus/blur for safety
      win.addEventListener("blur", updateLinkBtnState);
      win.addEventListener("focus", updateLinkBtnState);
    })();

    // initialize once at load
    updateLinkBtnState();

    // For the selection change enable/disable the link-btn

    // Amit has made some changes that starts from here
    document.getElementById("link-btn").addEventListener("click", function (e) {
      e.preventDefault();

      // call the editor helper if available
      if (typeof self.atageditorSetStyle === "function") {
        self.atageditorSetStyle("a");
      } else {
        console.warn("atageditorSetStyle is not available");
      }

      // allow a short time for the editor to create/select the <a>
      setTimeout(function () {
        // try to read selection from editor iframe if present, otherwise from main doc
        const frameWin =
          (window.Vvveb && Vvveb.Builder && Vvveb.Builder.frameWindow) || null;
        const sel = frameWin
          ? frameWin.getSelection && frameWin.getSelection()
          : window.getSelection && window.getSelection();

        // get the selected element (editor usually tracks this)
        let selected =
          (window.Vvveb && Vvveb.Builder && Vvveb.Builder.selectedEl) || null;

        // DOM elements for popup inputs
        const linkInput = document.getElementById("popup-link-input");
        const linkTarget = document.getElementById("popup-link-target");
        const popup = document.getElementById("link-popup");

        if (!popup || !linkInput) return; // required elements missing

        // if selected isn't an anchor, try to find an <a> at the caret/selection
        if (!selected || selected.tagName !== "A") {
          if (sel && sel.rangeCount) {
            let node = sel.anchorNode;
            // climb out of text nodes
            while (node && node.nodeType === 3) node = node.parentNode;
            // climb ancestors to find nearest <a>
            let anchor = node;
            while (
              anchor &&
              anchor !== (frameWin ? frameWin.document : document) &&
              anchor.tagName !== "A"
            ) {
              anchor = anchor.parentNode;
            }
            if (anchor && anchor.tagName === "A") {
              selected = anchor;
              // update builder selected element if available
              if (window.Vvveb && Vvveb.Builder)
                Vvveb.Builder.selectedEl = anchor;
            }
          }
        }

        if (!selected || selected.tagName !== "A") {
          // nothing to edit (optionally you could create a new <a> here)
          return;
        }

        // fill popup fields
        linkInput.value = selected.getAttribute("href") || "";
        if (linkTarget)
          linkTarget.checked = selected.getAttribute("target") === "_blank";

        // show popup (replace with your modal API if needed)
        popup.style.display = "block";

        // focus input
        setTimeout(function () {
          try {
            linkInput.focus();
            linkInput.select && linkInput.select();
          } catch (err) {
            console.warn("Could not focus link input", err);
          }
        }, 80);
      }, 80); // adjust delay if necessary; prefer a real event if atageditorSetStyle emits one

      return false;
    });
    // Amit has made some changes that ends here

    // Custom Modification - Jayanti Changes - For important color and font size
    const colorInputPicker = document.getElementById("fore-color");
    colorInputPicker.addEventListener("input", function () {
      const el = Vvveb.WysiwygEditor.element;
      if (!el) return;
      if (!colorPickerActive) {
        colorPickerActive = true;
        colorPickerOldStyle = el.getAttribute("style") || "";
      }
      document.getElementById("fore-color-icon").style.color = this.value;
      // live preview, NO undo
      self.editorSetStyle(false, { color: this.value }, false, true);
    });

    colorInputPicker.addEventListener("change", function () {
      const el = Vvveb.WysiwygEditor.element;
      if (!el) return;
      const newStyle = el.getAttribute("style") || "";
      if (colorPickerActive && colorPickerOldStyle !== newStyle) {
        Vvveb.Undo.addMutation({
          type: "attributes",
          target: el,
          attributeName: "style",
          oldValue: colorPickerOldStyle,
          newValue: newStyle,
        });
      }
      // colorPickerOldStyle = newStyle;
      // reset state
      colorPickerActive = false;
      colorPickerOldStyle = null;
    });

    colorInputPicker.addEventListener("blur", () => {
      if (colorPickerActive) {
        colorInputPicker.dispatchEvent(new Event("change"));
      }
    });

    const backColorInputPicker = document.getElementById("back-color");
    backColorInputPicker.addEventListener("input", function () {
      const el = Vvveb.WysiwygEditor.element;
      if (!el) return;
      if (!colorPickerActive) {
        colorPickerActive = true;
        colorPickerOldStyle = el.getAttribute("style") || "";
      }
      document.getElementById("back-color-icon").style.color = this.value;
      // live preview, NO undo
      self.editorSetStyle(false, { background: this.value }, false, true);
    });
    backColorInputPicker.addEventListener("change", function () {
      const el = Vvveb.WysiwygEditor.element;
      if (!el) return;
      const newStyle = el.getAttribute("style") || "";
      if (colorPickerActive && colorPickerOldStyle !== newStyle) {
        Vvveb.Undo.addMutation({
          type: "attributes",
          target: el,
          attributeName: "style",
          oldValue: colorPickerOldStyle,
          newValue: newStyle,
        });
      }

      // reset state
      colorPickerActive = false;
      colorPickerOldStyle = null;
    });
    backColorInputPicker.addEventListener("blur", () => {
      if (colorPickerActive) {
        backColorInputPicker.dispatchEvent(new Event("change"));
      }
    });

    // document                                               //// Amit has commented here
    //   .getElementById("font-size")
    //   .addEventListener("change", function (e) {
    //     //doc.execCommand('fontSize',false,this.value);
    //     self.editorSetStyle(false, {
    //       "font-size": `${this.value} !important`,
    //     });
    //     e.preventDefault();
    //     return false;
    //   });

    document
      .getElementById("font-size")
      .addEventListener("change", function (e) {
        //doc.execCommand('fontSize',false,this.value);
        self.editorSetStyle(false, { "font-size": this.value });
        e.preventDefault();
        return false;
      });

    // let sizes = "<option value=''> - Font size - </option>";
    let sizes;
    for (i = 1; i <= 128; i++) {
      sizes += "<option value='" + i + "px'>" + i + "</option>";
    }
    document.getElementById("font-size").innerHTML = sizes;

    document
      .getElementById("font-family")
      .addEventListener("change", function (e) {
        // Amit has added this to select the text if nothing selected
        // Amit has added this to select the text if nothing selected

        let option = this.options[this.selectedIndex];
        // console.log("This dot Selected Index: ", this.selectedIndex);
        // console.log("Selected Index: ", selectedIndex);
        let element = self.editorSetStyle(false, {
          "font-family": this.value,
        });
        console.log("element", element);
        console.log("option.dataset.provider", option.dataset.provider);

        Vvveb.FontsManager.addFont(
          option.dataset.provider,
          this.value,
          element?.ownerDocument ||
          window.FrameDocument ||
          Vvveb.Builder?.iframe?.contentDocument ||
          document
        );
        //doc.execCommand('fontName',false,this.value);
        e.preventDefault();
        return false;
      });

    // document
    //   .getElementById("justify-btn")
    //   .addEventListener("click", function (e) {
    //     //let command = "justify" + this.dataset.value;
    //     //doc.execCommand(command,false,"#");

    //     self.editorSetStyle(false, {
    //       "text-align": e.srcElement.dataset.value,
    //     });
    //     e.preventDefault();
    //     return false;
    //   });

    document // Amit has added this
      .getElementById("justify-btn")
      .addEventListener("click", function (e) {
        const anchor = e.target.closest("a");
        if (!anchor) return;
        const value = anchor.dataset.value.toLowerCase();
        self.editorSetStyle(false, { "text-align": value });
        e.preventDefault();
        return false;
      });

    // doc.addEventListener("keydown", (event) => {
    //   if (event.key === "Enter") {
    //     let target = event.target.closest("[contenteditable]");
    //     if (target) {
    //       doc.execCommand("insertLineBreak");
    //       event.preventDefault();
    //     }
    //   }
    // });

    doc.addEventListener("keydown", (event) => {
      const editableTarget = event.target.closest("[contenteditable]");

      if (editableTarget) {
        if ("Enter" === event.key) {
          doc.execCommand("insertLineBreak");
          event.preventDefault();
        }

        if (event.key === " " || event.code === "Space") {
          if (editableTarget.tagName.toLowerCase() === "button" || event.target.closest("button")) {
            event.preventDefault();
            event.stopPropagation();
            doc.execCommand("insertText", false, " ");
          }
        }
      }
    })
  },

  undo: function (element) {
    this.doc.execCommand("undo", false, null);
  },

  redo: function (element) {
    this.doc.execCommand("redo", false, null);
  },

  edit: function (element) {
    Vvveb.AIWriter?.close?.();
    try {
      const iframeWin = Vvveb.Builder.iframe.contentWindow;
      const selection = iframeWin.getSelection();
      const coords = Vvveb.WysiwygEditor._lastDblClickCoords;

      // --- START: Restore User Select Style Tweak ---
      // 1. Restore original selection styles to enable text editing.
      if (coords) {
        element.style.userSelect = coords.oldUserSelect || "";
        element.style.webkitUserSelect = ""; // Clear the webkit prefix explicitly
      }
      // 2. Clear any lingering selection highlight just in case.
      selection.removeAllRanges();
      // --- END: Restore User Select Style Tweak ---

      // 3. Set contenteditable to true
      element.setAttribute("contenteditable", true);
      element.setAttribute("spellcheckker", false);

      // 4. Use coordinates to find and set the exact caret position
      if (coords && iframeWin.document.caretPositionFromPoint) {
        const position = iframeWin.document.caretPositionFromPoint(
          coords.x,
          coords.y
        );

        if (position) {
          const range = iframeWin.document.createRange();
          range.setStart(position.offsetNode, position.offset);
          range.collapse(true); // Cursor mode

          selection.addRange(range);
          element.focus();
        }
      }
    } catch (e) {
      /* Silently ignore errors if iframe is not ready, etc. */
    }

    element.setAttribute("contenteditable", true);
    element.setAttribute("spellcheckker", false);
    // document.getElementById("wysiwyg-editor").style.display = "block";

    // START LIVE TRACKING
    TextLiveTracker.start(element);

    this.element = element;
    this.isActive = true;
    this.oldValue = element.innerHTML;

    //Custom modification - 	//??  (Problem solution for double tap editor goes over the screen)
    const toolbar = document.getElementById("wysiwyg-editor");
    toolbar.style.display = "block";
    const rect = element.getBoundingClientRect();
    const toolbarWidth = toolbar.offsetWidth;
    const toolbarHeight = toolbar.offsetHeight;
    const elementCenter = rect.left + rect.width / 2;
    const screenCenter = window.innerWidth / 2;

    // Reset both sides
    toolbar.style.left = "auto";
    toolbar.style.right = "auto";
    toolbar.style.transform = "";

    // Decide placement
    if (rect.width > 700) {
      toolbar.style.left = "50%";
      toolbar.style.transform = "translateX(-50%)";
    } else if (elementCenter < screenCenter) {
      // Element is on left half
      toolbar.style.left = "-1px";
    } else {
      // Element is on right half
      toolbar.style.right = "-1px";
    }

    // Top position (stick above the element)
    const headerH = document.querySelector("top-panel")?.offsetHeight || 60;
    const spaceAbove = rect.top - headerH;
    const needBelow = spaceAbove < toolbarHeight + 8;
    if (needBelow) {
      toolbar.style.bottom = "auto"; // override any old bottom
      toolbar.style.top = "calc(100% + 4px)";
    } else {
      toolbar.style.top = `auto`;
      toolbar.style.bottom = "calc(100% + 4px)"; // override any old bottom
    }
    //?? Custom Modification - Jayanti comments for (Problem solution for double tap editor goes over the screen) ends here

    this.element = element;
    this.isActive = true;
    this.oldValue = element.innerHTML;

    // Custom Modification - Jayanti Comments Start here (Comment this line to show font family label in main toolbar)
    // document.getElementById("font-family").value = Vvveb.StyleManager.getStyle(
    //   element,
    //   "font-family"
    // );

    //Custom Modification - Jayanti Comments ends Here

    // Amit's code starts here for the rgb color change to the hex code
    // document.getElementById("fore-color").value = Vvveb.StyleManager.getStyle(
    //   element,
    //   "color"
    // );
    // document.getElementById("back-color").value = Vvveb.StyleManager.getStyle(
    //   element,
    //   "background-color"
    // );

    // Convert int 0..255 to two-digit hex
    function toHex(byte) {
      const v = Math.max(0, Math.min(255, Math.round(byte)));
      return ("0" + v.toString(16)).slice(-2);
    }

    // Blend rgba color over a white background and return {r,g,b}
    function compositeOverWhite(r, g, b, a) {
      // a in 0..1
      const invA = 1 - a;
      return {
        r: Math.round(r * a + 255 * invA),
        g: Math.round(g * a + 255 * invA),
        b: Math.round(b * a + 255 * invA),
      };
    }

    // Parse rgb(...) or rgba(...) or return null
    function parseRgbString(str) {
      if (!str || typeof str !== "string") return null;
      const m = str.match(
        /rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})(?:\s*,\s*([0-9]*\.?[0-9]+))?\s*\)/i
      );
      if (!m) return null;
      const r = parseInt(m[1], 10);
      const g = parseInt(m[2], 10);
      const b = parseInt(m[3], 10);
      const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
      return { r, g, b, a };
    }

    // Convert various color inputs to #rrggbb (best-effort)
    function colorValueToHex(value) {
      if (!value) return "#ffffff";
      value = value.trim();

      // already hex #rgb or #rrggbb -> normalize to #rrggbb
      if (/^#([0-9a-f]{3}){1,2}$/i.test(value)) {
        if (value.length === 4) {
          // expand #rgb -> #rrggbb
          const r = value[1],
            g = value[2],
            b = value[3];
          return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
        }
        return value.toLowerCase();
      }

      // rgb / rgba
      const parsed = parseRgbString(value);
      if (parsed) {
        let { r, g, b, a } = parsed;
        if (a === undefined || a === null) a = 1;
        if (a < 1) {
          const comp = compositeOverWhite(r, g, b, a);
          r = comp.r;
          g = comp.g;
          b = comp.b;
        }
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
      }

      // named colors (basic fallback): set on an offscreen element and compute
      try {
        const tmp = document.createElement("div");
        tmp.style.color = value;
        document.body.appendChild(tmp);
        const cs = getComputedStyle(tmp).color;
        document.body.removeChild(tmp);
        const p = parseRgbString(cs);
        if (p) return `#${toHex(p.r)}${toHex(p.g)}${toHex(p.b)}`.toLowerCase();
      } catch (e) {
        /* ignore */
      }

      // last resort
      return "#ffffff";
    }

    const foreRaw = Vvveb.StyleManager.getStyle(element, "color");
    // document.getElementById("fore-color").value = colorValueToHex(foreRaw);
    document.getElementById("fore-color-icon").style.color =
      colorValueToHex(foreRaw);

    const backRaw = Vvveb.StyleManager.getStyle(element, "background-color");
    // document.getElementById("back-color").value = colorValueToHex(backRaw);
    document.getElementById("back-color-icon").style.color =
      colorValueToHex(backRaw);

    // Amit's code ends here for the rgb color change to the hex code

    element.focus();
    // Custom Modification - Jayanti - 25-09-25 (Fix for issue when clicking on text element the select box is not shown properly)
    // === custom patch start ===
    Vvveb.Builder.selectPadding = 10;
    Vvveb.Builder.texteditEl = element;

    function _updateSelectBox() {
      if (!Vvveb.Builder.texteditEl) return;
      const pos = offset(Vvveb.Builder.selectedEl);
      const SelectBox = document.getElementById("select-box");
      SelectBox.style.top =
        pos.top -
        (Vvveb.Builder.frameDoc?.scrollTop ?? 0) -
        Vvveb.Builder.selectPadding +
        "px";
      SelectBox.style.left =
        pos.left -
        (Vvveb.Builder.frameDoc?.scrollLeft ?? 0) -
        Vvveb.Builder.selectPadding +
        "px";
      SelectBox.style.width =
        element.offsetWidth + Vvveb.Builder.selectPadding * 2 + "px";
      SelectBox.style.height =
        element.offsetHeight + Vvveb.Builder.selectPadding * 2 + "px";
      SelectBox.style.display = "block";
    }

    element.addEventListener("blur", _updateSelectBox);
    element.addEventListener("keyup", _updateSelectBox);
    element.addEventListener("paste", _updateSelectBox);
    element.addEventListener("input", _updateSelectBox);
    _updateSelectBox();

    document.getElementById("select-box").classList.add("text-edit");
    document.getElementById("select-actions").style.display = "none";
    document.getElementById("highlight-box").style.display = "none";
    document.getElementById("section-edit-options").style.display = "none";
    document.getElementById("form-edit-options").style.display = "none";
    document.getElementById("hovering-options").style.display = "none";
    // === custom patch end ===
    // Custom Modification Ends Here - Jayanti - 25-09-25 (Fix for issue when clicking on text element the select box is not shown properly)
  },

  destroy: function (element) {
    Vvveb.AIWriter?.close?.();
    try {
      if (!element && !this.element) return;
      TextLiveTracker.stop();
      const node = element || this.element;
      if (!node) return;

      // remove editor attributes
      node.removeAttribute("contenteditable");
      node.removeAttribute("spellcheck");

      const editorUi = document.getElementById("wysiwyg-editor");
      if (editorUi) editorUi.style.display = "none";

      this.isActive = false;

      // Prefer getAttribute('style') (preserves original attribute text). Fallback to cssText.
      const getStyleText = (el) => {
        try {
          if (!el) return "";
          const attr = el.getAttribute && el.getAttribute("style");
          if (typeof attr === "string" && attr.trim() !== "")
            return attr.trim();
          return el.style && typeof el.style.cssText === "string"
            ? el.style.cssText.trim()
            : "";
        } catch (e) {
          return (el.getAttribute && el.getAttribute("style")) || "";
        }
      };

      // Normalize inline style: split rules, canonicalize "prop: value", preserve !important and url(...)
      const normalizeInlineStyle = (s) => {
        if (!s || typeof s !== "string") return "";
        return s
          .split(";")
          .map((r) => r.trim())
          .filter(Boolean)
          .map((r) => {
            const idx = r.indexOf(":");
            if (idx === -1) return null;
            const prop = r.slice(0, idx).trim().toLowerCase();
            const val = r.slice(idx + 1).trim();
            return prop ? `${prop}: ${val}` : null;
          })
          .filter(Boolean)
          .sort() // sort so order differences don't trigger changes
          .join("; ");
      };

      const oldStyle =
        typeof this.oldStyle === "string"
          ? this.oldStyle
          : node.getAttribute
            ? node.getAttribute("style") || ""
            : "";
      const newStyle = getStyleText(node);

      const oldNorm = normalizeInlineStyle(oldStyle);
      const newNorm = normalizeInlineStyle(newStyle);

      if (oldNorm !== newNorm) {
        // ensure the global guard exists
        if (typeof window.__appIsApplyingUndo === "undefined")
          window.__appIsApplyingUndo = false;
      }

      // update stored style for next comparison
      this.oldStyle = newStyle;

      // --- characterData (innerHTML) tracking (same guard) ---
      const oldValue =
        this.oldValue != null
          ? String(this.oldValue)
          : String(node.innerHTML || "");
      const newValue = node.innerHTML != null ? String(node.innerHTML) : "";
      if (oldValue !== newValue) {
        if (typeof window.__appIsApplyingUndo === "undefined")
          window.__appIsApplyingUndo = false;

        if (                                  // am has commented this
          !window.__appIsApplyingUndo &&
          Vvveb &&
          Vvveb.Undo &&
          typeof Vvveb.Undo.addMutation === "function"
        ) {
          // Vvveb.Undo.addMutation({
          //   type: "characterData",
          //   target: node,
          //   oldValue: oldValue,
          //   newValue: newValue,
          // });
        }
        this.oldValue = newValue;
      }
    } catch (err) {
      console.error("Error in destroy (style-only):", err);
    }
  },

  // Amit ends changes here for the removing the addition of the mutation for only the selection
};

Vvveb.Builder = {
  component: {},
  dragMoveMutation: false,
  isPreview: false,
  runJsOnSetHtml: false,
  designerMode: false,
  highlightEnabled: false,
  selectPadding: 0,
  leftPanelWidth: 275,
  ignoreClasses: ["clearfix", "masonry", "has-shadow"],

  init: function (url, callback) {
    let self = this;

    self.loadControlGroups();
    self.loadBlockGroups();
    self.loadSectionGroups();

    self.selectedEl = null;
    self.highlightEl = null;
    self.initCallback = callback;

    // self.documentFrame = document.querySelector("#iframe-wrapper > iframe");
    self.documentFrame = document.querySelector("iframe");

    self.canvas = document.getElementById("canvas");

    self._loadIframe(
      url + (url.indexOf("?") > -1 ? "&r=" : "?r=") + Math.random()
    );

    self._initDragdrop();

    self._initBox();

    self.dragElement = null;

    self.highlightEnabled = true;

    self.leftPanelWidth = document.getElementById("left-panel").clientWidth;
  },

  // Custom Modification - Jayanti - 18-09-2025

  // updateAddBtnLabel(target) {
  //   const addBtn = document.getElementById("add-section-btn");
  //   if (!addBtn || !target) return;

  //   // ⛔️ IMPORTANT: don't use .closest() here
  //   const isSectionSelf = isSectionNode(target);

  //   addBtn.innerHTML = `<i class="la la-plus"></i><span class="add-label">${
  //     isSectionSelf ? "Add Section" : "Add Component"
  //   }</span>`;
  // },
  updateAddBtnLabel(target) {
    const addBtn = document.getElementById("add-section-btn");
    if (!addBtn) return;

    // check if it's a section or header — but NOT footer
    const tag = target?.tagName?.toLowerCase() || "";

    // if ((tag === "section" || tag === "header") && tag !== "footer") {
    if (hoveredSection) {
      addBtn.style.display = "flex"; // show for normal sections or header
      addBtn.innerHTML = `<i class="la la-plus"></i><span class="add-label">Add Section</span>`;
    } else {
      addBtn.style.display = "none"; // hide for footer or others
    }
  },

  // Custom Modification Ends Here - Jayanti - 18-09-2025
  /* controls */
  loadControlGroups: function () {
    let componentsList = document.querySelectorAll(".components-list");
    let item = {},
      component = {};
    let count = 0;

    componentsList.forEach(function (list, i) {
      let type = list.dataset.type;
      list.replaceChildren();
      count++;

      for (group in Vvveb.ComponentsGroup) {
        list.append(
          generateElements(
            `<li class="header" data-section="${group}"  data-search="">
					<label class="header" for="${type}_comphead_${group}${count}">
						${group}<div class="header-arrow"></div>
					</label>
					<input class="header_check" type="checkbox" checked="true" id="${type}_comphead_${group}${count}">
					<ol></ol>
				</li>`
          )[0]
        );

        //list.append('<li class="header clearfix" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_comphead_' + group + count + '">' + group + '  <div class="header-arrow"></div>\
        //				   </label><input class="header_check" type="checkbox" checked="true" id="' + type + '_comphead_' + group + count + '">  <ol></ol></li>');

        let componentsSubList = list.querySelector(
          'li[data-section="' + group + '"]  ol'
        );

        components = Vvveb.ComponentsGroup[group];

        for (i in components) {
          const componentType = components[i];
          component = Vvveb.Components.get(componentType);

          if (component) {
            item =
              generateElements(`<li data-section="${group}" data-drag-type="component" data-type="${componentType}" data-search="${component.name.toLowerCase()}">
							<span>${component.name}</span>
						</li>`)[0];

            if (component.image) {
              item.style.backgroundImage =
                "url(" + Vvveb.imgBaseUrl + component.image + ")";
              item.style.backgroundRepeat = "no-repeat";
            }

            componentsSubList.append(item);
          }
        }
      }
    });
  },

  loadSectionGroups: function () {
    let sectionsList = document.querySelectorAll(".sections-list");
    let item = {};

    sectionsList.forEach(function (list, i) {
      let type = list.dataset.type;
      list.replaceChildren();

      for (group in Vvveb.SectionsGroup) {
        list.append(
          generateElements(
            `<li class="header" data-section="${group}"  data-search="">
					<label class="header" for="${type}_sectionhead_${group}">
						${group}<div class="header-arrow"></div>
					</label>
					<input class="header_check" type="checkbox" checked="true" id="${type}_sectionhead_${group}">
					<ol></ol>
				</li>`
          )[0]
        );

        let sectionsSubList = list.querySelector(
          'li[data-section="' + group + '"]  ol'
        );
        let sections = Vvveb.SectionsGroup[group];

        for (i in sections) {
          const sectionType = sections[i];
          const section = Vvveb.Sections.get(sectionType);

          if (section) {
            item = generateElements(`
                <li data-section="${group}" data-drag-type="section" data-type="${sectionType}" data-search="${section.name.toLowerCase()}">
									<span class="name">${section.name}</span>
									<div class="add-section-btn" title="Add section"><i class="la la-plus"></i></div>
									<img class="preview" src="" loading="lazy">
								</li>`)[0];

            if (section.image) {
              let image =
                (section.image.indexOf("/") == -1 ? Vvveb.imgBaseUrl : "") +
                section.image;

              /*
              Object.assign(item.style,{
                //backgroundImage: "url(" + image + ")",
                //backgroundRepeat: "no-repeat"
              });*/

              item.querySelector("img").setAttribute("src", image);
            }

            sectionsSubList.append(item);
          }
        }
      }
    });
  },

  loadBlockGroups: function () {
    let blocksList = document.querySelectorAll(".blocks-list");
    let item = {};

    blocksList.forEach(function (list, i) {
      let type = list.dataset.type;
      list.replaceChildren();

      for (group in Vvveb.BlocksGroup) {
        list.append(
          generateElements(
            `<li class="header" data-section="${group}"  data-search="">
					<label class="header" for="${type}_blockhead_${group}">
						${group}<div class="header-arrow"></div>
					</label>
					<input class="header_check" type="checkbox" checked="true" id="${type}_blockhead_${group}">
					<ol></ol>
				</li>`
          )[0]
        );

        let blocksSubList = list.querySelector(
          'li[data-section="' + group + '"]  ol'
        );
        blocks = Vvveb.BlocksGroup[group];

        for (i in blocks) {
          const blockType = blocks[i];
          const block = Vvveb.Blocks.get(blockType);

          if (block) {
            item =
              generateElements(`<li data-section="${group}" data-drag-type="block" data-type="${blockType}" data-search="${block.name.toLowerCase()}">
									<span class="name">${block.name}</span>
									<img class="preview" src="" loading="lazy">
								</li>`)[0];

            if (block.image) {
              let image =
                (block.image.indexOf("/") == -1 ? Vvveb.imgBaseUrl : "") +
                block.image;
              /*
              Object.assign(item.style,{
                //backgroundImage: "url(" + image + ")",
                //backgroundRepeat: "no-repeat"
              });*/

              item.querySelector("img").setAttribute("src", image);
            }

            blocksSubList.append(item);
          }
        }
      }
    });
  },

  loadUrl: function (url, callback) {
    let self = this;
    document.getElementById("select-box").style.display = "none";

    self.initCallback = callback;
    if (Vvveb.Builder.iframe.src != url) Vvveb.Builder.iframe.src = url;
  },

  /* iframe */
  _loadIframe: function (url) {
    let self = this;
    self.iframe = this.documentFrame;
    self.iframe.src = url;

    return this.documentFrame.addEventListener("load", function () {
      window.FrameWindow = self.iframe.contentWindow;
      window.FrameDocument = self.iframe.contentWindow.document;
      let addSectionBox = document.getElementById("add-section-box");
      let highlightBox = document.getElementById("highlight-box");
      let sectionEditBox = document.getElementById("section-edit-options");
      let hoveringOptions = document.getElementById("hovering-options");
      let formEditBox = document.getElementById("form-edit-options");
      let SelectBox = document.getElementById("select-box");

      highlightBox.style.display = "none";
      sectionEditBox.style.display = "none";
      addSectionBox.style.display = "none";
      formEditBox.style.display = "none";
      hoveringOptions.style.display = "none";

      window.FrameWindow.addEventListener("beforeunload", function (event) {
        if (window.__zpInternalAction) return;
        if (Vvveb.Undo.undoIndex >= 0) {
          let dialogText = "You have unsaved changes";
          event.returnValue = dialogText;
          return dialogText;
        }
      });

      window.FrameWindow.addEventListener("unload", function (event) {
        document.querySelector(".loading-message").classList.add("active");
        Vvveb.Undo.reset();
      });

      //prevent accidental clicks on links when editing text
      window.FrameDocument.addEventListener("click", function (event) {
        if (Vvveb.WysiwygEditor.isActive && event.target.closest("a")) {
          event.preventDefault();
          return false;
        }
      });

      selectBoxPosition = function (event) {
        let pos;
        let target = self.selectedEl; // ?? self.highlightEl;

        highlightBox.style.display = "none";
        sectionEditBox.style.display = "none";
        formEditBox.style.display = "none";
        hoveringOptions.style.display = "none";

        if (target) {
          pos = offset(target);

          SelectBox.style.top =
            pos.top -
            (self.frameDoc.scrollTop ?? 0) -
            self.selectPadding +
            "px";
          SelectBox.style.left =
            pos.left -
            (self.frameDoc.scrollLeft ?? 0) -
            self.selectPadding +
            "px";

          SelectBox.style.width =
            (target.offsetWidth ?? target.clientWidth) +
            self.selectPadding * 2 +
            "px";
          SelectBox.style.height =
            (target.offsetHeight ?? target.clientHeight) +
            self.selectPadding * 2 +
            "px";
        }
      };

      window.FrameWindow.addEventListener("scroll", selectBoxPosition);
      window.FrameWindow.addEventListener("resize", selectBoxPosition);

      Vvveb.WysiwygEditor.init(window.FrameDocument);
      Vvveb.StyleManager.init(window.FrameDocument);
      Vvveb.ColorPaletteManager.init(window.FrameDocument);
      // Custom Modification - Jayanti - 5-10-25
      Vvveb.GlobalCustomVariable?.init(window.FrameDocument);
      if (!Vvveb.Builder.isPreview) {
        removeNavbarAddLinkHelpers(window.FrameDocument);
        addNavbarAddLinkHelpers(window.FrameDocument);
        removeButtonHelpers(window.FrameDocument);
        addButtonHelpers(window.FrameDocument);
        addClonableCardHelpers(window.FrameDocument);
      }

      if (self.initCallback) self.initCallback();

      return self._frameLoaded();
    });
  },

  _frameLoaded: function () {
    let self = Vvveb.Builder;

    self.frameDoc = window.FrameDocument;
    self.frameHtml = window.FrameDocument.querySelector("html");
    self.frameBody = window.FrameDocument.querySelector("body");
    self.frameHead = window.FrameDocument.querySelector("head");

    //insert editor helpers like non editable areas
    self.frameHead.append(
      generateElements(
        '<link data-vvveb-helpers href="' +
        Vvveb.baseUrl +
        '../../css/vvvebjs-editor-helpers.css" rel="stylesheet">'
      )[0]
    );

    self._initHighlight();

    // window.dispatchEvent(
    //   new CustomEvent("vvveb.iframe.loaded", { detail: self.frameDoc })
    // );

    // Vvveb.SectionPadding.init(self.frameDoc);

    // console.log("frame loaded executed!");

    window.dispatchEvent(
      new CustomEvent("vvveb.iframe.loaded", { detail: self.frameDoc })
    );

    document.querySelector(".loading-message").classList.remove("active");

    //enable save button only if changes are made
    let setSaveButtonState = function (e) {
      if (Vvveb.Undo.hasChanges()) {
        document
          .querySelectorAll("#top-panel .save-btn")
          .forEach((e) => e.removeAttribute("disabled"));
      } else {
        document
          .querySelectorAll("#top-panel .save-btn")
          .forEach((e) => e.setAttribute("disabled", "true"));
      }
    };

    Vvveb.Builder.frameBody.addEventListener(
      "vvveb.undo.add",
      setSaveButtonState
    );
    Vvveb.Builder.frameBody.addEventListener(
      "vvveb.undo.restore",
      setSaveButtonState
    );
    if (Vvveb.Builder.mode === "edit" && !Vvveb.Builder.isPreview) {
      addNavbarAddLinkHelpers(window.FrameDocument);
      addButtonHelpers(window.FrameDocument);
    }

    // 🔹 Handle clicks on the Add link helper
    //   if (window.FrameDocument && window.FrameDocument.body) {
    //     window.FrameDocument.body.addEventListener("click", function (e) {
    //       const btn = e.target.closest(".vvveb-add-link-btn");
    //       if (!btn) return;

    //       e.preventDefault();

    //       const helperLi = btn.closest("li.vvveb-add-link-helper");
    //       if (!helperLi) return;

    //       const ul = helperLi.parentElement;
    //       if (!ul) return;

    //       // All real nav items (exclude helpers)
    //       // const items = Array.from(ul.children).filter(
    //       //   (li) => li !== helperLi && !li.hasAttribute("data-vvveb-helpers")
    //       // );

    //       // Nothing to clone? then do nothing
    //       // const lastRealItem = items[items.length - 1];
    //       // if (!lastRealItem) return;

    //       // All REAL nav items (exclude helpers and empties)
    // const items = Array.from(ul.children).filter((li) => {
    //   if (li === helperLi) return false;
    //   if (li.hasAttribute("data-vvveb-helpers")) return false;

    //   const hasContent =
    //     li.textContent.trim() ||
    //     li.querySelector("a,button,span,img,svg,i");

    //   return !!hasContent;
    // });

    // const lastRealItem = items[items.length - 1];
    // if (!lastRealItem) return;

    //       // Clone the last nav item
    //       const clone = lastRealItem.cloneNode(true);

    //       // Optional: reset text + href
    //       const linkEl = clone.querySelector("a");
    //       if (linkEl) {
    //         linkEl.textContent = "New link";
    //         linkEl.setAttribute("href", "#");
    //       }

    //       // Insert new li before helper
    //       ul.insertBefore(clone, helperLi);

    //       // Register in undo stack
    //       try {
    //
    // Vvveb.Undo.addMutation({
    //           type: "childList",
    //           target: ul,
    //           addedNodes: [clone],
    //           nextSibling: helperLi,
    //         });
    //       } catch (e) {
    //         // fail-silent
    //       }

    //       // Select the new link in builder so user can edit text / link
    //       try {
    //         self.selectNode(linkEl || clone);
    //         self.loadNodeComponent(linkEl || clone);
    //       } catch (e) {}
    //     });
    //   }

    if (window.FrameDocument && window.FrameDocument.body) {
      window.FrameDocument.body.addEventListener("click", function (e) {
        const btn = e.target.closest(".vvveb-add-link-btn");
        if (!btn) return;

        e.preventDefault();

        const self = Vvveb.Builder;

        // Try navbar case first (li helper inside <ul>)
        const helperLi = btn.closest("li.vvveb-add-link-helper");
        let container, items;

        if (helperLi) {
          // -------------------------------
          // NAVBAR / <ul> + <li> CASE
          // -------------------------------
          container = helperLi.parentElement;
          if (!container) return;

          items = Array.from(container.children).filter((li) => {
            if (li === helperLi) return false;
            if (li.hasAttribute("data-vvveb-helpers")) return false;

            const hasContent =
              li.textContent.trim() ||
              li.querySelector("a,button,span,img,svg,i");

            return !!hasContent;
          });
        } else {
          // -------------------------------
          // ICON / FOOTER CASE: parent has multiple <a> children
          // -------------------------------
          container = btn.parentElement;
          if (!container) return;

          // Try direct children anchors first
          let links = Array.from(container.querySelectorAll(":scope > a"));

          // If none found, fall back to anchors nested within immediate children
          if (!links.length) {
            links = Array.from(container.querySelectorAll(":scope > * a"));
          }

          // Exclude any helper buttons that happen to be <a>
          links = links.filter((el) => !el.hasAttribute("data-vvveb-helpers"));

          items = links.filter(
            (a) => a.querySelector("i,svg,img") || a.textContent.trim()
          );
        }

        const lastRealItem = items[items.length - 1];
        if (!lastRealItem) return;

        const clone = lastRealItem.cloneNode(true);

        // Reset href / text appropriately
        let linkEl;

        if (lastRealItem.tagName === "LI") {
          // navbar case: <li><a>…</a></li>
          linkEl = clone.querySelector("a");
          if (linkEl) {
            linkEl.textContent = "New link";
            linkEl.setAttribute("href", "#");
          }
        } else {
          // icon / footer case: direct <a> siblings
          linkEl = clone.tagName === "A" ? clone : clone.querySelector("a");
          if (linkEl) {
            linkEl.setAttribute("href", "#");
            // usually no text here, just icon, so we don't touch textContent
          }
        }

        // Insert the new node before the helper
        if (helperLi) {
          container.insertBefore(clone, helperLi);
        } else {
          container.insertBefore(clone, btn);
        }

        // Undo entry
        try {
          Vvveb.Undo.addMutation({
            type: "childList",
            target: container,
            addedNodes: [clone],
            nextSibling: helperLi || btn,
          });
        } catch (err) {
          // silent
        }

        // Select the new link/icon so user can edit
        try {
          self.selectNode(linkEl || clone);
          self.loadNodeComponent(linkEl || clone);
        } catch (err) { }
      });

      // =====================================================
      // ADD-BTN CLICK HANDLER - Clone button with max 2 limit
      // =====================================================
      window.FrameDocument.body.addEventListener("click", function (e) {
        const btn = e.target.closest(
          ".vvveb-add-btn[data-vvveb-context='buttons']"
        );
        if (!btn) return;
        if (btn.disabled) return;

        e.preventDefault();

        const self = Vvveb.Builder;
        const container = btn.parentElement;
        if (!container) return;

        // Get all real "buttons" = direct children with [data-btn]
        const realBtnElements = Array.from(container.children).filter(
          (child) => {
            if (child.hasAttribute("data-vvveb-helpers")) return false;
            if (child.classList.contains("vvveb-add-btn")) return false;
            if (child.classList.contains("vvveb-add-link-btn")) return false;

            return child.hasAttribute("data-btn");
          }
        );

        // Enforce maximum of 2 buttons total (including originals and clones)
        if (realBtnElements.length >= 2) {
          btn.disabled = true;
          return;
        }

        // Clone the last real [data-btn] element
        const lastReal = realBtnElements[realBtnElements.length - 1];
        if (!lastReal) return;

        const clone = lastReal.cloneNode(true);
        clone.setAttribute("data-vvveb-cloned-btn", "true");

        // Insert before helper
        // container.insertBefore(clone, btn);

        const sep = getBtnSeparator(container);

        // Insert template-like spacing before the clone
        let separatorNode = null;
        if (sep) {
          separatorNode = window.FrameDocument.createTextNode(sep);
          container.insertBefore(separatorNode, btn);
        }

        // Insert the clone
        container.insertBefore(clone, btn);

        // refresh enable/disable
        updateAddBtnState(container);

        // Disable if reached limit (total buttons will be >= 2)
        if (realBtnElements.length + 1 >= 2) btn.disabled = true;

        // Undo entry — include separator text node so undo removes it too
        try {
          const addedNodes = separatorNode ? [separatorNode, clone] : [clone];
          Vvveb.Undo.addMutation({
            type: "childList",
            target: container,
            addedNodes: addedNodes,
            nextSibling: btn,
          });
        } catch (err) { }

        // Select the new element so user can edit it
        try {
          self.selectNode(clone);
          self.loadNodeComponent(clone);
        } catch (err) { }
      });

      window.FrameDocument.body.addEventListener("click", function (e) {
        // Add this inside the window.FrameDocument.body click listener in _frameLoaded
        const addSlideBtn = e.target.closest(".vvveb-add-slide-btn");
        if (addSlideBtn) {
          e.preventDefault();
          const swiperContainer = addSlideBtn.closest(".swiper");

          const wrapper = swiperContainer.querySelector(".swiper-wrapper");

          const slides = Array.from(wrapper.children).filter(
            (el) =>
              el.classList.contains("swiper-slide") &&
              !el.hasAttribute("data-vvveb-helpers")
          );

          if (slides.length > 0 && slides.length < 10) {
            const lastSlide = slides[slides.length - 1];
            const clone = lastSlide.cloneNode(true);
            const newTotal = slides.length + 1;

            // Cleanup clone
            clone.classList.remove(
              "swiper-slide-active",
              "swiper-slide-next",
              "swiper-slide-prev",
              "swiper-slide-duplicate"
            );
            clone.removeAttribute("role");
            clone.setAttribute("data-swiper-slide-index", slides.length);
            clone.setAttribute("aria-label", newTotal + " / " + newTotal);

            // Update siblings labels
            slides.forEach((slide, index) => {
              slide.setAttribute("aria-label", index + 1 + " / " + newTotal);
            });

            wrapper.appendChild(clone);

            if (Vvveb.Undo) {
              Vvveb.Undo.addMutation({
                type: "childList",
                target: wrapper,
                addedNodes: [clone],
              });
            }

            // 🔹 FORCE PAGINATION UPDATE
            if (swiperContainer.swiper) {
              // update() recalculates slides and pagination dots automatically
              swiperContainer.swiper.update();

              const newSlideIndex = swiperContainer.swiper.slides.length - 1;
              swiperContainer.swiper.slideTo(newSlideIndex);

              // If dots still don't appear, explicitly tell pagination to render
              if (swiperContainer.swiper.pagination) {
                swiperContainer.swiper.pagination.render();
                swiperContainer.swiper.pagination.update();
              }
            } else {
              // Fallback for iframe window context
              const win = Vvveb.Builder.iframe.contentWindow;
              win.document.querySelectorAll(".swiper").forEach((s) => {
                if (s.swiper) {
                  s.swiper.update();
                  if (s.swiper.pagination) s.swiper.pagination.render();
                }
              });
            }

            Vvveb.Builder.selectNode(clone);
          }
          updateAddSlideBtnState(swiperContainer);
        }
      });

      // =====================================================
      // CLONABLE CARD HANDLER - Clones the last "clonable-card"
      // =====================================================
      window.FrameDocument.body.addEventListener("click", function (e) {
        const btn = e.target.closest(".add-card-btn");
        if (!btn) return;

        e.preventDefault();
        const container = btn.parentElement;
        if (!container) return;

        // Find all cards excluding builder helpers
        const cards = Array.from(
          container.querySelectorAll(".clonable-card")
        ).filter((card) => !card.hasAttribute("data-vvveb-helpers"));

        if (cards.length > 0) {
          const lastCard = cards[cards.length - 1];
          const clone = lastCard.cloneNode(true);

          // Generate unique ID for the new card to avoid editor conflicts
          if (clone.id) {
            clone.id = generateUniqueId(clone.id, container.ownerDocument);
          }

          // Insert the clone before the "Add Card" button
          container.insertBefore(clone, btn);

          // Register Undo Action
          if (Vvveb.Undo) {
            Vvveb.Undo.addMutation({
              type: "childList",
              target: container,
              addedNodes: [clone],
              nextSibling: btn,
            });
          }

          // Select the new node in the builder
          Vvveb.Builder.selectNode(clone);
          Vvveb.Builder.loadNodeComponent(clone);
        }
      });
    }

    self.frameBody.addEventListener("mouseup", function () {
      self.isResize = false;
      isResizeMouseDown = false;
    });
  },

  _getElementType: function (el) {
    //search for component attribute
    let componentName = "";
    let componentAttribute = "";

    if (el.attributes) {
      for (let j = 0; j < el.attributes.length; j++) {
        let nodeName = el.attributes[j].nodeName;

        if (nodeName.indexOf("data-component") > -1) {
          componentName = nodeName.replace("data-component-", "");
          return [componentName, "component"];
        }

        if (nodeName.indexOf("data-v-component-") > -1) {
          componentName = nodeName.replace("data-v-component-", "");
          return [componentName, "component"];
        }

        if (nodeName.indexOf("data-v-") > -1) {
          componentAttribute =
            (componentAttribute ? componentAttribute + " - " : "") +
            nodeName.replace("data-v-", "") +
            " ";
        }
      }
    }

    if (componentAttribute != "") return [componentAttribute, "attribute"];

    if (el.id) {
      componentName = "#" + el.id;
    } else {
      componentName =
        el.className && typeof el.className == "string"
          ? "." + el.className.split(" ")[0]
          : "";
    }

    return [componentName, el.tagName];
  },

  loadNodeComponent: function (node) {
    const data = Vvveb.Components.matchNode(node);
    let component;

    if (data) component = data.type;
    else component = Vvveb.defaultComponent;

    Vvveb.component = Vvveb.Components.get(component);
    Vvveb.Components.render(component);
    this.selectedComponent = component;
  },

  reloadComponent: function () {
    Vvveb.Components.render(this.selectedComponent);
  },

  moveNodeUp: function (node) {
    if (!node) {
      node = Vvveb.Builder.selectedEl;
    }

    const oldParent = node.parentNode;
    const oldNextSibling = node.nextSibling;
    const next = node.previousElementSibling;

    if (next) {
      next.before(node);
    } else {
      node.parentNode.before(node);
    }

    Vvveb.Builder.selectNode(node);

    refreshSwiperIfRequired(node);

    const newParent = node.parentNode;
    const newNextSibling = node.nextSibling;

    Vvveb.Undo.addMutation({
      type: "move",
      target: node,
      oldParent: oldParent,
      newParent: newParent,
      oldNextSibling: oldNextSibling,
      newNextSibling: newNextSibling,
    });
  },

  moveNodeDown: function (node) {
    if (!node) {
      node = Vvveb.Builder.selectedEl;
    }

    const oldParent = node.parentNode;
    const oldNextSibling = node.nextSibling;
    const next = node.nextElementSibling;

    if (next) {
      next.after(node);
    } else {
      node.parentNode.after(node);
    }

    Vvveb.Builder.selectNode(node);

    refreshSwiperIfRequired(node);

    const newParent = node.parentNode;
    const newNextSibling = node.nextSibling;

    Vvveb.Undo.addMutation({
      type: "move",
      target: node,
      oldParent: oldParent,
      newParent: newParent,
      oldNextSibling: oldNextSibling,
      newNextSibling: newNextSibling,
    });
  },

  // Clone editing for smooth clonningg of accordion by kasim(7-10-25) - starts

  // cloneNode: function (node) {
  //   if (!node) {
  //     node = Vvveb.Builder.selectedEl;
  //   }

  //   const clone = node.cloneNode(true);
  //   node.after(clone);
  //   node.click();

  //
  // Vvveb.Undo.addMutation({
  //     type: "childList",
  //     target: node.parentNode,
  //     addedNodes: [clone],
  //     nextSibling: node.nextSibling,
  //   });
  // },

  // cloneNode: function (node) {
  //   if (!node) node = Vvveb.Builder.selectedEl;

  //   // --- helpers ---
  //   function uid(prefix) {
  //     return `${prefix}-${Date.now().toString(36)}${Math.random()
  //       .toString(36)
  //       .slice(2, 6)}`;
  //   }

  //   function fixOneItemIds(itemEl, parentAccId) {
  //     const heading =
  //       itemEl.querySelector(".accordion-header[id]") ||
  //       itemEl.querySelector(".accordion-header");
  //     const button = itemEl.querySelector(".accordion-button");
  //     const collapse =
  //       itemEl.querySelector(".accordion-collapse[id]") ||
  //       itemEl.querySelector(".accordion-collapse");

  //     const headingIdNew = uid("heading");
  //     const collapseIdNew = uid("collapse");

  //     if (heading) heading.id = headingIdNew;

  //     if (collapse) {
  //       collapse.id = collapseIdNew;
  //       collapse.setAttribute("aria-labelledby", headingIdNew);
  //       if (parentAccId)
  //         collapse.setAttribute("data-bs-parent", `#${parentAccId}`);
  //     }

  //     if (button) {
  //       button.setAttribute("data-bs-target", `#${collapseIdNew}`);
  //       button.setAttribute("aria-controls", collapseIdNew);
  //     }
  //   }

  //   function fixAccordionIds(accordionEl) {
  //     const newAccordionId = uid("accordion");
  //     accordionEl.id = newAccordionId;

  //     const items = accordionEl.querySelectorAll(".accordion-item");
  //     items.forEach((item) => fixOneItemIds(item, newAccordionId));
  //   }

  //   // ---- Context detection (what to clone) ----
  //   const isEl = node && node.nodeType === 1;
  //   const closest = (sel) => (isEl && node.closest ? node.closest(sel) : null);

  //   const acc = closest(".accordion");
  //   const accItem = closest(".accordion-item");
  //   const nodeIsAcc = isEl && node.classList?.contains("accordion");

  //   let target, mode;
  //   if (accItem) {
  //     // Clicked inside one item → clone that item only
  //     target = accItem;
  //     mode = "ITEM";
  //   } else if (nodeIsAcc) {
  //     // Whole accordion selected → clone full accordion
  //     target = node;
  //     mode = "ACC";
  //   } else if (acc) {
  //     // Inside accordion somewhere → clone full accordion
  //     target = acc;
  //     mode = "ACC_FROM_CHILD";
  //   } else {
  //     // Anything else → generic clone
  //     target = node;
  //     mode = "NODE";
  //   }

  //   // ---- Clone + fix IDs (if needed) ----
  //   const clone = target.cloneNode(true);

  //   if (mode === "ITEM") {
  //     const parentAcc = acc;
  //     if (parentAcc && !parentAcc.id) parentAcc.id = uid("accordion");
  //     const parentId = parentAcc ? parentAcc.id : null;
  //     fixOneItemIds(clone, parentId);
  //   } else if (mode === "ACC" || mode === "ACC_FROM_CHILD") {
  //     fixAccordionIds(clone);
  //   } // else: generic nodes need no special id-fix

  //   // ---- Insert + Undo ----
  //   target.after(clone);

  //   try {
  //     node.click();
  //   } catch (_) {}

  //   if (Vvveb?.Undo?.addMutation) {
  //
  // Vvveb.Undo.addMutation({
  //       type: "childList",
  //       target: target.parentNode,
  //       addedNodes: [clone],
  //       nextSibling: target.nextSibling,
  //     });
  //   }
  // },

  cloneNode: function (node) {
    if (!node) node = Vvveb.Builder.selectedEl;

    // ---------------- helpers ----------------
    function uid(prefix) {
      return `${prefix}-${Date.now().toString(36)}${Math.random()
        .toString(36)
        .slice(2, 6)}`;
    }

    // ===== Accordion helpers =====
    function fixOneAccordionItemIds(itemEl, parentAccId) {
      const heading =
        itemEl.querySelector(".accordion-header[id]") ||
        itemEl.querySelector(".accordion-header");
      const button = itemEl.querySelector(".accordion-button");
      const collapse =
        itemEl.querySelector(".accordion-collapse[id]") ||
        itemEl.querySelector(".accordion-collapse");

      const headingIdNew = uid("heading");
      const collapseIdNew = uid("collapse");

      if (heading) heading.id = headingIdNew;

      if (collapse) {
        collapse.id = collapseIdNew;
        collapse.setAttribute("aria-labelledby", headingIdNew);
        if (parentAccId)
          collapse.setAttribute("data-bs-parent", `#${parentAccId}`);
        // collapse.classList.remove('show'); // optional
      }

      if (button) {
        button.setAttribute("data-bs-target", `#${collapseIdNew}`);
        button.setAttribute("aria-controls", collapseIdNew);
        // button.classList.add('collapsed'); button.setAttribute('aria-expanded','false'); // optional
      }
    }

    function fixAccordionIds(accordionEl) {
      const newAccordionId = uid("accordion");
      accordionEl.id = newAccordionId;

      accordionEl.querySelectorAll(".accordion-item").forEach((item) => {
        fixOneAccordionItemIds(item, newAccordionId);
      });

      // normalize any stray parents
      accordionEl.querySelectorAll("[data-bs-parent]").forEach((el) => {
        el.setAttribute("data-bs-parent", `#${newAccordionId}`);
      });
    }

    // ===== Tabs helpers (Bootstrap tabs + your container wrapper) =====
    const TAB_NAV_SEL = ".nav-tabs, .navbar-tabs, ul.nav";

    function getNavButton(el) {
      if (!el) return null;
      if (el.matches('.nav-link,[data-bs-toggle="tab"]')) return el;
      return el.querySelector?.('.nav-link,[data-bs-toggle="tab"]') || null;
    }

    function getTabsContainer(el) {
      if (!el) return null;
      // your wrapper first:
      const c1 = el.closest("[data-component-tabs]");
      if (c1) return c1;
      // otherwise try common structures (nav + sibling .tab-content inside same parent)
      const nav = el.closest(TAB_NAV_SEL);
      if (nav && nav.parentElement) return nav.parentElement;
      return el.closest(".tab-content")?.parentElement || null;
    }

    // only allow valid #id like "#abc-123", not "#" or "#1abc"
    function safeTargetSelector(btn) {
      const t = btn?.getAttribute("data-bs-target");
      if (t && /^#[A-Za-z][\w\-\:\.]*$/.test(t)) return t;
      const h = btn?.getAttribute("href");
      if (h && /^#[A-Za-z][\w\-\:\.]*$/.test(h)) return h;
      return null;
    }

    function resolvePaneFromButton(btn, container) {
      // 1) mapping by selector
      const sel = safeTargetSelector(btn);
      if (sel && container) {
        const p = container.querySelector(sel);
        if (p) return p;
      }
      // 2) fallback by index
      const nav = btn?.closest(TAB_NAV_SEL);
      const links = nav
        ? Array.from(nav.querySelectorAll('.nav-link,[data-bs-toggle="tab"]'))
        : [];
      const idx = links.indexOf(btn);
      const content = container
        ? container.querySelector(".tab-content") ||
          nav?.nextElementSibling?.matches?.(".tab-content")
          ? nav.nextElementSibling
          : null
        : null;
      const panes = content ? content.querySelectorAll(".tab-pane") : [];
      return idx > -1 && panes[idx] ? panes[idx] : null;
    }

    // pair fixer
    function fixTabPairIds(navBtnEl, paneEl) {
      const newBtnId = uid("tab");
      navBtnEl.id = newBtnId;
      navBtnEl.setAttribute("aria-selected", "false");
      navBtnEl.classList.remove("active");

      if (paneEl) {
        const newPaneId = uid("tab-pane");
        navBtnEl.setAttribute("data-bs-target", `#${newPaneId}`);
        navBtnEl.setAttribute("aria-controls", newPaneId);

        paneEl.id = newPaneId;
        paneEl.setAttribute("aria-labelledby", newBtnId);
        paneEl.classList.remove("show", "active");
      } else {
        // no pane present; cleanup bs attributes
        navBtnEl.removeAttribute("data-bs-target");
        navBtnEl.removeAttribute("aria-controls");
      }
    }

    // normalize any mismatched aria in original DOM (helps future clones too)
    function normalizeOneTabButton(navBtnEl, container) {
      const sel = safeTargetSelector(navBtnEl);
      if (!sel || !container) return;
      const pane = container.querySelector(sel);
      if (!pane) return;

      // ensure aria-controls points to pane id
      navBtnEl.setAttribute("aria-controls", pane.id);

      // ensure pane aria-labelledby points to button id
      if (!navBtnEl.id) navBtnEl.id = uid("tab");
      pane.setAttribute("aria-labelledby", navBtnEl.id);
    }

    function normalizeTabsBlock(container) {
      if (!container) return;
      const nav = container.querySelector(TAB_NAV_SEL);
      if (!nav) return;
      nav
        .querySelectorAll('.nav-link,[data-bs-toggle="tab"]')
        .forEach((btn) => normalizeOneTabButton(btn, container));
    }

    function fixTabsIds(rootClone) {
      const navs = rootClone.querySelectorAll(TAB_NAV_SEL);
      navs.forEach((nav) => {
        // prefer a sibling/nearby .tab-content under the same wrapper
        const container = getTabsContainer(nav) || rootClone;
        const content =
          container.querySelector(".tab-content") ||
          (nav.nextElementSibling &&
            nav.nextElementSibling.matches(".tab-content")
            ? nav.nextElementSibling
            : null);

        const links = nav.querySelectorAll('.nav-link,[data-bs-toggle="tab"]');
        const panes = content ? content.querySelectorAll(".tab-pane") : [];

        links.forEach((link, i) => {
          let pane = resolvePaneFromButton(link, container);
          if (!pane && panes[i]) pane = panes[i];
          fixTabPairIds(link, pane || null);
        });
      });
    }

    // ---------------- what to clone? ----------------
    const isEl = node && node.nodeType === 1;
    const closest = (sel) => (isEl && node.closest ? node.closest(sel) : null);

    // Accordion detection
    const acc = closest(".accordion");
    const accItem = closest(".accordion-item");
    const nodeIsAcc = isEl && node.classList?.contains("accordion");

    // Tabs detection
    const tabItem = closest('.nav-item, .nav-link, [data-bs-toggle="tab"]');
    const tabNav = closest(".nav-tabs, .navbar-tabs, ul.nav");
    const nodeIsTabNav =
      isEl && node.matches?.(".nav-tabs, .navbar-tabs, ul.nav");

    let target, mode;
    if (accItem) {
      target = accItem; // clone one accordion panel
      mode = "ACC_ITEM";
    } else if (nodeIsAcc) {
      target = node; // clone whole accordion
      mode = "ACC";
    } else if (acc) {
      target = acc; // inside accordion somewhere → clone whole
      mode = "ACC_FROM_CHILD";
    } else if (tabItem) {
      // inside a single tab → clone that one tab (nav item + its pane)
      target = tabItem.closest(".nav-item") || getNavButton(tabItem) || node;
      mode = "TAB_ITEM";
    } else if (nodeIsTabNav) {
      // whole nav-tabs selected → clone the tabs block (nav + content)
      target = tabNav || node;
      mode = "TABS";
    } else if (tabNav) {
      target = tabNav; // inside tabs somewhere → clone the tabs block
      mode = "TABS_FROM_CHILD";
    } else {
      target = node; // generic element
      mode = "NODE";
    }

    // ---------------- clone + fix IDs ----------------
    // Default single target clone
    let clone = target.cloneNode(true);

    // Jayanti changes for section id clone

    try {
      const doc = node.ownerDocument || document;
      if (isSectionNode(clone)) {
        const originalId = clone.id || "section";
        clone.id = generateUniqueId(originalId, doc);
      } else if (clone.id) {
        clone.id = generateUniqueId(clone.id, doc);
      }
    } catch (error) { }
    // Jayanti changes for section id clone Ends Here

    if (mode === "ACC_ITEM") {
      // Ensure original parent accordion has an id (used as data-bs-parent)
      const parentAcc = acc;
      if (parentAcc && !parentAcc.id) parentAcc.id = uid("accordion");
      const parentId = parentAcc ? parentAcc.id : null;
      fixOneAccordionItemIds(clone, parentId);
    } else if (mode === "ACC" || mode === "ACC_FROM_CHILD") {
      fixAccordionIds(clone);
    } else if (mode === "TAB_ITEM") {
      // 1) Resolve container, original button, and its target pane within container
      const container = getTabsContainer(node) || document;
      const navItemTarget = target.closest(".nav-item") || target; // prefer cloning whole <li.nav-item>
      const originalBtn = getNavButton(target) || target;
      const selector = safeTargetSelector(originalBtn);

      // Normalize mismatched aria in the original
      normalizeTabsBlock(container);

      // 2) Clone nav item
      const navClone = navItemTarget.cloneNode(true);
      const btnClone = getNavButton(navClone) || navClone;

      // 3) Clone the paired pane (inside the SAME container)
      let paneClone = null;
      if (selector) {
        const originalPane = container.querySelector(selector);
        if (originalPane) {
          paneClone = originalPane.cloneNode(true);
          // insert pane clone right after the original pane
          originalPane.after(paneClone);
        }
      }

      // 4) Fix IDs/links on the pair
      fixTabPairIds(btnClone, paneClone);

      // 5) Insert nav clone next to original nav item
      navItemTarget.after(navClone);

      // 6) Undo record & exit
      try {
        node.click();
      } catch (_) { }
      if (Vvveb?.Undo?.addMutation) {
        const added = [navClone];
        if (paneClone) added.push(paneClone);
        Vvveb.Undo.addMutation({
          type: "childList",
          target: navItemTarget.parentNode,
          addedNodes: added,
          nextSibling: navItemTarget.nextSibling,
        });
      }
      return; // already inserted; stop here.
    } else if (mode === "TABS" || mode === "TABS_FROM_CHILD") {
      // Try to clone a wrapper that contains both nav-tabs and tab-content for better UX
      let wrapper = target;
      if (
        wrapper &&
        !wrapper.querySelector(".tab-content") &&
        wrapper.parentElement?.querySelector(".tab-content")
      ) {
        wrapper = wrapper.parentElement;
        clone = wrapper.cloneNode(true);
      }
      // fix ids across tabs in the clone block
      fixTabsIds(clone);
    } else {
      // NODE: nothing special
    }

    // ---------------- insert + undo ----------------
    target.after(clone);

    try {
      node.click();
    } catch (_) { }
    if (Vvveb?.Undo?.addMutation) {
      Vvveb.Undo.addMutation({
        type: "childList",
        target: target.parentNode,
        addedNodes: [clone],
        nextSibling: target.nextSibling,
      });
    }
  },

  // Clone editing for smooth clonningg of accordion by kasim(7-10-25) - END

  selectNode: function (node) {
    let SelectBox = document.getElementById("select-box");

    if (!node) {
      SelectBox.style.display = "none";
      return;
    }

    // Amit has added the code starts here to calculate the font size and show in the select tag of Editor Toolbar
    const selectFontSize = document.getElementById("font-size");
    const computedSize = window.getComputedStyle(node).fontSize;
    const sizeValue = parseInt(computedSize); // convert to number
    selectFontSize.value = sizeValue + "px";
    // Amit has added the code ends here to calculate the font size and show in the select tag of Editor Toolbar

    // Amit has added the code starts here to calculate the font family and show in the select tag of Editor Toolbar
    const selectFontFamily = document.getElementById("font-family");
    const computedFontFamily = window.getComputedStyle(node).fontFamily;
    // console.log(computedFontFamily);

    // Find the closest match in the dropdown
    for (let option of selectFontFamily.options) {
      if (computedFontFamily.includes(option.text)) {
        selectFontFamily.value = option.value;
        break;
      }
    }

    const boldBtn = document.getElementById("bold-btn");
    const italicBtn = document.getElementById("italic-btn");
    const underlineBtn = document.getElementById("underline-btn");
    const strikeBtn = document.getElementById("strike-btn");

    // Suppose `node` is your selected or target text element
    const computedStyle = window.getComputedStyle(node);

    // ---- BOLD ----
    const numericFontWeight = parseInt(computedStyle.fontWeight, 10);
    if (numericFontWeight >= 600) {
      boldBtn.classList.add("texteditortoolbaractive");
    } else {
      boldBtn.classList.remove("texteditortoolbaractive");
    }

    // ---- ITALIC ----
    if (
      computedStyle.fontStyle === "italic" ||
      computedStyle.fontStyle === "oblique"
    ) {
      italicBtn.classList.add("texteditortoolbaractive");
    } else {
      italicBtn.classList.remove("texteditortoolbaractive");
    }

    // ---- UNDERLINE ----
    if (computedStyle.textDecorationLine.includes("underline")) {
      underlineBtn.classList.add("texteditortoolbaractive");
    } else {
      underlineBtn.classList.remove("texteditortoolbaractive");
    }

    // ---- STRIKE-THROUGH ----
    if (computedStyle.textDecorationLine.includes("line-through")) {
      strikeBtn.classList.add("texteditortoolbaractive");
    } else {
      strikeBtn.classList.remove("texteditortoolbaractive");
    }

    // Here for the text align option
    const textAlignRead = document.getElementById("text-align-read");
    // Define all possible alignment classes
    const alignClasses = [
      "la-align-left",
      "la-align-center",
      "la-align-right",
      "la-align-justify",
    ];
    // Remove any existing alignment class
    textAlignRead.classList.remove(...alignClasses);

    if (computedStyle.textAlign == "left") {
      textAlignRead.classList.add("la-align-left");
    } else if (computedStyle.textAlign == "center") {
      textAlignRead.classList.add("la-align-center");
    } else if (computedStyle.textAlign == "right") {
      textAlignRead.classList.add("la-align-right");
    } else if (computedStyle.textAlign == "justify") {
      textAlignRead.classList.add("la-align-justify");
    } else {
      textAlignRead.classList.add("la-align-left");
    }

    // Amit has added the code ends here to calculate the font family and show in the select tag of Editor Toolbar

    let self = this;
    let SelectActions = document.getElementById("select-actions");
    let AddSectionBtn = document.getElementById("add-section-btn");
    let elementType = this._getElementType(node);

    //Custom Modification Ends Here - Jayanti - 09-09-2025
    //Custom Modification - jayanti comment for select actions
    const selectActions = document.getElementById("select-actions");
    const buffer = 200;
    const elementLeft = node.getBoundingClientRect().left;

    if (elementLeft < buffer) {
      selectActions.style.left = "0px";
      selectActions.style.right = "auto";
    } else {
      selectActions.style.right = "0px";
      selectActions.style.left = "auto";
    }

    //Custom Modification - jayanti comment for select actions ends

    if (self.texteditEl && self.selectedEl != node) {
      Vvveb.WysiwygEditor.destroy(self.texteditEl);
      self.selectPadding = 0;
      SelectBox.classList.remove("text-edit");
      if (document.getElementById("wysiwyg-editor").style.display === "none") {
        SelectActions.style.display = "";
      }

      if (self.texteditEl.innerHTML === "<br>" || self.texteditEl.innerHTML === "") {
        let tempNode = self.texteditEl;
        let current = tempNode;
        while (
          current.parentNode &&
          current.parentNode !== document.body &&
          current.parentNode.children.length === 1
        ) {
          current = current.parentNode;
        }

        const parent = current.parentNode;
        const nextSibling = current.nextSibling;

        Vvveb.Undo.addMutation({
          type: "childList",
          target: parent,
          removedNodes: [current],
          nextSibling: nextSibling,
        });

        current.remove();
      } else {
      }

      self.texteditEl = null;
    }
    if (elementType[1] == "BODY") {
      SelectActions.style.display = "none";
      AddSectionBtn.style.display = "none";
    } else {
      if (document.getElementById("wysiwyg-editor").style.display === "none") {
        SelectActions.style.display = "";
      }
      AddSectionBtn.style.display = "";
    }

    let target = node;
    self.selectedEl = target;

    // Custom Modification - Jayanti - 18-09-2025
    window.applySelectActions?.(target);
    self.updateAddBtnLabel(target);
    // Custom Modification Ends Here - Jayanti - 18-09-2025

    try {
      let pos = offset(target);
      let top = pos.top - (self.frameDoc.scrollTop ?? 0) - self.selectPadding;

      SelectBox.style.top = top + "px";
      SelectBox.style.left =
        pos.left - (self.frameDoc.scrollLeft ?? 0) - self.selectPadding + "px";
      SelectBox.style.width =
        (target.offsetWidth ?? target.clientWidth) +
        self.selectPadding * 2 +
        "px";
      SelectBox.style.height =
        (target.offsetHeight ?? target.clientHeight) +
        self.selectPadding * 2 +
        "px";
      SelectBox.style.display = "block";

      //move actions toolbar to bottom if there is no space on top
      if (top < 30) {
        SelectActions.style.top = "100%";
        SelectActions.style.bottom = "0";
      } else {
        SelectActions.style.top = "";
        SelectActions.style.bottom = "";
      }

      Vvveb.Breadcrumb.loadBreadcrumb(target);
    } catch (err) {
      return false;
    }

    // document.querySelector("#highlight-name .type").innerHTML = elementType[0];
    // document.querySelector("#highlight-name .name").innerHTML = elementType[1];

    // Custom Modification - Jayanti changes for hover on highlight block
    const friendlyNames = {
      DIV: "Container",
      SECTION: "Section",
      FOOTER: "Footer",
      H1: "Heading",
      H2: "Heading",
      H3: "Heading",
      H4: "Heading",
      H5: "Heading",
      H6: "Heading",
      P: "Paragraph",
      SPAN: "Text",
      SMALL: "Text",
      A: "Link",
      IMG: "Image",
      UL: "List",
      OL: "List",
      LI: "List",
      BUTTON: "Button",
      INPUT: "Input",
      FORM: "Form",
      VIDEO: "Video",
      TABLE: "Table",
      BODY: "Body",
      HTML: "Document Root",
    };

    // fallback to tag name if not found
    const tagName = elementType[1].toUpperCase();
    const readableName = friendlyNames[tagName] || tagName;

    document.querySelector("#highlight-name .type").innerHTML = "";
    // document.querySelector("#highlight-name .name").innerHTML = readableName;

    // Custom Modification - Jayanti - 29-10-25
    const labelEl = document.querySelector("#highlight-name .name");
    labelEl.textContent = getSectionIdForHIghlight(node, readableName);
    // jayanti changes done here

    // Custom Modification - Jayanti Changes (Comment below line)
    // document.dispatchEvent(new CustomEvent("vvveb.selectNode"));
    // Custom Modification - Jayanti Changes Ends Here
  },

  // selectNode: function (node) {
  //   let SelectBox = document.getElementById("select-box");

  //   if (!node) {
  //     SelectBox.style.display = "none";
  //     if (
  //       window.Vvveb &&
  //       Vvveb.SectionEditor &&
  //       typeof Vvveb.SectionEditor.destroy === "function"
  //     ) {
  //       Vvveb.SectionEditor.destroy();
  //     }
  //     return;
  //   }

  //   let self = this;
  //   let SelectActions = document.getElementById("select-actions");
  //   let AddSectionBtn = document.getElementById("add-section-btn");
  //   let elementType = this._getElementType(node);

  //   /* === New: always resolve closest section/footer to anchor the pencil === */
  //   const owner = node.closest ? node.closest("section, footer") : null;
  //   if (owner) {
  //     anchorSectionPencil(owner, this); // <- keeps pencil on the section/footer
  //   } else {
  //     if (
  //       window.Vvveb &&
  //       Vvveb.SectionEditor &&
  //       typeof Vvveb.SectionEditor.destroy === "function"
  //     ) {
  //       Vvveb.SectionEditor.destroy(); // outside any section/footer
  //     }
  //   }
  //   /* === End new === */

  //   // Your existing select-actions side shifting
  //   const buffer = 200;
  //   const elementLeft = node.getBoundingClientRect().left;
  //   if (elementLeft < buffer) {
  //     SelectActions.style.left = "0px";
  //     SelectActions.style.right = "auto";
  //   } else {
  //     SelectActions.style.right = "0px";
  //     SelectActions.style.left = "auto";
  //   }

  //   if (self.texteditEl && self.selectedEl != node) {
  //     Vvveb.WysiwygEditor.destroy(self.texteditEl);
  //     self.selectPadding = 0;
  //     SelectBox.classList.remove("text-edit");
  //     SelectActions.style.display = "";
  //     self.texteditEl = null;
  //   }

  //   if (elementType[1] == "BODY") {
  //     SelectActions.style.display = "none";
  //     AddSectionBtn.style.display = "none";
  //   } else {
  //     SelectActions.style.display = "";
  //     AddSectionBtn.style.display = "";
  //   }

  //   let target = node;
  //   self.selectedEl = target;

  //   // Keep your custom label update
  //   self.updateAddBtnLabel(target);

  //   try {
  //     let pos = offset(target);
  //     let top = pos.top - (self.frameDoc.scrollTop ?? 0) - self.selectPadding;

  //     SelectBox.style.top = top + "px";
  //     SelectBox.style.left =
  //       pos.left - (self.frameDoc.scrollLeft ?? 0) - self.selectPadding + "px";
  //     SelectBox.style.width =
  //       (target.offsetWidth ?? target.clientWidth) +
  //       self.selectPadding * 2 +
  //       "px";
  //     SelectBox.style.height =
  //       (target.offsetHeight ?? target.clientHeight) +
  //       self.selectPadding * 2 +
  //       "px";
  //     SelectBox.style.display = "block";

  //     if (top < 30) {
  //       SelectActions.style.top = "unset";
  //       SelectActions.style.bottom = "-25px";
  //     } else {
  //       SelectActions.style.top = "";
  //       SelectActions.style.bottom = "";
  //     }

  //     Vvveb.Breadcrumb.loadBreadcrumb(target);
  //   } catch (err) {
  //     return false;
  //   }

  //   // Friendly names
  //   const friendlyNames = {
  //     DIV: "Container",
  //     SECTION: "Section",
  //     FOOTER: "Footer",
  //     H1: "Heading",
  //     H2: "Heading",
  //     H3: "Heading",
  //     H4: "Heading",
  //     H5: "Heading",
  //     H6: "Heading",
  //     P: "Paragraph",
  //     SPAN: "Text",
  //     SMALL: "Text",
  //     A: "Link",
  //     IMG: "Image",
  //     UL: "List",
  //     OL: "List",
  //     LI: "List",
  //     BUTTON: "Button",
  //     INPUT: "Input",
  //     FORM: "Form",
  //     VIDEO: "Video",
  //     TABLE: "Table",
  //     BODY: "Body",
  //     HTML: "Document Root",
  //   };
  //   const tagName = elementType[1].toUpperCase();
  //   const readableName = friendlyNames[tagName] || tagName;

  //   document.querySelector("#highlight-name .type").innerHTML = "";
  //   document.querySelector("#highlight-name .name").innerHTML = readableName;

  //   // Custom event remains intentionally disabled
  //   // document.dispatchEvent(new CustomEvent("vvveb.selectNode"));
  // },

  /* iframe highlight */
  _initHighlight: function () {
    let self = Vvveb.Builder;

    let highlightMove = function (event) {
      const currentSection = event.target.closest("section, footer") || hoveredSection || document.querySelector("iframe").contentDocument.querySelector("section");

      const currentForm = event.target.closest("form");
      const currentCard = event.target.closest(".clonable-card, .swiper-slide");
      const hoveredDeleteButton = document.getElementById("hovered-delete-btn");
      if (event.target.closest(".clonable-card")) {
        hoveredDeleteButton.innerHTML = "Delete Card";
      } else if (event.target.closest(".swiper-slide")) {
        hoveredDeleteButton.innerHTML = "Delete Slide";
      }

      if (event.target.closest("section")) {
        document.getElementById("add-section-btn").classList.add("d-flex");
        document.getElementById("add-section-btn").classList.remove("d-none");
      } else if (event.target.closest("footer")) {
        document.getElementById("add-section-btn").classList.add("d-none");
        document.getElementById("add-section-btn").classList.remove("d-flex");
      }

      const listOfResize = document.querySelectorAll(".top-center, .center-left, .center-right, .bottom-center");
      const resizeDiv = document.querySelector(".resize");
      const wresizeDiv = resizeDiv.offsetWidth;
      const hresizeDiv = resizeDiv.offsetHeight;
      if (wresizeDiv <= 50 && hresizeDiv <= 50) {
        listOfResize.forEach(element => {
          element.style.display = 'none';
        })
      } else {
        listOfResize.forEach(element => {
          element.style.display = 'block';
        })
      }

      // Only log when section actually changes
      if (currentSection && currentSection !== hoveredSection) {
        hoveredSection = currentSection;
      }

      if (currentCard && currentCard !== hoveredCard) {
        hoveredCard = currentCard;
      }

      if (currentForm && currentForm !== hoveredForm) {
        hoveredForm = currentForm;
      }

      // If cursor leaves all sections
      if (!currentSection) {
        hoveredSection = null;
      }
      if (!currentForm) {
        hoveredForm = null;
      }

      const style = window.getComputedStyle(hoveredSection);
      document.querySelector(".padding-top-button").style.height = style.paddingTop;
      document.querySelector(".padding-bottom-button").style.height = style.paddingBottom;

      if (
        self.highlightEnabled == true &&
        event.target &&
        isElement(event.target)
      ) {
        // 🔹 IGNORE hover on the Add link helper
        if (
          event.target.closest &&
          event.target.closest("[data-vvveb-helpers], .vvveb-add-link-helper")
        ) {
          // hide highlight-box if it was shown from a previous element
          const hb = document.getElementById("highlight-box");
          const seb = document.getElementById("section-edit-options");
          const feo = document.getElementById("form-edit-options");
          const ho = document.getElementById("hovering-options");
          if (ho) ho.style.display = "none";
          if (feo) feo.style.display = "none";
          if (seb) seb.style.display = "none";
          if (hb) hb.style.display = "none";
          return;
        }
        if (!self.isDragging && !self.isResize) {
          self.updateAddBtnLabel(event.target);
        }
        self.highlightEl = target = event.target;
        let pos = offset(target);
        let height = target.offsetHeight;
        let halfHeight = Math.max(height / 2, 5);
        let width = target.offsetWidth;
        let halfWidth = Math.max(width / 2, 5);
        let prepend = true;

        let x = event.x;
        let y = event.y;

        // if (!self.isResize || !isResizeMouseDown) return;

        if (self.isResize) {
          if (!self.initialPosition) {
            self.initialPosition = { x, y };
          }

          let deltaX = x - self.initialPosition.x;
          let deltaY = y - self.initialPosition.y;

          pos = offset(self.selectedEl);

          width = self.initialSize.width;
          height = self.initialSize.height;

          switch (self.resizeHandler) {
            // top
            case "top-left":
              height -= deltaY;
              width -= deltaX;
              break;

            case "top-center":
              height -= deltaY;
              break;

            case "top-right":
              height -= deltaY;
              width += deltaX;
              break;

            // center
            case "center-left":
              width -= deltaX;
              break;

            case "center-right":
              width += deltaX;
              break;

            // bottom
            case "bottom-left":
              width -= deltaX;
              height += deltaY;
              break;

            case "bottom-center":
              height += deltaY;
              break;

            case "bottom-right":
              width += deltaX;
              height += deltaY;
              break;
          }

          if (self.resizeMode == "css") {
            self.selectedEl.style.width = width + "px";
            self.selectedEl.style.height = height + "px";
            // Amit's code starts here
            // self.selectedEl.style.height = "auto";
            // Amit's code ends here
          } else {
            self.selectedEl.setAttribute("width", width);
            self.selectedEl.setAttribute("height", height);
          }

          let SelectBox = document.getElementById("select-box");
          SelectBox.style.top = pos.top - (self.frameDoc.scrollTop ?? 0) + "px";
          SelectBox.style.left =
            pos.left - (self.frameDoc.scrollLeft ?? 0) + "px";
          SelectBox.style.width = width + "px";
          SelectBox.style.height = self.selectedEl.offsetHeight + "px";
          SelectBox.style.display = "block";
        } else if (self.isDragging) {
          let noChildren = {
            input: true,
            textarea: true,
            img: true,
            svg: true,
            iframe: true,
            embed: true,
            col: true,
            area: true,
            hr: true,
            br: true,
            wbr: true,
          };

          let parent = self.highlightEl;

          if (self.dragType == "section") {
            let closest = parent.closest("section, header, footer, body");
            if (closest) {
              parent = closest;
            }
            noChildren.section = true;
          }

          let parentTagName = parent.tagName.toLowerCase();
          let isVattribute = false;
          //check if node is a data-v-attribute dynamic node that will override the content if added inside
          if (parent.childElementCount == 0) {
            for (let attr of parent.attributes) {
              if (
                attr.name.startsWith("data-v-") &&
                !attr.name.startsWith("data-v-component-")
              ) {
                isVattribute = true;
                break;
              }
            }
          }

          try {
            if (pos.top < y - halfHeight || pos.left < x - halfWidth) {
              if (noChildren[parentTagName] || isVattribute) {
                parent.after(self.dragElement);
              } else {
                if (parent == self.dragElement.parenNode) {
                  parent.appendChild(self.dragElement);
                } else {
                  parent.append(self.dragElement);
                }
              }

              prepend = true;
            } else {
              if (noChildren[parentTagName] || isVattribute) {
                parent.parentNode.insertBefore(self.dragElement, parent);
              } else {
                parent.prepend(self.dragElement);
              }

              prepend = false;
            }

            if (self.designerMode) {
              let parentOffset = offset(self.dragElement.offsetParent);
              self.dragElement.style.position = "absolute";
              self.dragElement.style.x =
                x - (parentOffset.left - self.frameDoc.scrollLeft);
              self.dragElement.style.y =
                y - (parentOffset.top - self.frameDoc.scrollTop);
            }
          } catch (err) {
            // console.log(err);
            return false;
          }

          if (!self.designerMode && self.iconDrag) {
            self.iconDrag.style.top = y + 60 + "px";
            self.iconDrag.style.left = x + self.leftPanelWidth + 10 + "px";
          }
        } // else //uncomment else to disable parent highlighting when dragging
        {
          //if text editor is open check if the highlighted element is not inside the editor
          if (Vvveb.WysiwygEditor.isActive) {
            if (self.texteditEl.contains(event.target)) {
              return true;
            }
          }

          // if (!currentForm) {
          //   document.getElementById("highlight-box").setAttribute(
          //     "style",
          //     `top:${pos.top - (self.frameDoc.scrollTop ?? 0)}px;
          // 	 left:${pos.left - (self.frameDoc.scrollLeft ?? 0)}px;
          // 	 width:${width}px;
          // 	 height:${height}px;
          // 	 display:${event.target.hasAttribute("contenteditable") ? "none" : "block"};
          // 	 border:${self.isDragging ? "1px dashed #0d6efd" : ""};
          // `
          //   );
          // } else {
          //   document.getElementById("highlight-box").style.display = "none";
          // }

          document.getElementById("highlight-box").setAttribute(
            "style",
            `top:${pos.top - (self.frameDoc.scrollTop ?? 0)}px; 
           left:${pos.left - (self.frameDoc.scrollLeft ?? 0)}px;
           width:${width}px; 
           height:${height}px;
           display:${event.target.hasAttribute("contenteditable") ? "none" : "block"
            };
           border:${self.isDragging ? "1px dashed #0d6efd" : ""};
        `
          );

          if (hoveredSection) {
            const hoveredSectionRect = hoveredSection.getBoundingClientRect();
            document.getElementById("section-edit-options").setAttribute(
              "style",
              `top:${hoveredSectionRect.top - (self.frameDoc.scrollTop ?? 0)
              }px; 
						 left:${hoveredSectionRect.left - (self.frameDoc.scrollLeft ?? 0)}px;
						 width:${hoveredSectionRect.width}px; 
						 height:${hoveredSectionRect.height}px;
					`
            );
          }

          if (currentCard) {
            const hoveredCardRect = hoveredCard.getBoundingClientRect();
            document.getElementById("hovering-options").setAttribute(
              "style",
              `top:${hoveredCardRect.top - (self.frameDoc.scrollTop ?? 0)}px; 
						 left:${hoveredCardRect.left - (self.frameDoc.scrollLeft ?? 0)}px;
						 width:${hoveredCardRect.width}px; 
						 height:${hoveredCardRect.height}px;
					`
            );
          } else {
            document.getElementById("hovering-options").style.display = "none";
          }

          if (currentForm) {
            const hoveredFormRect = currentForm.getBoundingClientRect();
            document.getElementById("form-edit-options").setAttribute(
              "style",
              `top:${hoveredFormRect.top - (self.frameDoc.scrollTop ?? 0)}px;
          	   left:${hoveredFormRect.left - (self.frameDoc.scrollLeft ?? 0)}px;
          	   width:${hoveredFormRect.width}px;
          	   height:${hoveredFormRect.height}px;
               `
            );
          } else {
            document.getElementById("form-edit-options").style.display = "none";
          }

          if (height < 50) {
            document.getElementById("section-actions").classList.add("outside");
          } else {
            document
              .getElementById("section-actions")
              .classList.remove("outside");
          }

          let elementType = self._getElementType(event.target);
          // Custom Modification - Jayanti - (Comment below lines)
          //   document.querySelector("#highlight-name .type").innerHTML =
          //     elementType[0];
          //   document.querySelector("#highlight-name .name").innerHTML =
          //     elementType[1];

          // Custom Modification - Jayanti changes for hover on highlight block
          const friendlyNames = {
            DIV: "Container",
            SECTION: "Section",
            H1: "Heading",
            H2: "Heading",
            H3: "Heading",
            H4: "Heading",
            H5: "Heading",
            H6: "Heading",
            P: "Paragraph",
            SPAN: "Text",
            SMALL: "Text",
            A: "Link",
            IMG: "Image",
            UL: "List",
            OL: "List",
            LI: "List",
            BUTTON: "Button",
            INPUT: "Input",
            FORM: "Form",
            VIDEO: "Video",
            TABLE: "Table",
            BODY: "Body",
            HTML: "Document Root",
          };

          // fallback to tag name if not found
          const tagName = elementType[1].toUpperCase();

          if (
            event.target.closest(".swiper-button-prev") ||
            event.target.closest(".swiper-button-next") ||
            event.target.closest(".swiper-pagination") ||
            event.target.closest(".swiper-pagination-bullet") ||
            event.target.closest(".vvveb-add-slide-helper") ||
            event.target.closest(".hamburger, .hamburger > *") ||
            event.target.classList.contains("swiper-wrapper") ||
            (event.target.tagName === "DIV" &&
              event.target.closest(".clonable-card, .swiper-slide")) ||
            event.target.closest("form")
          ) {
            document.getElementById("highlight-box").style.display = "none";
          }

          const readableName = friendlyNames[tagName] || tagName;
          document.querySelector("#highlight-name .type").innerHTML = "";
          // document.querySelector("#highlight-name .name").innerHTML =
          // readableName;

          // Custom Modificaion - Jayanti
          document.querySelector("#highlight-name .name").textContent =
            getSectionIdForHIghlight(event.target, readableName);
          if (!self.isDragging && !self.isResize) {
            self.updateAddBtnLabel(event.target);
          }
          //Custom Modification - jayanti changes done here
        }
      }
    };

    self.frameBody.addEventListener("mousemove", highlightMove);

    // Amit's code starts from here for the image history recording
    // let highlightUp = function (event) {
    let highlightUp = function (event) {
      // --- if a resize was happening, record single mutation for undo/redo ---
      if (self.isResize) {
        const el = self.selectedEl;
        if (
          el &&
          typeof Vvveb !== "undefined" &&
          Vvveb.Undo &&
          Vvveb.Undo.addMutation
        ) {
          if (self.resizeMode === "css") {
            const oldStyle = self.resizeOldStyle ?? "";
            const newStyle = el.getAttribute("style") ?? "";
            if (oldStyle !== newStyle) {
              Vvveb.Undo.addMutation({
                type: "attributes",
                target: el,
                attributeName: "style",
                oldValue: oldStyle,
                newValue: newStyle,
              });
            }
          } else {
            // using width/height attributes mode
            const oldW = self.resizeOldWidthAttr ?? null;
            const oldH = self.resizeOldHeightAttr ?? null;
            const newW = el.getAttribute("width") ?? null;
            const newH = el.getAttribute("height") ?? null;

            if (oldW !== newW || oldH !== newH) {
              Vvveb.Undo.addMutation({
                type: "attributes",
                target: el,
                attributeName: "width,height",
                oldValue: JSON.stringify({
                  width: oldW,
                  height: oldH,
                }),
                newValue: JSON.stringify({
                  width: newW,
                  height: newH,
                }),
              });
            }
          }
        }
      }

      // now clear the resize flag and continue with the rest of the existing logic
      self.isResize = false;

      document
        .querySelectorAll("#section-actions, #highlight-name")
        .forEach((el) => (el.style.display = ""));
      if (self.isDragging) {
        self.isDragging = false;
        Vvveb.Builder.highlightEnabled = true;
        if (self.iconDrag) self.iconDrag.remove();
        document.getElementById("component-clone")?.remove();

        if (self.dragMoveMutation === false) {
          if (self.component.dragHtml || Vvveb.dragHtml) {
            //if dragHtml is set for dragging then set real component html
            if (self.component) {
              newElement = generateElements(self.component.html)[0];
              self.dragElement.replaceWith(newElement);
              self.dragElement = newElement;
            }
          }

          if (self.component.afterDrop)
            self.dragElement = self.component.afterDrop(self.dragElement);
        } else {
          self.selectedEl.classList.remove("is-dragged");
          self.dragElement.replaceWith(self.selectedEl);
          self.dragElement = self.selectedEl;
        }

        const node = self.dragElement;
        self.selectNode(node);
        Vvveb.TreeList.loadComponents();
        Vvveb.TreeList.selectComponent(node);
        self.loadNodeComponent(node);
        //if component properties is loaded in left panel tab instead of right panel show tab
        let propertiesTab = document.querySelector(
          ".component-properties-tab a"
        );
        if (propertiesTab.offsetParent) {
          //if properites tab is enabled/visible
          propertiesTab.style.display = "";
          const bsTab = bootstrap.Tab.getOrCreateInstance(propertiesTab);
          bsTab.show();
        }

        if (self.dragType == "section") {
          node.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }

        if (self.dragMoveMutation === false) {
          Vvveb.Undo.addMutation({
            type: "childList",
            target: node.parentNode,
            addedNodes: [node],
            nextSibling: node.nextSibling,
          });
        } else {
          self.dragMoveMutation.newParent = node.parentNode;
          self.dragMoveMutation.newNextSibling = node.nextSibling;

          Vvveb.Undo.addMutation(self.dragMoveMutation);
          self.dragMoveMutation = false;
        }
      }
    };
    // Amit's code ends from here for the image history recording
    //   self.isResize = false;
    //   document
    //     .querySelectorAll("#section-actions, #highlight-name")
    //     .forEach((el) => (el.style.display = ""));
    //   if (self.isDragging) {
    //     self.isDragging = false;
    //     Vvveb.Builder.highlightEnabled = true;
    //     if (self.iconDrag) self.iconDrag.remove();
    //     document.getElementById("component-clone")?.remove();

    //     if (self.dragMoveMutation === false) {
    //       if (self.component.dragHtml || Vvveb.dragHtml) {
    //         //if dragHtml is set for dragging then set real component html
    //         if (self.component) {
    //           newElement = generateElements(self.component.html)[0];
    //           self.dragElement.replaceWith(newElement);
    //           self.dragElement = newElement;
    //         }
    //       }

    //       if (self.component.afterDrop)
    //         self.dragElement = self.component.afterDrop(self.dragElement);
    //     } else {
    //       self.selectedEl.classList.remove("is-dragged");
    //       self.dragElement.replaceWith(self.selectedEl);
    //       self.dragElement = self.selectedEl;
    //     }

    //     const node = self.dragElement;
    //     self.selectNode(node);
    //     Vvveb.TreeList.loadComponents();
    //     Vvveb.TreeList.selectComponent(node);
    //     self.loadNodeComponent(node);
    //     //if component properties is loaded in left panel tab instead of right panel show tab
    //     let propertiesTab = document.querySelector(
    //       ".component-properties-tab a"
    //     );
    //     if (propertiesTab.offsetParent) {
    //       //if properites tab is enabled/visible
    //       propertiesTab.style.display = "";
    //       const bsTab = bootstrap.Tab.getOrCreateInstance(propertiesTab);
    //       bsTab.show();
    //     }

    //     if (self.dragType == "section") {
    //       node.scrollIntoView({
    //         behavior: "smooth",
    //         block: "center",
    //         inline: "center",
    //       });
    //     }

    //     if (self.dragMoveMutation === false) {
    //
    // Vvveb.Undo.addMutation({
    //         type: "childList",
    //         target: node.parentNode,
    //         addedNodes: [node],
    //         nextSibling: node.nextSibling,
    //       });
    //     } else {
    //       self.dragMoveMutation.newParent = node.parentNode;
    //       self.dragMoveMutation.newNextSibling = node.nextSibling;

    //       Vvveb.Undo.addMutation(self.dragMoveMutation);
    //       self.dragMoveMutation = false;
    //     }
    //   }
    // };

    self.frameBody.addEventListener("mouseup", highlightUp);

    let highlightDbClick = function (event) {
      if (Vvveb.Builder.isPreview == false) {
        if (!Vvveb.WysiwygEditor.isActive) {
          self.selectPadding = 10;
          self.texteditEl = target = event.target;

          Vvveb.WysiwygEditor.edit(self.texteditEl);

          _updateSelectBox = function (event) {
            if (!self.texteditEl) return;
            let pos = offset(self.selectedEl);

            let SelectBox = document.getElementById("select-box");

            SelectBox.style.top =
              pos.top -
              (self.frameDoc.scrollTop ?? 0) -
              self.selectPadding +
              "px";
            SelectBox.style.left =
              pos.left -
              (self.frameDoc.scrollLeft ?? 0) -
              self.selectPadding +
              "px";
            SelectBox.style.width =
              self.texteditEl.offsetWidth + self.selectPadding * 2 + "px";
            SelectBox.style.height =
              self.texteditEl.offsetHeight + self.selectPadding * 2 + "px";
            SelectBox.style.display = "block";
          };

          //update select box when the text size is changed
          self.texteditEl.addEventListener("blur", _updateSelectBox);
          self.texteditEl.addEventListener("keyup", _updateSelectBox);
          self.texteditEl.addEventListener("paste", _updateSelectBox);
          self.texteditEl.addEventListener("input", _updateSelectBox);
          self.texteditEl.addEventListener("change", _updateSelectBox);
          _updateSelectBox();

          document.getElementById("select-box").classList.add("text-edit");
          document.getElementById("select-actions").style.display = "none";
          document.getElementById("highlight-box").style.display = "none";
          document.getElementById("section-edit-options").style.display =
            "none";
        }
      }
    };

    // Disabled: open WYSIWYG only from the toolbar button
    // self.frameBody.addEventListener("dblclick", highlightDbClick);

    let highlightClick = function (event) {
      if (Vvveb.Builder.isPreview == false) {
        if (event.target) {
          const listOfResize = document.querySelectorAll(".top-center, .center-left, .center-right, .bottom-center");
          const resizeDiv = document.querySelector(".resize");
          const wresizeDiv = resizeDiv.offsetWidth;
          const hresizeDiv = resizeDiv.offsetHeight;
          if (wresizeDiv <= 50 && hresizeDiv <= 50) {
            listOfResize.forEach(element => {
              element.style.display = 'none';
            })
          } else {
            listOfResize.forEach(element => {
              element.style.display = 'block';
            })
          }

          const maskPanel = document.getElementById("mask-popup");
          if (maskPanel.classList.contains("show")) {
            maskPanel.classList.remove("show");
          }

          const emojipopup = document.getElementById("emoji-picker-container");
          emojipopup.style.display = "none";

          if (Vvveb.WysiwygEditor.isActive) {
            // if (self.texteditEl.contains(event.target)) {
            //   return true;
            // }
            // 🔹 Ignore clicks inside the "Add link" helper

            let win = Vvveb.Builder.iframe.contentWindow;
            let selection = win.getSelection();
            let isHighlightingText = selection && selection.toString().trim().length > 0;

            // 2. Keep the editor open if clicking inside OR if the user is highlighting text
            if (self.texteditEl.contains(event.target) || isHighlightingText) {
              return true;
            }

            if (
              event.target.closest &&
              event.target.closest(
                "[data-vvveb-helpers], .vvveb-add-link-helper"
              )
            ) {
              // Let our own Add-link handler run, but don't select it in builder
              return true;
            }
          }
          //if component properties is loaded in left panel tab instead of right panel show tab
          let componentTab = document.querySelector(
            ".component-properties-tab a"
          );
          if (componentTab.offsetParent) {
            //if properites tab is enabled/visible
            componentTab.style.display = "";
            const bsTab = bootstrap.Tab.getOrCreateInstance(componentTab);
            bsTab.show();
          }

          if (
            !event.target.closest(".swiper-button-prev") &&
            !event.target.closest(".swiper-button-next") &&
            !event.target.closest(".swiper-pagination-bullet") &&
            !event.target.closest(".hamburger, .hamburger-box, .hamburger-inner") &&
            !event.target.closest(".vvveb-add-slide-helper") &&
            !event.target.closest("form") &&
            !(
              event.target.tagName === "DIV" &&
              event.target.closest(".clonable-card > div, .swiper-slide > div")
            )
          ) {
            self.selectNode(event.target);

            Vvveb.TreeList.selectComponent(event.target);
            self.loadNodeComponent(event.target);

            // Writing to hide the resizing option on the logo image
            const excludingElements = ["[data-logo]"];
            function checkexcludingElements(excludingElements) {
              for (let i = 0; i < excludingElements.length; i++) {
                if (event.target.closest(excludingElements[i])) {
                  return true;
                }
              }
              return false;
            }
            // Writing to hide the resizing option on the logo image (ends here)

            if (Vvveb.component.resizable && !checkexcludingElements(excludingElements)) {
              document.getElementById("select-box").classList.add("resizable");
              self.resizeMode = Vvveb.component.resizeMode;
            } else {
              document
                .getElementById("select-box")
                .classList.remove("resizable");
            }
          }

          document.getElementById("add-section-box").style.display = "none";
          event.preventDefault();
          return false;
        }
      }
    };

    self.frameBody.addEventListener("click", highlightClick);

    // let pressStartTime;
    // const CLICK_THRESHOLD = 500; // Time in milliseconds

    // self.frameBody.addEventListener("pointerdown", (event) => {
    //   pressStartTime = Date.now();
    // });

    // self.frameBody.addEventListener("pointerup", (event) => {
    //   if (!pressStartTime) return;
    //   const pressDuration = Date.now() - pressStartTime;

    //   if (pressDuration < CLICK_THRESHOLD) {
    //     highlightClick(event);
    //   } else {
    //   }
    // });

    self.frameBody.addEventListener(
      "click",
      (event) => {
        // if (Vvveb.Builder.isPreview == false) {
        event.preventDefault();
        // }
      },
      true
    );

    self.frameBody.addEventListener(
      "dblclick",
      (event) => {
        // if (Vvveb.Builder.isPreview == false) {
        event.preventDefault();
        // }
      },
      true
    );
  },

  _initBox: function () {
    let self = this;

    // Amit;s code starts here for the drag and drop issue
    // document
    //   .getElementById("drag-btn")
    //   .addEventListener("mousedown", function (event) {
    //     //self.dragElement = self.selectedEl.setAttribute("style",Vvveb.dragElementStyle);
    //     if (event.which == 1) {
    //       //left click
    //       self.isDragging = true;
    //       document
    //         .querySelectorAll("#section-actions, #highlight-name, #select-box")
    //         .forEach((el) => (el.style.display = ""));

    //       if (self.designerMode) {
    //         self.dragElement = self.selectedEl;
    //       } else {
    //         self.selectedEl.style.position = "";
    //         self.selectedEl.style.top = "";
    //         self.selectedEl.style.left = "";

    //         self.selectedEl.classList.add("is-dragged");
    //         self.dragElement = generateElements(Vvveb.dragHtml)[0];
    //       }

    //       const node = self.selectedEl;

    //       self.dragMoveMutation = {
    //         type: "move",
    //         target: node,
    //         oldParent: node.parentNode,
    //         oldNextSibling: node.nextSibling,
    //       };

    //       //self.selectNode(false);
    //       event.preventDefault();
    //       return false;
    //     }
    //   });

    const dragBtn = document.getElementById("drag-btn");
    let isMouseDown = false;
    let dragStarted = false;
    let startX = 0;
    let startY = 0;
    const DRAG_THRESHOLD = 5; // pixels

    dragBtn.addEventListener("click", function (event) {
      event.preventDefault();
    });

    dragBtn.addEventListener("mousedown", function (event) {
      if (event.button !== 0) return;
      event.preventDefault();
      isMouseDown = true;
      dragStarted = false;
      startX = event.clientX;
      startY = event.clientY;
    });

    document.addEventListener("mousemove", function (event) {
      if (!isMouseDown) return;

      // calculate how far the mouse has moved
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (!dragStarted && distance > DRAG_THRESHOLD) {
        dragStarted = true;

        // ---- Your drag init code ----
        self.isDragging = true;
        document
          .querySelectorAll("#section-actions, #highlight-name, #select-box")
          .forEach((el) => (el.style.display = ""));

        if (self.designerMode) {
          self.dragElement = self.selectedEl;
        } else {
          self.selectedEl.style.position = "";
          self.selectedEl.style.top = "";
          self.selectedEl.style.left = "";
          self.selectedEl.classList.add("is-dragged");
          self.dragElement = generateElements(Vvveb.dragHtml)[0];
        }

        const node = self.selectedEl;
        self.dragMoveMutation = {
          type: "move",
          target: node,
          oldParent: node.parentNode,
          oldNextSibling: node.nextSibling,
        };

        event.preventDefault();
      }

      // if dragStarted is true → here you can update element position while dragging
    });

    document.addEventListener("mouseup", function () {
      isMouseDown = false;
      dragStarted = false;
    });

    // Amit's code ends here for the drag and drop issue

    // let resizeDown = function (event) {
    //   if (event.which == 1) {
    //     //left click
    //     document.querySelector(
    //       "#section-actions, #highlight-name, #highlight-box"
    //     ).style.display = "none";

    //     self.isResize = true;
    //     // Amit's code starts here for the image undo/redo
    //     // at start of resizeDown (after self.isResize = true; and initialSize set)
    //     self.resizeOldStyle = self.selectedEl.getAttribute("style") || "";
    //     // also store width/height attributes if used
    //     self.resizeOldWidthAttr = self.selectedEl.getAttribute("width");
    //     self.resizeOldHeightAttr = self.selectedEl.getAttribute("height");
    //     // Amit's code ends here for the image undo/redo

    //     self.initialSize = {
    //       width: self.selectedEl.offsetWidth,
    //       height: self.selectedEl.offsetHeight,
    //     };
    //     self.initialPosition = false;
    //     self.resizeHandler = this.className;

    //     event.preventDefault();
    //     return false;
    //   }
    // };

    let resizeDown = function (event) {
      if (event.button !== 0) return;

      event.preventDefault();

      isResizeMouseDown = true; // physical latch
      self.isResize = true; // logical resize mode

      document
        .querySelectorAll(
          "#section-actions, #highlight-name, #highlight-box,#section-edit-options"
        )
        .forEach((el) => (el.style.display = "none"));

      // store undo snapshot
      self.resizeOldStyle = self.selectedEl.getAttribute("style") || "";
      self.resizeOldWidthAttr = self.selectedEl.getAttribute("width");
      self.resizeOldHeightAttr = self.selectedEl.getAttribute("height");

      self.initialSize = {
        width: self.selectedEl.offsetWidth,
        height: self.selectedEl.offsetHeight,
      };

      self.initialPosition = false;
      self.resizeHandler = this.className;
    };

    document.addEventListener("mouseup", () => {
      isResizeMouseDown = false;
      self.isResize = false;
    });

    document
      .querySelectorAll(".resize > div")
      .forEach((e) => e.addEventListener("mousedown", resizeDown));

    document
      .getElementById("down-btn")
      .addEventListener("click", function (event) {
        document.getElementById("select-box").style.display = "none";

        Vvveb.Builder.moveNodeDown();

        event.preventDefault();
        return false;
      });

    document
      .getElementById("up-btn")
      .addEventListener("click", function (event) {
        document.getElementById("select-box").style.display = "none";

        Vvveb.Builder.moveNodeUp();

        event.preventDefault();
        return false;
      });

    document
      .getElementById("clone-btn")
      .addEventListener("click", function (event) {
        Vvveb.Builder.cloneNode();

        event.preventDefault();
        return false;
      });

    document
      .getElementById("parent-btn")
      .addEventListener("click", function (event) {
        const node = self.selectedEl.parentNode;

        self.selectNode(node);
        self.loadNodeComponent(node);
        Vvveb.TreeList.selectComponent(node);

        event.preventDefault();
        return false;
      });

    document
      .getElementById("save-reusable-btn")
      .addEventListener("click", function (event) {
        const node = self.selectedEl;

        let type = "block";
        if (node.tagName.toLowerCase() == "section") {
          type = "section";
        }

        const name = prompt("Enter name for new reusable " + type, "");
        if (name) {
          Vvveb.Builder.saveElement(node, type, name);
        }

        event.preventDefault();
        return false;
      });

    let codeEditorOldValue;
    document
      .getElementById("edit-code-btn")
      .addEventListener("click", function (event) {
        let value = Vvveb.Builder.selectedEl.innerHTML;

        Vvveb.ModalCodeEditor.show();
        Vvveb.ModalCodeEditor.setValue(value);

        codeEditorOldValue = value;

        event.preventDefault();
        return false;
      });

    // Amit's code starts from here for the adding the mutation on nothing chaning
    let onSave = function (event) {
      Vvveb.Builder.selectedEl.innerHTML = event.detail;

      const node = Vvveb.Builder.selectedEl;
      if (codeEditorOldValue != node.innerHTML) {
        Vvveb.Undo.addMutation({
          type: "characterData",
          target: node,
          oldValue: codeEditorOldValue,
          newValue: node.innerHTML,
        });
      }

      Vvveb.Builder.selectNode(node);
    };

    window.addEventListener("vvveb.ModalCodeEditor.save", onSave);

    document
      .getElementById("translate-code-btn")
      ?.addEventListener("click", function (event) {
        let selectedEl = Vvveb.Builder.selectedEl;
        let value = selectedEl.innerHTML.trim();
        // uncomment to use outerHTML, not recommended
        //let value = selectedEl.outerHTML;
        Vvveb.ModalCodeEditor.show();
        Vvveb.ModalCodeEditor.setValue(value);

        let onSave = function (event) {
          selectedEl.innerHTML = event.detail;
          //selectedEl.outerHTML = value;
        };

        window.removeEventListener("vvveb.ModalCodeEditor.save", onSave);
        window.addEventListener("vvveb.ModalCodeEditor.save", onSave);

        event.preventDefault();
        return false;
      });

    // document
    //   .getElementById("delete-btn")
    //   .addEventListener("click", function (event) {
    //     document.getElementById("select-box").style.display = "none";

    //     const node = self.selectedEl;

    //
    // Vvveb.Undo.addMutation({
    //       type: "childList",
    //       target: node.parentNode,
    //       removedNodes: [node],
    //       nextSibling: node.nextSibling,
    //     });

    //     self.selectedEl.remove();
    //     Vvveb.TreeList.loadComponents();
    //     Vvveb.SectionList.loadSections();

    //     event.preventDefault();
    //     return false;
    //   });

    // document                                    // Amit has commented this
    //   .getElementById("delete-btn")
    //   .addEventListener("click", function (event) {
    //     document.getElementById("select-box").style.display = "none";

    //     let node = self.selectedEl;

    //     // 🔹 If we are inside a navbar <li>, delete the whole <li>, not just the <a>
    //     if (node && node.closest) {
    //       const liParent = node.closest("li");
    //       const navUl =
    //         liParent && liParent.parentElement ? liParent.parentElement : null;

    //       if (
    //         liParent &&
    //         navUl &&
    //         navUl.matches("ul.navbar-nav, ul.nav, nav ul")
    //       ) {
    //         node = liParent; // remove the li instead
    //       }
    //     }

    //     if (!node || !node.parentNode) {
    //       event.preventDefault();
    //       return false;
    //     }

    //
    // Vvveb.Undo.addMutation({
    //       type: "childList",
    //       target: node.parentNode,
    //       removedNodes: [node],
    //       nextSibling: node.nextSibling,
    //     });

    //     node.remove();
    //     Vvveb.TreeList.loadComponents();
    //     Vvveb.SectionList.loadSections();

    //     event.preventDefault();
    //     return false;
    //   });

    document
      .getElementById("delete-btn")
      .addEventListener("click", function (event) {
        event.preventDefault();

        document.getElementById("select-box").style.display = "none";

        let node = self.selectedEl;
        if (!node || !node.parentNode) return false;

        // Handle navbar <li>
        const liParent = node.closest("li");
        const navUl = liParent?.parentElement;
        if (liParent && navUl?.matches("ul.navbar-nav, ul.nav, nav ul")) {
          node = liParent;
        }

        // Find highest removable node
        let current = node;
        while (
          current.parentNode &&
          current.parentNode !== document.body &&
          current.parentNode.children.length === 1
        ) {
          current = current.parentNode;
        }

        const parent = current.parentNode;
        const nextSibling = current.nextSibling;

        // Record undo
        Vvveb.Undo.addMutation({
          type: "childList",
          target: parent,
          removedNodes: [current],
          nextSibling: nextSibling,
        });

        // 🔥 REMOVE ONCE
        current.remove();

        // 🔄 Swiper handling
        const swiperWrapper = parent.closest(".swiper-wrapper");
        const swiperContainer = parent.closest(".swiper");

        if (swiperWrapper && swiperContainer?.swiper) {
          reindexSwiper(swiperContainer);
          updateAddSlideBtnState(swiperContainer);
          swiperContainer.swiper.update();
          swiperContainer.swiper.pagination?.render();
          swiperContainer.swiper.pagination?.update();
        }

        // Refresh UI
        Vvveb.TreeList.loadComponents();
        Vvveb.SectionList.loadSections();

        return false;
      });

    document
      .getElementById("hovered-delete-btn")
      .addEventListener("click", function (event) {
        event.preventDefault();

        let nodeCard = hoveredCard;
        if (!nodeCard) return;

        // Find highest removable node
        let current = nodeCard;
        while (
          current.parentNode &&
          current.parentNode !== document.body &&
          current.parentNode.children.length === 1
        ) {
          current = current.parentNode;
        }

        const parent = current.parentNode;
        const nextSibling = current.nextSibling;

        // Record undo
        Vvveb.Undo.addMutation({
          type: "childList",
          target: parent,
          removedNodes: [current],
          nextSibling: nextSibling,
        });

        nodeCard.remove();

        // 🔄 Swiper handling
        const swiperWrapper = parent.closest(".swiper-wrapper");
        const swiperContainer = parent.closest(".swiper");

        if (swiperWrapper && swiperContainer?.swiper) {
          reindexSwiper(swiperContainer);
          updateAddSlideBtnState(swiperContainer);
          swiperContainer.swiper.update();
          swiperContainer.swiper.pagination?.render();
          swiperContainer.swiper.pagination?.update();
        }

        // Refresh UI
        Vvveb.TreeList.loadComponents();
        Vvveb.SectionList.loadSections();

        return false;
      });

    // Open WYSIWYG only when edit icon is clicked
    document
      .getElementById("edit-section-btn")
      ?.addEventListener("click", function (event) {
        event.preventDefault();
        const el = Vvveb.Builder.selectedEl;
        if (el) {
          Vvveb.WysiwygEditor.edit(el);
        }
        return false;
      });

    // Custom Modification - Jayanti Changes for Plus Icon Box group

    //  <!-- Custom Modification - Jayanti - 16 Sep 2025 -->
    let addSectionBox = document.getElementById("add-section-box");
    let addSectionElement = {};

    // ---- Insert Panel (full-page) controller ----

    const InsertPanel = (() => {
      const modal = document.getElementById("insert-modal");
      const backdrop = document.getElementById("insert-modal-backdrop");
      const titleEl = document.getElementById("insert-modal-title");
      const compHost = document.getElementById("components-host");
      const blockHost = document.getElementById("blocks-host");

      function onOutsidePointerDown(e) {
        // modal close
        if (modal.classList.contains("is-hidden")) return;
        if (!modal.contains(e.target)) {
          close();
        }
      }
      function setMode(mode) {
        if (mode === "components") {
          compHost.classList.remove("is-hidden");
          blockHost.classList.add("is-hidden");
          titleEl.textContent = "Add Component";
          modal.setAttribute("data-mode", "components");
        } else {
          blockHost.classList.remove("is-hidden");
          compHost.classList.add("is-hidden");
          titleEl.textContent = "Insert Section";
          modal.setAttribute("data-mode", "blocks");
        }
      }

      function open(mode, anchorEl) {
        // keep compatibility with existing addSectionComponent()
        if (backdrop.parentNode !== document.body) {
          document.body.appendChild(backdrop);
        }
        if (modal.parentNode !== document.body) {
          document.body.appendChild(modal);
        }

        // window.addSectionElement = anchorEl;

        setMode(mode);
        backdrop.classList.remove("is-hidden");
        modal.classList.remove("is-hidden");

        document.addEventListener("pointerdown", onOutsidePointerDown, true);
        // focus search of active host
        modal.querySelector(".component-search")?.focus();

        if (mode === "blocks") {
          setTimeout(() => {
            document.dispatchEvent(
              new CustomEvent("vvveb.insertpanel.blocksReady")
            );
          }, 0);
        }
        // ✅ Auto enable masonry layout for block list when insert modal opens
        setTimeout(() => {
          const lists = document.querySelectorAll(
            "#blocks-host .blocks-list>li>ol"
          );
          lists.forEach((ol) => {
            ol.classList.add("masonry-columns");
          });
        }, 50);
      }

      function close() {
        backdrop.classList.add("is-hidden");
        modal.classList.add("is-hidden");
        document.body.classList.remove("vvv-modal-open");
        document.removeEventListener("pointerdown", onOutsidePointerDown, true);
      }

      // Close actions
      document
        .getElementById("insert-modal-close")
        .addEventListener("click", close);
      backdrop.addEventListener("click", close);
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") close();
      });

      // Prevent clicks inside modal from closing
      modal.addEventListener("click", (e) => e.stopPropagation());

      // Close on backdrop click
      backdrop.addEventListener("click", function (e) {
        e.stopPropagation();
        close();
      });

      // Click-to-insert (delegated)
      modal.addEventListener("click", function (e) {
        const li = e.target.closest("li[data-type]");
        if (!li) return;

        const mode = modal.getAttribute("data-mode");
        let component =
          mode === "components"
            ? Vvveb.Components.get(li.dataset.type)
            : Vvveb.Blocks.get(li.dataset.type);

        // ✅ NEW: replace mode
        if (mode === "blocks" && modal._replaceTarget) {
          const oldEl = modal._replaceTarget;
          let newNode = generateElements(component.html)[0];

          // (optional but very useful) stamp metadata for future replacements
          try {
            if (component.category) {
              newNode.dataset.vvvebBlockCat = (
                component.category + ""
              ).toLowerCase();
            }
            if (component.type || li.dataset.type) {
              newNode.dataset.vvvebBlockType =
                component.type || li.dataset.type;
            }
          } catch (err) { }

          oldEl.replaceWith(newNode);

          // keep your usual selection/undo pipeline
          Vvveb.Builder.selectNode(newNode);
          Vvveb.Builder.loadNodeComponent(newNode);
          Vvveb.TreeList.loadComponents();
          Vvveb.TreeList.selectComponent(newNode);

          Vvveb.Undo.addMutation({
            type: "childList",
            target: newNode.parentNode,
            removedNodes: [oldEl],
            addedNodes: [newNode],
            nextSibling: newNode.nextSibling,
          });

          modal._replaceTarget = null;
          InsertPanel.close();
          return;
        }

        // fallback = your original insert-after behavior
        addSectionComponent(component, true);
        InsertPanel.close();
      });

      //
      // ===== Blocks Sidebar: tag + filter =====
      function normalize(str) {
        return (str || "").toLowerCase();
      }

      // Rule-based categorization from block id/name
      function detectCategoryFromIdOrName(id, name) {
        const s = (id + " " + name).toLowerCase();
        if (s.includes("/team") || s.includes(" team")) return "team";
        if (s.includes("contact")) return "contact";
        if (s.includes("pricing") || s.includes("price") || s.includes("plan"))
          return "pricing"; // <-- add this
        if (
          s.includes("hero") ||
          s.includes("jumbotron") ||
          s.includes("header") ||
          s.includes("banner")
        )
          return "hero";
        return "other";
      }

      // Tag all block tiles with data-category once the list exists
      function tagBlockTiles() {
        const host = document.querySelector("#blocks-host");
        const tiles = host?.querySelectorAll("li[data-type]") || [];
        tiles.forEach((li) => {
          const type = li.getAttribute("data-type") || "";
          const title =
            li.querySelector(".name, .header, a, span")?.textContent || "";

          // ✅ Blocks ke metadata se category lo; agar na mile to fallback
          let cat = "other";
          try {
            const meta = Vvveb.Blocks.get(type);
            if (meta && meta.category) {
              cat = (meta.category + "").toLowerCase();
            } else {
              cat = detectCategoryFromIdOrName(type, title);
            }
          } catch (e) {
            cat = detectCategoryFromIdOrName(type, title);
          }

          li.dataset.category = cat;
        });
      }

      // Filter function
      function filterBlocks(cat) {
        const host = document.querySelector("#blocks-host");
        const tiles = host?.querySelectorAll("li[data-type]") || [];
        tiles.forEach((li) => {
          const liCat = li.dataset.category || "other";
          li.style.display = cat === "all" || liCat === cat ? "" : "none";
        });
      }

      // Wire sidebar clicks
      function initBlockSidebar() {
        const list = document.getElementById("block-cat-list");
        if (!list) return;

        list.addEventListener("click", (e) => {
          const li = e.target.closest("li[data-cat]");
          if (!li) return;
          list
            .querySelectorAll("li")
            .forEach((n) => n.classList.remove("active"));
          li.classList.add("active");
          filterBlocks(li.dataset.cat);
        });
      }

      // When modal opens in "blocks" mode, tag + default filter
      document.addEventListener("vvveb.insertpanel.blocksReady", () => {
        tagBlockTiles();
        initBlockSidebar();
        filterBlocks("all"); // default: All
      });

      return { open, close, setMode };
    })();

    window.InsertPanel = InsertPanel;
    Vvveb.InsertPanel = InsertPanel;

    // Custom Modification - Jayanti - 20-09-2025
    //  Category-aware text search
    function normalize(str) {
      return (str || "").toLowerCase().trim();
    }

    function buildCategoryIndex() {
      const list = document.getElementById("block-cat-list");
      const cats = [];
      list?.querySelectorAll("li[data-cat]").forEach((li) => {
        cats.push({
          id: (li.dataset.cat || "other").toLowerCase(),
          label: normalize(li.textContent),
        });
      });
      return cats;
    }

    function findMatchingCategories(q, catIndex) {
      if (!q) return [];
      return catIndex
        .filter((c) => c.id.includes(q) || c.label.includes(q))
        .map((c) => c.id);
    }

    function highlightCategories(matchIds) {
      const list = document.getElementById("block-cat-list");
      if (!list) return;
      list.querySelectorAll("li[data-cat]").forEach((li) => {
        const id = (li.dataset.cat || "").toLowerCase();
        li.classList.toggle(
          "matched",
          matchIds.length && matchIds.includes(id)
        );
      });
    }

    // 🔎 text + category search apply
    function applyBlockFilters() {
      const host = document.querySelector("#blocks-host");
      const tiles = host?.querySelectorAll("li[data-type]") || [];
      const input = host?.querySelector(".block-search");
      const q = normalize(input?.value || "");

      const active = document.querySelector("#block-cat-list li.active");
      const activeCat = active
        ? (active.dataset.cat || "all").toLowerCase()
        : "all";

      const catIndex = buildCategoryIndex();
      const queryCats = findMatchingCategories(q, catIndex); // categories matched by query
      highlightCategories(queryCats);

      tiles.forEach((li) => {
        const liCat = (li.dataset.category || "other").toLowerCase();
        const type = normalize(li.getAttribute("data-type") || "");
        const label = normalize(
          li.querySelector(".name, .header, a, span")?.textContent || ""
        );

        const matchTxt = !q || type.includes(q) || label.includes(q);
        // if user typed a category, restrict to those cats; otherwise respect active tab
        const matchCatFromQuery = queryCats.length
          ? queryCats.includes(liCat)
          : true;
        const matchActiveCat = queryCats.length
          ? true
          : activeCat === "all" || liCat === activeCat;

        li.style.display =
          matchTxt && matchCatFromQuery && matchActiveCat ? "" : "none";
      });
    }

    // 🪝 wire search input + clear + category click
    document.addEventListener("vvveb.insertpanel.blocksReady", () => {
      const host = document.querySelector("#blocks-host");
      const input = host?.querySelector(".block-search");
      const clear = host?.querySelector(
        ".builder-sidebar__search .clear-backspace"
      );
      const list = document.getElementById("block-cat-list");

      // ensure tiles tagged once (your code already calls tagBlockTiles())
      if (input && !input.__catSearchBound) {
        input.addEventListener("input", applyBlockFilters);
        input.__catSearchBound = true;
      }
      if (clear) {
        clear.addEventListener("click", () => {
          input.value = "";
          input.dispatchEvent(new Event("input"));
          input.focus();
        });
      }
      if (list && !list.__catClickBound) {
        list.addEventListener("click", (e) => {
          const li = e.target.closest("li[data-cat]");
          if (!li) return;
          // active tab toggle pehle se ho raha — bas filter re-apply
          setTimeout(applyBlockFilters, 0);
        });
        list.__catClickBound = true;
      }

      // default load
      applyBlockFilters();
    });

    // Custom Modification Ends Here - Jayanti - 20-09-2025
    document
      .getElementById("add-section-btn")
      .addEventListener("click", function (event) {
        // addSectionElement = self.highlightEl;
        addSectionElement = hoveredSection;
        const mode = window.isSectionNode(addSectionElement)
          ? "blocks"
          : "components";
        try {
          document.getElementById("add-section-box").style.display = "none";
        } catch (e) { }
        InsertPanel.open(mode, addSectionElement);
        // addSectionBox.style.display = "block";

        let pos = offset(addSectionElement);
        // let top = ((pos.top + window.FrameWindow.pageYOffset + addSectionElement.clientTop) - self.frameHtml.scrollTop) + addSectionElement.offsetHeight;
        // let left = ((pos.left + window.FrameWindow.pageXOffset + addSectionElement.clientLeft) - self.frameHtml.scrollLeft) + (addSectionElement.offsetWidth / 2) - (addSectionBox.offsetWidth / 2);

        let rect = addSectionElement.getBoundingClientRect();
        let addBoxHeight = addSectionBox.offsetHeight;
        let addBoxWidth = addSectionBox.offsetWidth;

        let viewportHeight = window.innerHeight;

        // Center of element wrt viewport
        let elementMiddle = rect.top + rect.height / 2;

        let top;
        if (elementMiddle < viewportHeight / 2) {
          // top half – show below
          top = rect.bottom;
        } else {
          // bottom half – show above
          top = rect.top - addBoxHeight;
          if (top < 0) top = 0;
        }

        // Center horizontally
        let left = rect.left + rect.width / 2 - addBoxWidth / 2;

        // Clamp left to viewport
        if (left < 0) left = 0;
        if (left + addBoxWidth > window.innerWidth) {
          left = window.innerWidth - addBoxWidth;
        }

        // Apply
        addSectionBox.style.top = `${top}px`;
        addSectionBox.style.left = `${left}px`;

        // let left = pos.left + (addSectionElement.offsetWidth / 2) - (addSectionBox.offsetWidth / 2) - (self.frameDoc?.scrollLeft ?? 0);

        let outerHeight =
          window.FrameWindow.innerHeight + self.frameHtml.scrollTop;

        //check if box is out of viewport and move inside
        // if (left < 0) left = 0;
        // if (top < 0) top = 0;
        // if ((left + addSectionBox.offsetWidth) > self.frameHtml.offsetWidth) left = self.frameHtml.offsetWidth - addSectionBox.offsetWidth;
        // if (((top + addSectionBox.offsetHeight) + self.frameHtml.scrollTop) > outerHeight) top = top - addSectionBox.offsetHeight;

        // addSectionBox.style.top  = top + "px";
        // addSectionBox.style.left  = left + "px";

        event.preventDefault();
        return false;
      });

    document
      .getElementById("close-section-btn")
      .addEventListener("click", function (event) {
        addSectionBox.style.display = "none";
      });

    function addSectionComponent(component, after = true) {
      let node = generateElements(component.html)[0];

      if (after) {
        addSectionElement.after(node);
      } else {
        addSectionElement.append(node);
      }

      if (component.afterDrop) {
        node = component.afterDrop(node);
      }

      self.selectNode(node);
      self.loadNodeComponent(node);
      Vvveb.TreeList.loadComponents();
      Vvveb.TreeList.selectComponent(node);

      Vvveb.Undo.addMutation({
        type: "childList",
        target: node.parentNode,
        addedNodes: [node],
        nextSibling: node.nextSibling,
      });
    }

    addSectionBox.addEventListener("click", function (event) {
      let element = event.target.closest(".components-list li ol li");
      if (element) {
        let html = Vvveb.Components.get(element.dataset.type);

        addSectionComponent(
          html,
          true
          // document.querySelector(
          //     "[name='add-section-insert-mode']:checked"
          // ).value == "after"
        );

        addSectionBox.style.display = "none";
      }
    });

    addSectionBox.addEventListener("click", function (event) {
      let element = event.target.closest(".blocks-list li ol li");
      if (element) {
        let html = Vvveb.Blocks.get(element.dataset.type);
        addSectionComponent(
          html,
          true
          // document.querySelector(
          //     "[name='add-section-insert-mode']:checked"
          // ).value == "after"
        );

        addSectionBox.style.display = "none";
      }
    });

    addSectionBox.addEventListener("click", function (event) {
      let element = event.target.closest(".sections-list li ol li");
      if (element) {
        let html = Vvveb.Sections.get(element.dataset.type);

        addSectionComponent(
          html,
          true
          // document.querySelector(
          //     "[name='add-section-insert-mode']:checked"
          // ).value == "after"
        );

        addSectionBox.style.display = "none";
      }
    });
  },

  /* drag and drop */
  _initDragdrop: function () {
    let self = this;
    self.isDragging = false;

    document.addEventListener("mousedown", function (event) {
      let element = event.target.closest(
        ".drag-elements-sidepane ul > li > ol > li[data-drag-type]"
      );
      let html;

      if (element && event.button === 0) {
        //left click
        document.getElementById("component-clone")?.remove();
        document
          .querySelectorAll("#section-actions, #highlight-name, #select-box")
          .forEach((e) => (e.style.display = "none"));

        self.dragType = element.dataset.dragType;
        if (self.dragType == "component") {
          self.component = Vvveb.Components.get(element.dataset.type);
        } else if (self.dragType == "section") {
          self.component = Vvveb.Sections.get(element.dataset.type);
        } else if (self.dragType == "block") {
          self.component = Vvveb.Blocks.get(element.dataset.type);
        }

        if (self.component.dragHtml) {
          html = self.component.dragHtml;
        } else if (Vvveb.dragHtml) {
          html = Vvveb.dragHtml;
        } else {
          html = self.component.html;
        }

        self.dragElement = generateElements(html)[0];
        //self.dragElement.css("border", "1px dashed #4285f4");

        if (self.component.dragStart)
          self.dragElement = self.component.dragStart(self.dragElement);

        self.isDragging = true;
        if (Vvveb.dragIcon == "html") {
          self.iconDrag = generateElements(html)[0];
          self.iconDrag.setAttribute("id", "dragElement-clone");
          self.iconDrag.style.position = "absolute";
        } else if (self.designerMode == false) {
          self.iconDrag = document.createElement("img");
          self.iconDrag.setAttribute("id", "dragElement-clone");
          self.iconDrag.setAttribute(
            "src",
            element.style.backgroundImage.replace(/^url\(['"](.+)['"]\)/, "$1")
          );

          self.iconDrag.style.zIndex = "100";
          self.iconDrag.style.position = "absolute";
          self.iconDrag.style.width = "64px";
          self.iconDrag.style.height = "64px";
          self.iconDrag.style.top = event.y + "px";
          self.iconDrag.style.left = event.x + "px";
        }

        document.body.append(self.iconDrag);

        event.preventDefault();
        return false;
      }
    });

    document.addEventListener("mouseup", function (event) {
      if (self.iconDrag && self.isDragging == true) {
        self.isDragging = false;
        document.getElementById("component-clone")?.remove();
        document
          .querySelectorAll("#section-actions, #highlight-name, #select-box")
          .forEach((el) => (el.style.display = ""));
        self.iconDrag.remove();
        if (self.dragElement) {
          self.dragElement.remove();
        }
      }
    });

    document.addEventListener("mousemove", function (event) {
      if (self.iconDrag && self.isDragging == true) {
        let x = event.clientX || event.clientX;
        let y = event.clientY || event.clientY;

        self.iconDrag.style.left = x - 60 + "px";
        self.iconDrag.style.top = y - 30 + "px";

        const elementMouseIsOver = document.elementFromPoint(x - 60, y - 40);

        //if drag elements hovers over iframe switch to iframe mouseover handler
        // return;
        if (elementMouseIsOver && elementMouseIsOver.tagName == "IFRAME") {
          self.frameBody.dispatchEvent(
            new MouseEvent("mousemove", {
              bubbles: true,
              cancelable: true,
            })
          );

          //self.frameBody.trigger("mousemove", event);
          event.stopPropagation();
          self.selectNode(false);
        }
      }
    });

    document.addEventListener("mouseup", function (event) {
      let element = event.target.closest(
        ".drag-elements-sidepane ul > ol > li > li"
      );
      if (element) {
        self.isDragging = false;
        document.getElementById("component-clone")?.remove();
        document
          .querySelectorAll("#section-actions, #highlight-name, #select-box")
          .forEach((el) => (el.style.display = ""));
      }
    });
  },

  removeHelpers: function (html, keepHelperAttributes = false) {
    //tags like stylesheets or scripts
    html = html.replace(/<[^>]+?data-vvveb-helpers.+?>/gi, "");
    //attributes
    if (!keepHelperAttributes) {
      html = html.replace(/\s*data-vvveb-\w+(=["'].*?["'])?\s*/gi, "");
    }

    html = html.replaceAll("vvveb-hidden", "");
    return html;
  },

  cleanupAddLinkHelpersDom: function (doc) {
    try {
      if (!doc) return;

      // remove our helper <li> elements
      doc
        .querySelectorAll("li.vvveb-add-link-helper")
        .forEach((li) => li.remove());

      // just in case any stray buttons were saved without li in old templates
      doc.querySelectorAll("button.vvveb-add-link-btn").forEach((btn) => {
        const li = btn.closest("li");
        if (li && li.parentElement) {
          li.remove();
        } else {
          btn.remove();
        }
      });

      // Also cleanup add-btn helpers
      doc
        .querySelectorAll(".vvveb-add-btn[data-vvveb-context='buttons']")
        .forEach((btn) => {
          btn.remove();
        });
      // Inside cleanupAddLinkHelpersDom function
      doc
        .querySelectorAll(".add-card-btn[data-vvveb-helpers]")
        .forEach((btn) => btn.remove());
      doc
        .querySelectorAll(".vvveb-add-slide-btn")
        .forEach((btn) => btn.remove());
    } catch (e) {
      console.error("cleanupAddLinkHelpersDom error", e);
    }
  },

  // cleanupAddLinkHelpersDom: function (doc) {
  //   try {
  //     if (!doc) return;

  //     // remove our helper <li> elements
  //     doc
  //       .querySelectorAll("li.vvveb-add-link-helper")
  //       .forEach((li) => li.remove());

  //     // just in case any stray buttons were saved without li in old templates
  //     doc
  //       .querySelectorAll("button.vvveb-add-link-btn")
  //       .forEach((btn) => {
  //         const li = btn.closest("li");
  //         if (
  //           li &&
  //           li.parentElement &&
  //           li.parentElement.matches("ul.navbar-nav, ul.nav, nav ul")
  //         ) {
  //           li.remove();
  //         } else {
  //           btn.remove();
  //         }
  //       });
  //   } catch (e) {
  //     console.error("cleanupAddLinkHelpersDom error", e);
  //   }
  // },

  // getHtml: function (keepHelperAttributes = true) {
  //      // 🔹 remove runtime-only Add link helpers first
  // if (this.cleanupAddLinkHelpersDom) {
  //   this.cleanupAddLinkHelpersDom();
  // }
  //   let doc = window.FrameDocument;
  //   let hasDoctpe = doc.doctype !== null;
  //   let html = "";

  //   doc
  //     .querySelectorAll("[contenteditable]")
  //     .forEach((e) => e.removeAttribute("contenteditable"));
  //   doc
  //     .querySelectorAll("[spellcheckker]")
  //     .forEach((e) => e.removeAttribute("spellcheckker"));
  //   doc
  //     .querySelectorAll('script[src^="chrome-extension://"]')
  //     .forEach((e) => e.remove());
  //   doc
  //     .querySelectorAll('script[src^="moz-extension://"]')
  //     .forEach((e) => e.remove());

  //   // scroll page to top to avoid saving the page in a different state
  //   // like saving with sticky classes set for navbar etc
  //   // this.iframe.contentWindow.scrollTo(0,0);

  //   window.dispatchEvent(
  //     new CustomEvent("vvveb.getHtml.before", { detail: doc })
  //   );

  //   if (hasDoctpe)
  //     html =
  //       "<!DOCTYPE " +
  //       doc.doctype.name +
  //       (doc.doctype.publicId ? ' PUBLIC "' + doc.doctype.publicId + '"' : "") +
  //       (!doc.doctype.publicId && doc.doctype.systemId ? " SYSTEM" : "") +
  //       (doc.doctype.systemId ? ' "' + doc.doctype.systemId + '"' : "") +
  //       ">\n";

  //   Vvveb.FontsManager.cleanUnusedFonts();

  //   html += doc.documentElement.outerHTML;
  //   html = this.removeHelpers(html, keepHelperAttributes);

  //   window.dispatchEvent(
  //     new CustomEvent("vvveb.getHtml.after", { detail: doc })
  //   );
  //   window.dispatchEvent(
  //     new CustomEvent("vvveb.getHtml.filter", { detail: html })
  //   );

  //   return html;
  // },

  getHtml: function (keepHelperAttributes = true) {
    const liveDoc = window.FrameDocument;
    if (!liveDoc) return "";

    const hasDoctype = liveDoc.doctype !== null;
    let html = "";

    // 🔹 Work on a cloned document so we don't mutate the live canvas
    const doc = liveDoc.cloneNode(true);

    // 🔹 remove runtime-only Add link helpers from the clone only
    if (this.cleanupAddLinkHelpersDom) {
      this.cleanupAddLinkHelpersDom(doc);
    }

    // strip editing-only attributes from the clone
    doc
      .querySelectorAll("[contenteditable]")
      .forEach((e) => e.removeAttribute("contenteditable"));
    doc
      .querySelectorAll("[spellcheckker]")
      .forEach((e) => e.removeAttribute("spellcheckker"));
    doc
      .querySelectorAll('script[src^="chrome-extension://"]')
      .forEach((e) => e.remove());
    doc
      .querySelectorAll('script[src^="moz-extension://"]')
      .forEach((e) => e.remove());

    // optional hook – now passes the cloned doc
    window.dispatchEvent(
      new CustomEvent("vvveb.getHtml.before", { detail: doc })
    );

    if (hasDoctype)
      html =
        "<!DOCTYPE " +
        liveDoc.doctype.name +
        (liveDoc.doctype.publicId
          ? ' PUBLIC "' + liveDoc.doctype.publicId + '"'
          : "") +
        (!liveDoc.doctype.publicId && liveDoc.doctype.systemId
          ? " SYSTEM"
          : "") +
        (liveDoc.doctype.systemId
          ? ' "' + liveDoc.doctype.systemId + '"'
          : "") +
        ">\n";

    Vvveb.FontsManager.cleanUnusedFonts();

    // serialize the cloned document (without helpers)
    html += doc.documentElement.outerHTML;
    html = this.removeHelpers(html, keepHelperAttributes);

    window.dispatchEvent(
      new CustomEvent("vvveb.getHtml.after", { detail: doc })
    );
    window.dispatchEvent(
      new CustomEvent("vvveb.getHtml.filter", { detail: html })
    );

    return html;
  },

  setHtml: function (html) {
    //documentElement.innerHTML resets <head> each time and the page flickers
    //return window.FrameDocument.documentElement.innerHTML = html;

    function getTag(html, tag, outerHtml = false) {
      const start = html.indexOf("<" + tag);
      const end = html.indexOf("</" + tag);

      if (start >= 0 && end >= 0) {
        if (outerHtml) return html.slice(start, end + 3 + tag.length);
        else return html.slice(html.indexOf(">", start) + 1, end);
      } else {
        return html;
      }
    }

    // Added by jayanti
    // to restore html style for Global color and fonts

    if (this.runJsOnSetHtml) {
      this.frameBody.innerHTML = getTag(html, "body");
    } else {
      window.FrameDocument.body.innerHTML = getTag(html, "body");
    }

    //use outerHTML if you want to set body tag attributes
    //window.FrameDocument.body.outerHTML = getTag(html, "body", true);

    //set head html only if changed to avoid page flicker
    let headHtml = getTag(html, "head");
    if (window.FrameDocument.head.innerHTML != headHtml) {
      window.FrameDocument.head.innerHTML = headHtml;
    }
  },

  saveElement: function (element, type, name, callback) {
    if (type == "section") {
      Vvveb.Sections.add("reusable/" + name, {
        name,
        image: "img/logo-small.png",
        html: element.outerHTML,
      });

      if (Vvveb.SectionsGroup["Reusable"] === undefined) {
        Vvveb.SectionsGroup["Reusable"] = [];
      }

      Vvveb.SectionsGroup["Reusable"].push("reusable/" + name);
      Vvveb.Builder.loadSectionGroups();
    } else {
      Vvveb.Blocks.add("reusable/" + name, {
        name,
        image: "img/logo-small.png",
        html: element.outerHTML,
      });

      if (Vvveb.BlocksGroup["Reusable"] === undefined) {
        Vvveb.BlocksGroup["Reusable"] = [];
      }

      Vvveb.BlocksGroup["Reusable"].push("reusable/" + name);
      Vvveb.Builder.loadBlockGroups();
    }

    let data = { type, name, html: element.outerHTML };

    fetch(saveReusableUrl, {
      method: "POST",
      body: new URLSearchParams(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.text();
      })
      .then((data) => {
        if (callback) callback(data);
        let bg = "bg-success";
        if (true || data.success || text == "success") {
        } else {
          bg = "bg-danger";
        }

        displayToast(bg, "Save", data.message ?? data);
      })
      .catch((error) => {
        displayToast("bg-danger", "Error", "Error saving!");
      });
    /*
    return $.ajax({
      type: "POST",
      url: saveReusableUrl,//set your server side save script url
      data: data,
      cache: false,
    }).done(function (data, text) {
      if (callback) callback(data);
      let bg = "bg-success";
      if (data.success || text == "success") {		
      } else {
        bg = "bg-danger";
      }
    	
      displayToast(bg, "Save", data.message ?? data);			
    }).fail(function (data) {
      displayToast("bg-danger", "Error", "Error saving!");
      alert(data.responseText);
    });		
    */
  },

  saveAjax: function (data, saveUrl, callback, error) {
    if (!data["file"]) {
      data["file"] = Vvveb.FileManager.getCurrentFileName();
    }

    if (!data["startTemplateUrl"]) {
      data["html"] = this.getHtml();
    }

    //data['elements'] = new URLSearchParams(data['elements']);

    return fetch(saveUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: nestedFormData(data),
    })
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.text();
      })
      .then((data) => {
        if (callback) callback(data);
        Vvveb.Undo.reset();
        document
          .querySelectorAll("#top-panel .save-btn")
          .forEach((e) => e.setAttribute("disabled", "true"));
      })
      .catch((err) => {
        if (error) error(err);
        let message = error?.statusText ?? "Error saving!";
        displayToast("bg-danger", "Error", message);

        if (err.hasOwnProperty("text"))
          err.text().then((errorMessage) => {
            let message = errorMessage.substr(0, 200);
            displayToast("bg-danger", "Error", message);
          });
      });
  },

  setDesignerMode: function (designerMode = false) {
    this.designerMode = designerMode;
  },
};

Vvveb.ModalCodeEditor = {
  modal: false,
  editor: false,

  init: function (modal = false, editor = false) {
    if (modal) {
      this.modal = modal;
    } else {
      this.modal = document.getElementById("codeEditorModal");
    }
    if (editor) {
      this.editor = editor;
    } else {
      this.editor = this.modal.querySelector("textarea");
    }

    let self = this;

    this.modal
      .querySelector(".save-btn")
      .addEventListener("click", function (event) {
        window.dispatchEvent(
          new CustomEvent("vvveb.ModalCodeEditor.save", {
            detail: self.getValue(),
          })
        );
        self.hide();
        return false;
      });
  },

  show: function (value) {
    if (!this.modal) {
      this.init();
    }

    const bsModal = bootstrap.Modal.getOrCreateInstance(this.modal);
    return bsModal.show();
  },

  hide: function (value) {
    const bsModal = bootstrap.Modal.getOrCreateInstance(this.modal);
    return bsModal.hide();
  },

  getValue: function () {
    return this.editor.value;
  },

  setValue: function (value) {
    if (!this.modal) {
      this.init();
    }
    //enable save button
    document
      .querySelectorAll("#top-panel .save-btn")
      .forEach((e) => e.removeAttribute("disabled"));
    this.editor.value = value;
  },
};

Vvveb.CodeEditor = {
  isActive: false,
  oldValue: "",
  doc: false,
  textarea: false,

  init: function (doc) {
    this.textarea = document.querySelector("#vvveb-code-editor textarea");
    this.textarea.value = Vvveb.Builder.getHtml();

    this.textarea.addEventListener("keyup", (e) => {
      delay(() => Vvveb.Builder.setHtml(this.value), 1000);
    });

    //load code on document changes
    Vvveb.Builder.frameBody.addEventListener("vvveb.undo.add", () =>
      Vvveb.CodeEditor.setValue()
    );
    Vvveb.Builder.frameBody.addEventListener("vvveb.undo.restore", () =>
      Vvveb.CodeEditor.setValue()
    );

    //load code when a new url is loaded
    Vvveb.Builder.documentFrame.addEventListener("load", () =>
      Vvveb.CodeEditor.setValue()
    );

    this.isActive = true;
  },

  setValue: function (value) {
    if (this.isActive) {
      this.textarea.value = Vvveb.Builder.getHtml();
    }
  },

  destroy: function (element) {
    //this.isActive = false;
  },

  toggle: function () {
    if (this.isActive != true) {
      this.isActive = true;
      return this.init();
    }
    this.isActive = false;
    this.destroy();
  },
};

Vvveb.CssEditor = {
  isActive: false,
  oldValue: "",
  doc: false,
  textarea: false,

  init: function (doc) {
    this.textarea = document.getElementById("css-editor");
    this.textarea.value = Vvveb.StyleManager.getCss();
    let self = this;

    document
      .querySelectorAll('[href="#css-tab"],[href="#configuration"]')
      .forEach((t) =>
        t.addEventListener("click", (e) => {
          self.textarea.value = Vvveb.StyleManager.getCss();
        })
      );

    this.textarea.addEventListener("keyup", (e) => {
      delay(() => Vvveb.StyleManager.setCss(self.textarea.value), 1000);
    });
  },

  getValue: function () {
    return this.textarea.value;
  },

  setValue: function (value) {
    this.textarea.value = value;
    Vvveb.StyleManager.setCss(value);
  },

  destroy: function () { },
};

function isLinkList(ul) {
  if (!ul) return false;

  // 1. Classic navbar / nav
  if (ul.matches("ul.navbar-nav, ul.nav, nav ul")) return true;

  // 2. Anything inside header / footer / obvious footer containers
  if (ul.closest("footer, header, nav, .footer, .site-footer, .footer-links")) {
    return true;
  }

  // 3. Any <ul> whose <li> children contain links or icons = “link list”
  const children = Array.from(ul.children || []);
  const hasLinkItem = children.some((li) => {
    if (!li || li.hasAttribute("data-vvveb-helpers")) return false;

    return !!li.querySelector("a,button,img,svg,i");
  });

  return hasLinkItem;
}

function addSliderHelpers(frameDoc) {
  if (!frameDoc) return;

  // Find all Swiper wrappers
  const swiperWrappers = frameDoc.querySelectorAll(".swiper-wrapper");

  swiperWrappers.forEach((wrapper) => {
    // Avoid adding multiple helpers
    if (wrapper.querySelector(".vvveb-add-slide-helper")) return;

    // Create the helper slide
    // We wrap it in a div that won't be treated as a slide by Swiper if possible,
    // or we place it after the wrapper if the structure allows.
    const helperBtn = frameDoc.createElement("div");
    helperBtn.className = "vvveb-add-slide-helper";
    helperBtn.setAttribute("data-vvveb-helpers", "true");
    helperBtn.setAttribute("contenteditable", "false");
    helperBtn.setAttribute("draggable", "false");
    helperBtn.style.textAlign = "left";

    helperBtn.innerHTML = `
      <button type="button" class="vvveb-add-slide-btn vvv-enhanced-btn" data-vvveb-helpers="true">
        <span class="vvveb-add-btn-plus">+</span>
        <span class="vvveb-add-btn-text">Add Slide</span>
      </button>
    `;

    // Append it to the swiper container (parent of wrapper) so it doesn't break the slide flow
    const swiperContainer = wrapper.closest(".swiper");
    if (swiperContainer) {
      swiperContainer.appendChild(helperBtn);
    }
  });
}

function removeSliderHelpers(frameDoc) {
  if (!frameDoc) return;
  frameDoc
    .querySelectorAll(".vvveb-add-slide-helper")
    .forEach((el) => el.remove());
}

function updateAddSlideBtnState(swiperContainer) {
  if (!swiperContainer) return;

  const addBtn = swiperContainer.querySelector(".vvveb-add-slide-btn");
  if (!addBtn) return;

  const wrapper = swiperContainer.querySelector(".swiper-wrapper");
  const slides = Array.from(wrapper.children).filter(
    (el) =>
      el.classList.contains("swiper-slide") &&
      !el.hasAttribute("data-vvveb-helpers")
  );

  // Disable if 10 or more, enable if less than 10
  if (slides.length >= 10) {
    addBtn.disabled = true;
    addBtn.style.opacity = "0.5";
    addBtn.style.cursor = "not-allowed";
    addBtn.title = "Maximum 10 slides allowed";
  } else {
    addBtn.disabled = false;
    addBtn.style.opacity = "1";
    addBtn.style.cursor = "pointer";
    addBtn.title = "Add Slide";
  }
  document.getElementById("select-box").style.display = "none";
}

function addClonableCardHelpers(frameDoc) {
  if (!frameDoc) return;

  // Find all elements that contain at least one clonable card
  const cardContainers = new Set();
  frameDoc.querySelectorAll(".clonable-card").forEach((card) => {
    const parent = card.parentElement;
    if (parent) cardContainers.add(parent);
  });

  cardContainers.forEach((container) => {
    // Avoid duplicate buttons
    if (container.querySelector(".add-card-btn[data-vvveb-helpers]")) return;

    const btn = frameDoc.createElement("button");
    btn.type = "button";
    btn.className = "add-card-btn vvv-enhanced-btn";
    btn.setAttribute("data-vvveb-helpers", "true");
    btn.setAttribute("contenteditable", "false");

    // Using the same style classes found in your builder.js
    btn.innerHTML = `
      <span class="vvveb-add-btn-plus">+</span>
      <span class="vvveb-add-btn-text">Add Card</span>
    `;

    // Append to the end of the container
    container.appendChild(btn);
  });
}

function addNavbarAddLinkHelpers(frameDoc) {
  if (!frameDoc) return;
  try {
    if (typeof Vvveb !== 'undefined' && Vvveb.Builder && Vvveb.Builder.isPreview) {
      return;
    }
  } catch (e) { }

  try {
    if (!frameDoc.getElementById("vvv-enhanced-btn-style")) {
      const styleEl = frameDoc.createElement("style");
      styleEl.id = "vvv-enhanced-btn-style";
      styleEl.innerHTML = `
        .vvveb-add-link-btn.vvv-enhanced-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 10px;height: fit-content;border:1px dashed #5b3df2;border-radius:10px;background:linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(245, 250, 254) 100%) 0% 0% no-repeat border-box border-box;color:#595c5f;font-weight:600;font-size:13px;line-height:1;cursor:pointer;transition:background .16s ease,border-color .16s ease,transform .08s ease,box-shadow .16s ease}
        .vvveb-add-link-btn.vvv-enhanced-btn .btn-icon{display:inline-flex;align-items:center;justify-content:center;height:18px;border-radius:6px;background:rgba(38,93,115,0.04);color:#595c5f;font-size:13px}
        /* .vvveb-add-link-btn.vvv-enhanced-btn:hover{border-color:rgba(38,93,115,0.6);transform:translateY(-1px);background:rgba(246,251,255,0.6);box-shadow:0 6px 18px rgba(16,40,56,0.05)} */
        .vvveb-add-link-btn.vvv-enhanced-btn:active{transform:translateY(0);box-shadow:0 3px 8px rgba(16,40,56,0.04)}
        .vvveb-add-link-btn.vvv-enhanced-btn:focus{outline:none;box-shadow:0 0 0 4px rgba(38,93,115,0.08)}
        .vvveb-add-btn.vvv-enhanced-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 10px;height: fit-content;border:1px dashed #5b3df2;border-radius:10px;background:linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(245, 250, 254) 100%) 0% 0% no-repeat border-box border-box;color:#595c5f;font-weight:600;font-size:13px;line-height:1;cursor:pointer;transition:background .16s ease,border-color .16s ease,transform .08s ease,box-shadow .16s ease}
        .vvveb-add-btn.vvv-enhanced-btn .btn-icon{display:inline-flex;align-items:center;justify-content:center;height:18px;border-radius:6px;background:rgba(38,93,115,0.04);color:#595c5f;font-size:13px}
        .vvveb-add-btn.vvv-enhanced-btn:active{transform:translateY(0);box-shadow:0 3px 8px rgba(16,40,56,0.04)}
        .vvveb-add-btn.vvv-enhanced-btn:focus{outline:none;box-shadow:0 0 0 4px rgba(38,93,115,0.08)}
        .vvveb-add-btn.vvv-enhanced-btn:disabled{opacity:0.5;cursor:not-allowed;border-color:#ccc}
        .vvveb-add-slide-btn.vvv-enhanced-btn,.add-card-btn.vvv-enhanced-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    padding: 12px;
    border: 1px dashed #5b3df2;
    border-radius: 10px;
    background: linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 0%, rgb(245, 250, 254) 100%);
    color: #595c5f;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    margin: 10px;
    /* Ensure it stays on top of slider layers */
    position: relative;
    z-index: 10;
  }
    .vvveb-add-slide-btn.vvv-enhanced-btn:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
      .add-card-btn.vvv-enhanced-btn {
    margin-block: auto;
    margin-left: 20px;
    height: fit-content;
    width: fit-content;
    padding: 30px;
}
        /* editor-only: stabilize the helper <li> inside Bootstrap navbar-nav */
        li.vvveb-add-link-helper {
          display: inline-flex !important;
          align-items: center !important;
          padding: 0 !important;
          margin: 0 !important;
          flex: 0 0 auto !important;
          height: auto !important;
          width: auto !important;
        }
        /* editor-only: hide helper in expanded mobile collapse menu */
        .navbar-collapse.show li.vvveb-add-link-helper { display: none !important; }
      `;
      (frameDoc.head || frameDoc.documentElement).appendChild(styleEl);
    }
  } catch (e) {
    // ignore – some documents may be cross-origin or not allow injection
  }

  // 🔹 First, clean existing empty li items
  cleanupEmptyNavItems(frameDoc);

  // 👇 Now consider ALL <ul>, but filter with isLinkList()
  const navLists = frameDoc.querySelectorAll("ul");

  navLists.forEach((ul) => {
    if (!isLinkList(ul)) return;

    // avoid adding multiple helpers into same list
    if (ul.querySelector("li.vvveb-add-link-helper")) return;
    if (ul.querySelector("[data-vvveb-add-link-helper]")) return;

    const li = frameDoc.createElement("li");
    li.className = "nav-item vvveb-add-link-helper";
    li.setAttribute("data-vvveb-helpers", "true");
    li.setAttribute("data-vvveb-add-link-helper", "true");
    // make helper non-editable and not draggable to reduce accidental deletion
    li.setAttribute("contenteditable", "false");
    li.setAttribute("draggable", "false");
    li.tabIndex = -1;

    li.innerHTML = `
      <button type="button" class="vvveb-add-link-btn vvv-enhanced-btn" data-vvveb-helpers="true" contenteditable="false" draggable="false" tabindex="-1">
        <span class="vvveb-add-link-plus">+</span>
        <span class="vvveb-add-link-text">Add link</span>
      </button>
    `;

    ul.appendChild(li);
  });
  // Detect icon groups using ONLY direct-child <i> elements.
  // This avoids matching anchors that use <svg> or <img> (e.g., brand logos).
  const iconGroups = new Set();

  const parentStats = new Map();
  frameDoc.querySelectorAll("a").forEach((a) => {
    const parent = a.parentElement;
    if (!parent) return;

    let stats = parentStats.get(parent);
    if (!stats) {
      stats = { total: 0, icons: 0 };
      parentStats.set(parent, stats);
    }

    stats.total++;
    // only count if anchor has a direct child <i>
    try {
      if (a.querySelector && a.querySelector(":scope > i")) stats.icons++;
    } catch (e) {
      // some older browsers may not support :scope in querySelector; fallback
      if (Array.from(a.children).some((ch) => ch.tagName === "I"))
        stats.icons++;
    }
  });

  parentStats.forEach((stats, parent) => {
    // require at least 2 anchors and at least 2 icon anchors to qualify
    if (stats.total >= 2 && stats.icons >= 2) iconGroups.add(parent);
  });

  // For each detected icon group, append a helper button
  iconGroups.forEach((container) => {
    // Don’t duplicate helpers if already present
    if (
      container.querySelector(".vvveb-add-link-btn[data-vvveb-context='icons']")
    ) {
      return;
    }

    const btn = frameDoc.createElement("button");
    btn.type = "button";
    btn.className = "vvveb-add-link-btn vvv-enhanced-btn vvveb-icon-add-button";
    btn.setAttribute("data-vvveb-helpers", "true");
    btn.setAttribute("data-vvveb-context", "icons"); // just for us
    btn.innerHTML = `
      <span class="vvveb-add-link-plus">+</span>
      <span class="vvveb-add-link-text">Add Icon</span>
    `;

    container.appendChild(btn);
  });

  // ensure frameDoc knows helpers are allowed (used by protector guard)
  try {
    if (frameDoc.documentElement)
      frameDoc.documentElement.setAttribute(
        "data-vvveb-helpers-allowed",
        "true"
      );
  } catch (e) { }

  // Install a protector observer that will re-run helper injection if helpers are removed unexpectedly.
  try {
    if (frameDoc.body && !_vvvHelperProtectors.has(frameDoc)) {
      const protector = new MutationObserver((mutations) => {
        // only act when helpers are allowed (prevents race when intentionally removing helpers)
        try {
          if (
            frameDoc.documentElement.getAttribute(
              "data-vvveb-helpers-allowed"
            ) === "false"
          )
            return;
        } catch (e) { }

        // Do not re-inject helpers while in preview mode
        try {
          if (typeof Vvveb !== 'undefined' && Vvveb.Builder && Vvveb.Builder.isPreview) return;
        } catch (e) { }

        // if any removed node had the helpers attribute, debounce a re-add
        for (const m of mutations) {
          if (m.removedNodes && m.removedNodes.length) {
            for (const n of m.removedNodes) {
              try {
                if (
                  n &&
                  n.getAttribute &&
                  n.getAttribute("data-vvveb-helpers") === "true"
                ) {
                  delay(() => {
                    try {
                      addNavbarAddLinkHelpers(frameDoc);
                    } catch (e) { }
                    try {
                      addButtonHelpers(frameDoc);
                    } catch (e) { }
                  }, 80);
                  return;
                }
              } catch (e) { }
            }
          }
        }
      });

      protector.observe(frameDoc.body, {
        childList: true,
        subtree: true,
      });
      _vvvHelperProtectors.add(frameDoc);
    }
  } catch (e) { }

  addSliderHelpers(frameDoc);
}

// function addNavbarAddLinkHelpers(frameDoc) {
//   if (!frameDoc) return;

//   // 🔹 First, clean existing empty li items
//   cleanupEmptyNavItems(frameDoc);

//   const navLists = frameDoc.querySelectorAll(
//     "ul.navbar-nav, ul.nav, nav ul"
//   );

//   navLists.forEach((ul) => {
//     if (ul.querySelector("[data-vvveb-add-link-helper]")) return;

//    const li = frameDoc.createElement("li");
// li.className = "nav-item vvveb-add-link-helper";
// li.setAttribute("data-vvveb-helpers", "true");

// li.innerHTML = `
//   <button type="button" class="vvveb-add-link-btn">
//     <span class="vvveb-add-link-plus">+</span>
//     <span class="vvveb-add-link-text">Add link</span>
//   </button>
// `;

//     ul.appendChild(li);
//   });
// }

function removeNavbarAddLinkHelpers(frameDoc) {
  if (!frameDoc) return;

  try {
    if (frameDoc.documentElement)
      frameDoc.documentElement.setAttribute(
        "data-vvveb-helpers-allowed",
        "false"
      );
  } catch (e) { }

  frameDoc
    .querySelectorAll("li.vvveb-add-link-helper")
    .forEach((li) => li.remove());

  // Also remove standalone icon helper buttons
  frameDoc
    .querySelectorAll(
      'button.vvveb-add-link-btn[data-vvveb-context="icons"][data-vvveb-helpers="true"]'
    )
    .forEach((btn) => btn.remove());

  // re-allow helpers shortly after intentional removal (protector will ignore during the window)
  try {
    setTimeout(() => {
      try {
        if (frameDoc.documentElement)
          frameDoc.documentElement.setAttribute(
            "data-vvveb-helpers-allowed",
            "true"
          );
      } catch (e) { }
    }, 60);
  } catch (e) { }
}

// =====================================================
// ADD-BTN FUNCTIONALITY - Clone buttons with max 2 limit
// =====================================================

function addButtonHelpers(frameDoc) {
  if (!frameDoc) return;
  try {
    if (typeof Vvveb !== 'undefined' && Vvveb.Builder && Vvveb.Builder.isPreview) {
      return;
    }
  } catch (e) { }

  // Collect containers that have at least 1 direct child with [data-btn]
  const buttonGroups = new Set();

  frameDoc.querySelectorAll("[data-btn]").forEach((el) => {
    // ignore helpers (just in case)
    if (el.hasAttribute("data-vvveb-helpers")) return;

    const parent = el.parentElement;
    if (!parent) return;

    // Only consider this parent if it has 1+ direct children with [data-btn]
    const directBtnElements = Array.from(parent.children).filter((child) => {
      if (child.hasAttribute("data-vvveb-helpers")) return false;
      if (child.classList.contains("vvveb-add-btn")) return false;
      if (child.classList.contains("vvveb-add-link-btn")) return false;

      return child.hasAttribute("data-btn");
    });

    if (directBtnElements.length < 1) return;

    buttonGroups.add(parent);
  });

  // Append helper to each group
  buttonGroups.forEach((container) => {
    if (container.querySelector(".vvveb-add-btn[data-vvveb-context='buttons']"))
      return;

    const helperBtn = frameDoc.createElement("button");
    helperBtn.type = "button";
    helperBtn.className = "vvveb-add-btn vvv-enhanced-btn";
    helperBtn.setAttribute("data-vvveb-helpers", "true");
    helperBtn.setAttribute("data-vvveb-context", "buttons");
    helperBtn.setAttribute("contenteditable", "false");
    helperBtn.setAttribute("draggable", "false");
    helperBtn.tabIndex = -1;
    helperBtn.innerHTML = `
      <span class="vvveb-add-btn-plus">+</span>
      <span class="vvveb-add-btn-text">Add Button</span>
    `;

    // Count already cloned [data-btn] elements and disable at limit
    const existingBtnElements = Array.from(container.children).filter(
      (child) => {
        if (child.hasAttribute("data-vvveb-helpers")) return false;
        if (child.classList.contains("vvveb-add-btn")) return false;
        if (child.classList.contains("vvveb-add-link-btn")) return false;

        return child.hasAttribute("data-btn");
      }
    );

    const clonedCount = existingBtnElements.filter((b) =>
      b.hasAttribute("data-vvveb-cloned-btn")
    ).length;

    if (clonedCount >= 2) helperBtn.disabled = true;

    container.appendChild(helperBtn);
    watchAddBtnContainer(container);
    updateAddBtnState(container);
  });

  // mark document as allowing helpers
  try {
    if (frameDoc.documentElement)
      frameDoc.documentElement.setAttribute(
        "data-vvveb-helpers-allowed",
        "true"
      );
  } catch (e) { }
  // ensure protector exists for this document as well (in case addNavbarAddLinkHelpers wasn't called)
  try {
    if (frameDoc.body && !_vvvHelperProtectors.has(frameDoc)) {
      const protector = new MutationObserver((mutations) => {
        try {
          if (
            frameDoc.documentElement.getAttribute(
              "data-vvveb-helpers-allowed"
            ) === "false"
          )
            return;
        } catch (e) { }
        for (const m of mutations) {
          if (m.removedNodes && m.removedNodes.length) {
            for (const n of m.removedNodes) {
              try {
                if (
                  n &&
                  n.getAttribute &&
                  n.getAttribute("data-vvveb-helpers") === "true"
                ) {
                  delay(() => {
                    try {
                      addNavbarAddLinkHelpers(frameDoc);
                    } catch (e) { }
                    try {
                      addButtonHelpers(frameDoc);
                    } catch (e) { }
                  }, 80);
                  return;
                }
              } catch (e) { }
            }
          }
        }
      });

      protector.observe(frameDoc.body, {
        childList: true,
        subtree: true,
      });
      _vvvHelperProtectors.add(frameDoc);
    }
  } catch (e) { }
}

const _vvvBtnObservers = new WeakMap();

// track frame documents where we installed a protector observer
const _vvvHelperProtectors = new WeakSet();

function watchAddBtnContainer(container) {
  if (!container) return;
  if (_vvvBtnObservers.has(container)) return;

  const obs = new MutationObserver(() => {
    // whenever children change: re-check limit and enable/disable
    updateAddBtnState(container);
  });

  obs.observe(container, { childList: true });

  _vvvBtnObservers.set(container, obs);

  // run once immediately
  updateAddBtnState(container);
}

function removeButtonHelpers(frameDoc) {
  if (!frameDoc) return;

  try {
    if (frameDoc.documentElement)
      frameDoc.documentElement.setAttribute(
        "data-vvveb-helpers-allowed",
        "false"
      );
  } catch (e) { }

  frameDoc
    .querySelectorAll(".vvveb-add-btn[data-vvveb-context='buttons']")
    .forEach((btn) => btn.remove());

  try {
    setTimeout(() => {
      try {
        if (frameDoc.documentElement)
          frameDoc.documentElement.setAttribute(
            "data-vvveb-helpers-allowed",
            "true"
          );
      } catch (e) { }
    }, 60);
  } catch (e) { }
}

function updateAddBtnState(container) {
  if (!container) return;

  const helper = container.querySelector(
    ".vvveb-add-btn[data-vvveb-context='buttons']"
  );
  if (!helper) return;

  const realBtnElements = Array.from(container.children).filter((child) => {
    if (child.hasAttribute("data-vvveb-helpers")) return false;
    if (child.classList.contains("vvveb-add-btn")) return false;
    if (child.classList.contains("vvveb-add-link-btn")) return false;
    return child.hasAttribute("data-btn");
  });

  // Disable helper when total number of buttons (originals + clones)
  // reaches the configured limit (2)
  const totalCount = realBtnElements.length;

  helper.disabled = totalCount >= 2;
}

function getBtnSeparator(container) {
  if (!container) return " ";

  // Find whitespace text node between first two [data-btn] elements
  const nodes = Array.from(container.childNodes);

  for (let i = 0; i < nodes.length - 2; i++) {
    const a = nodes[i];
    const mid = nodes[i + 1];
    const b = nodes[i + 2];

    if (
      a.nodeType === 1 &&
      a.hasAttribute?.("data-btn") &&
      b.nodeType === 1 &&
      b.hasAttribute?.("data-btn") &&
      mid.nodeType === 3 &&
      /\s+/.test(mid.nodeValue || "")
    ) {
      return mid.nodeValue; // reuse exact spacing from template
    }
  }

  return " "; // fallback
}

function cleanupEmptyNavItems(frameDoc) {
  if (!frameDoc) return;

  const navLists = frameDoc.querySelectorAll("ul");

  navLists.forEach((ul) => {
    if (!isLinkList(ul)) return;

    ul.querySelectorAll("li").forEach((li) => {
      // Skip our helper
      if (li.hasAttribute("data-vvveb-helpers")) return;

      const hasContent =
        li.textContent.trim() || li.querySelector("a,button,span,img,svg,i");

      if (!hasContent) {
        li.remove();
      }
    });
  });
}

// function cleanupEmptyNavItems(frameDoc) {
//   if (!frameDoc) return;

//   const navLists = frameDoc.querySelectorAll(
//     "ul.navbar-nav, ul.nav, nav ul"
//   );

//   navLists.forEach((ul) => {
//     ul.querySelectorAll("li").forEach((li) => {
//       // Skip our helper
//       if (li.hasAttribute("data-vvveb-helpers")) return;

//       const hasContent =
//         li.textContent.trim() ||
//         li.querySelector("a,button,span,img,svg,i");

//       if (!hasContent) {
//         li.remove();
//       }
//     });
//   });
// }

function displayToast(bg, title, message, id = "top-toast") {
  document.querySelector("#" + id + " .toast-body .message").innerHTML =
    message.replace(/(?:\r\n|\r|\n)/g, "<br>");
  let header = document.querySelector("#" + id + " .toast-header");
  header.classList.remove("bg-danger", "bg-success");
  header.classList.add(bg);
  header.querySelector("strong").innerHTML = title;
  document.querySelector("#" + id + " .toast").classList.add("show");
  delay(
    () => document.querySelector("#" + id + " .toast").classList.remove("show"),
    5000
  );
}

Vvveb.Gui = {
  init: function () {
    document.querySelectorAll("[data-vvveb-action]").forEach(function (el, i) {
      const on = el.dataset.vvvebOn ?? "click";
      el.addEventListener(on, Vvveb.Gui[el.dataset.vvvebAction]);
    });

    this.shortcuts();
  },

  shortcuts: function () {
    let self = this;

    handleShortcuts = function (e) {
      if (e.ctrlKey) {
        switch (e.key) {
          case "s":
            e.preventDefault();
            // let btn = document.querySelector(".save-btn");
            // let url = btn.dataset.vvvebUrl;
            // self.saveAjax(null, url, document.querySelector(".save-btn"));
            // const saveBTN = document.getElementById("save-btn");
            // if (Vvveb.Undo.mutations.length > 0) {
            //   saveBTN.click(); //// Amit has added this
            // } else {
            // }
            return;
          case "z":
            e.preventDefault();
            self.undo();
            return;
          case "Z":
          case "y":
            e.preventDefault();
            self.redo();
            return;
          case "L":
            e.preventDefault();
            self.toggleTreeList();
            return;
          // case "e":
          //   e.preventDefault();
          //   self.toggleEditor();
          //   return;
          case "P":
            e.preventDefault();
            self.newPage();
            return;
        }
      }
    };

    //handle shortcuts from main window and iframe also
    document.addEventListener("keydown", handleShortcuts);
    window.addEventListener("vvveb.iframe.loaded", () => {
      Vvveb.Builder.frameBody.addEventListener("keydown", handleShortcuts);
    });
  },

  // undo: function () {
  //   if (Vvveb.WysiwygEditor.isActive && Vvveb.WysiwygEditor.element) {
  //     try {
  //       Vvveb.WysiwygEditor.element.blur();
  //     } catch (e) {
  //       /* ignore blur error */
  //     }
  //   }

  //   if (Vvveb.WysiwygEditor.isActive) {
  //     Vvveb.WysiwygEditor.undo();
  //   } else {
  //     Vvveb.Undo.undo();
  //   }
  //   Vvveb.Builder.selectNode();
  // },

  // redo: function () {
  //   if (Vvveb.WysiwygEditor.isActive) {
  //     Vvveb.WysiwygEditor.redo();
  //   } else {
  //     Vvveb.Undo.redo();
  //   }
  //   Vvveb.Builder.selectNode();
  // },

  undo: function () {
    // If we are editing, destroy the editor first to commit final state
    if (Vvveb.WysiwygEditor.isActive) {
      Vvveb.WysiwygEditor.destroy();
    }

    // Now perform the standard undo
    Vvveb.Undo.undo();
    Vvveb.Builder.selectNode();
  },

  redo: function () {
    if (Vvveb.WysiwygEditor.isActive) {
      Vvveb.WysiwygEditor.destroy();
    }

    Vvveb.Undo.redo();
    Vvveb.Builder.selectNode();
  },

  //show modal with html content
  save: function () {
    document.getElementById("textarea-modal textarea").value =
      Vvveb.Builder.getHtml();
    document.getElementById("textarea-modal").modal();
  },

  //post html content through ajax to save to filesystem/db
  saveAjax: function (event, saveUrl = null, saveBtn = null) {
    let btn = saveBtn ?? this;
    saveUrl = saveUrl ?? this.dataset.vvvebUrl;
    let file = Vvveb.FileManager.getPageData("file");
    //if offcanvas check if user provided new template name
    if (btn.classList.contains("save-offcanvas")) {
      if (
        document.querySelector("#save-offcanvas [name=template]:checked")
          .value == "new"
      ) {
        file =
          document.querySelector("#save-offcanvas [name=folder]").value +
          "/" +
          document.querySelector("#save-offcanvas [name=file]").value;
      }
    }

    btn.querySelector(".loading").classList.remove("d-none");
    btn.querySelector(".button-text").classList.add("d-none");

    return Vvveb.Builder.saveAjax(
      { file },
      saveUrl,
      (data) => {
        //use toast to show save status

        let bg = "bg-success";
        if (true || data.success || data == "success") {
          document
            .querySelectorAll("#top-panel .save-btn")
            .forEach((e) => e.setAttribute("disabled", "true"));
        } else {
          bg = "bg-danger";
        }

        displayToast(bg, "Save", data.message ?? data);

        const offcanvas = document.getElementById("save-offcanvas");
        if (offcanvas) {
          let instance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (instance) instance.hide();
        }

        btn.querySelector(".loading").classList.add("d-none");
        btn.querySelector(".button-text").classList.remove("d-none");
      },
      (error) => {
        btn.querySelector(".loading").classList.add("d-none");
        btn.querySelector(".button-text").classList.remove("d-none");
        let message = error?.statusText ?? "Error saving!";
        displayToast("bg-danger", "Error", message);
      }
    );
  },

  download: function () {
    const filename = /[^\/]+$/.exec(Vvveb.Builder.iframe.src)[0];
    const uriContent =
      "data:application/octet-stream," +
      encodeURIComponent(Vvveb.Builder.getHtml());

    let link = document.createElement("a");
    if ("download" in link) {
      link.dataset.download = filename;
      link.href = uriContent;
      link.target = "_blank";

      document.body.appendChild(link);
      const result = link.click();
      document.body.removeChild(link);
      link.remove();
    } else {
      location.href = uriContent;
    }
  },

  viewport: function () {
    document.getElementById("canvas").setAttribute("class", this.dataset.view);
    document.getElementById("iframe1").removeAttribute("style");
    document
      .querySelectorAll(".responsive-btns .active")
      .forEach((e) => e.classList.remove("active"));
    if (this.dataset.view) this.classList.add("active");
  },

  toggleEditor: function () {
    document
      .getElementById("vvveb-builder")
      .classList.toggle("bottom-panel-expand");
    document.getElementById("toggleEditorJsExecute").classList.toggle("d-none");
    //hide breadcrumb when showing the editor
    document
      .querySelector(".breadcrumb-navigator .breadcrumb")
      .classList.toggle("d-none");
    Vvveb.CodeEditor.toggle();
  },

  toggleEditorJsExecute: function () {
    Vvveb.Builder.runJsOnSetHtml = this.checked;
  },

  preview: function () {
    Vvveb.Builder.isPreview = !Vvveb.Builder.isPreview;

    const isPreview = Vvveb.Builder.isPreview;
    const icon = document.querySelectorAll(".btn-preview-mode i");
    const iconButton = document.querySelectorAll(".btn-preview-mode");
    const undo_redo = document.querySelectorAll("#undo-btn, #redo-btn");

    icon.forEach(el => {
      el.classList.toggle("fa-eye", !isPreview);
      el.classList.toggle("fa-eye-slash", isPreview);
    })

    // iconButton.setAttribute("data-bs-original-title", isPreview ? "Preview off" : "Preview on");
    iconButton.forEach(el => {
      el.setAttribute("data-bs-original-title", isPreview ? "Preview off" : "Preview on");
    })

    undo_redo.forEach(el => {
      el.classList.toggle("preview-hidden", isPreview);
    })

    const standardButtons = ["topbar-menu-btn", "global-fab", "help-fab"];
    standardButtons.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle("preview-hidden", isPreview);
    });

    const responsiveBtnGroup = document.querySelectorAll(".screen-size-toggle-btn");
    responsiveBtnGroup.forEach(el => {
      el.classList.toggle("preview-show", isPreview);
    })

    document.querySelectorAll(".fullscreen-btn-toggle").forEach(el => {
      el.classList.toggle("preview-hidden", isPreview);
    });

    document.getElementById("iframe-layer").classList.toggle("d-none");
    document.getElementById("zp-navbar-pages").classList.toggle("d-none");
    document.getElementById("vvveb-builder").classList.toggle("preview");

    document.body.style.setProperty("--builder-bottom-panel-height", isPreview ? "0px" : "35px");

    const iframe = document.getElementById("iframe1");
    if (iframe) {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      if (isPreview) {
        // Use centralized cleanup if available, otherwise fallback
        if (typeof window._zpApplyPreviewCleanup === 'function') {
          window._zpApplyPreviewCleanup(iframeDoc);
        } else {
          iframeDoc.querySelectorAll("[contenteditable]").forEach(el => el.removeAttribute("contenteditable"));
          iframeDoc.querySelectorAll(".vvv-enhanced-btn, #global-fab, #global-help").forEach(el => {
            el.style.setProperty("display", "none", "important");
          });
        }
      } else {
        // Exiting preview — restore editor helpers
        if (typeof window._zpRestoreEditorHelpers === 'function') {
          window._zpRestoreEditorHelpers(iframeDoc);
        } else {
          iframeDoc.querySelectorAll(".vvv-enhanced-btn, #global-fab, #global-help").forEach(el => {
            el.style.setProperty("display", "inline-flex", "important");
          });
        }
      }
    }

    const isDesktop = window.innerWidth > 768;
    const bottomPanel = document.getElementById("bottom-panel");
    if (bottomPanel) {
      if (Vvveb.Builder.isPreview && isDesktop) {
        bottomPanel.classList.add("d-none");
        document.body.style.setProperty("--builder-bottom-panel-height", "0px");
      } else {
        bottomPanel.classList.remove("d-none");
        document.body.style.setProperty("--builder-bottom-panel-height", "35px");
      }
    }
  },

  fullscreen: function () {
    launchFullScreen(document); // the whole page
  },

  search: function () {
    let searchText = this.value;
    let panel = this.parentNode.parentNode.querySelector("div > ul");
    panel.querySelectorAll("li ol li").forEach(function (el, i) {
      el.style.display = "none";
      if (el.dataset.search.indexOf(searchText) > -1) el.style.display = "";
    });
  },

  clearSearch: function (e) {
    let input = this.parentNode.querySelector("input");
    input.value = "";
    input.dispatchEvent(
      new KeyboardEvent("keyup", {
        bubbles: true,
        cancelable: true,
      })
    );
  },

  expand: function (e) {
    this.parentNode.parentNode.parentNode
      .querySelectorAll('input.header_check[type="checkbox"]')
      .forEach((e) => (e.checked = true));
  },

  collapse: function (e) {
    this.parentNode.parentNode.parentNode
      .querySelectorAll('input.header_check[type="checkbox"]')
      .forEach((e) => (e.checked = false));
  },

  //Pages, file/components tree
  newPage: function () {
    let newPageModal = document.getElementById("new-page-modal");
    let form = newPageModal.querySelector("form");

    const bsModal = bootstrap.Modal.getOrCreateInstance(newPageModal);
    bsModal.show();

    let submitForm = function (e) {
      let data = {};
      this.querySelectorAll(
        "input[type=text],input[type=checkbox]:checked,input[type=radio]:checked,input[name=image], select:not(:disabled)"
      ).forEach((el, i) => {
        if (el.offsetParent || el.name == "image") data[el.name] = el.value;
      });

      if (data["file"]) {
        data["title"] = data["file"].replace("/", "").replace(".html", "");
        //let name = data['name'] = data['folder'].replace('/', '_') + "-" + data['title'];
        if (!data["name"]) {
          data["name"] = data["title"];
        }
        data["url"] = data["file"] = data["folder"] + "/" + data["file"];
        //data['url']  = Vvveb.themeBaseUrl + data['url'];
      }

      e.preventDefault();

      return Vvveb.Builder.saveAjax(data, this.action, function (savedData) {
        data.title = data.name;

        if (typeof savedData === "object" && savedData !== null) {
          data.name = savedData.name ?? data.name;
          data.url = savedData.url ?? data.url;
          data.file = savedData.file ?? data.file;
          data.title = savedData.title ?? data.title;
        }

        let page = Vvveb.FileManager.addPage(data.name, data);
        Vvveb.FileManager.loadPage(data.name);
        Vvveb.FileManager.scrollToPage(page);
        bsModal.hide();
      });
    };

    if (!form.dataset.init) {
      form.addEventListener("submit", submitForm);
      form.dataset.init = true;
    }
  },

  setDesignerMode: function () {
    //aria-pressed attribute is updated after action is called and we check for false instead of true
    let designerMode = this.attributes["aria-pressed"].value == "true";
    Vvveb.Builder.setDesignerMode(designerMode);
  },

  //layout
  togglePanel: function (panel, cssVar) {
    panel = document.querySelector(panel);
    let body = document.querySelector("body");
    let prevValue = getComputedStyle(body).getPropertyValue(cssVar);
    let visible = false;

    if (prevValue !== "0px") {
      panel.dataset.layoutToggle = prevValue;
      body.style.setProperty(cssVar, "0px");
      panel.style.display = "none";
      visible = false;
    } else {
      prevValue = panel.dataset.layoutToggle;
      body.style.setProperty(cssVar, "");
      panel.style.display = "";
      visible = true;
    }

    return visible;
  },

  toggleFileManager: function () {
    Vvveb.Gui.togglePanel("#filemanager", "--builder-filemanager-height");
  },

  toggleLeftColumn: function () {
    Vvveb.Gui.togglePanel("#left-panel", "--builder-left-panel-width");
  },

  toggleRightColumn: function (rightColumnEnabled = null) {
    rightColumnEnabled = Vvveb.Gui.togglePanel(
      "#right-panel",
      "--builder-right-panel-width"
    );

    document.getElementById("vvveb-builder").classList.toggle("no-right-panel");
    document
      .querySelector(".component-properties-tab")
      .classList.toggle("d-none");

    Vvveb.Components.componentPropertiesElement =
      (rightColumnEnabled ? "#right-panel" : "#left-panel #properties") +
      " .component-properties";
    let componentTab = document.querySelector("#components-tab");

    if (document.getElementById("properties").offsetParent) {
      const bsTab = bootstrap.Tab.getOrCreateInstance(componentTab);
      componentTab.style.display = "";
      bsTab.show();
    }
  },

  toggleTreeList: function () {
    let treeList = document.getElementById("tree-list");
    treeList.classList.toggle("d-none");
    if (!treeList.offsetParent) {
      document.getElementById("toggle-tree-list").classList.remove("active");
    }
  },

  darkMode: function () {
    let theme = document.documentElement.getAttribute("data-bs-theme");
    let icon = document.querySelector(".btn-dark-mode i");

    if (theme == "dark") {
      theme = "light";
      icon.classList.remove("la-moon");
      icon.classList.add("la-sun");
    } else if (theme == "light" || theme == "auto") {
      theme = "dark";
      icon.classList.remove("la-sun");
      icon.classList.add("la-moon");
    } else {
      theme = "auto";
    }

    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
    //document.cookie = 'theme=' + theme;
  },

  zoomChange: function () {
    let wrapper = document.getElementById("iframe-wrapper");
    let scale = "";
    let height = "";
    if (this.value != "100") {
      scale = "scale(" + this.value + "%)";
      height = (100 / this.value) * 100 + "%";
    }
    wrapper.style.transform = scale;
    wrapper.style.height = height;
  },

  setState: function () {
    Vvveb.StyleManager.setState(this.value);
    Vvveb.Builder.reloadComponent();
  },
};

Vvveb.StyleManager = {
  styles: {},
  cssContainer: false,
  //Custom Modification - Jayanti - 09-09-2025
  mobileWidth: "375px",
  //Custom Modification Ends Here - Jayanti - 09-09-2025

  tabletWidth: "767px",
  doc: false,
  inlineCSS: false,
  currentElement: null,
  currentSelector: null,
  state: "", //hover, active etc

  init: function (doc) {
    if (doc) {
      this.doc = doc;

      let style = false;
      let _style = false;

      //check if editor style is present
      for (let i = 0; i < doc.styleSheets.length; i++) {
        _style = doc.styleSheets[i];
        if (_style.ownerNode.id && _style.ownerNode.id == "vvvebjs-styles") {
          style = _style.ownerNode;
          break;
        }
      }

      //if style element does not exist create it
      if (!style) {
        style = generateElements('<style id="vvvebjs-styles"></style>')[0];
        doc.head.append(style);
        return (this.cssContainer = style);
      }

      //if it exists
      this.cssContainer = style;
      this.loadCss();

      return this.cssContainer;
    }
  },

  loadCss: function () {
    let style = this.cssContainer.sheet;
    //if style exist then load all css styles for editor
    for (let j = 0; j < style.cssRules.length; j++) {
      const media =
        typeof style.cssRules[j].media === "undefined"
          ? "desktop"
          : style.cssRules[j].media[0] === "screen and (max-width: 1220px)"
            ? "tablet"
            : style.cssRules[j].media[0] === "screen and (max-width: 375px)"
              ? "mobile"
              : "desktop";
      //Custom Modification Ends Here - Jayanti - 09-09-2025

      const selector =
        media === "desktop"
          ? style.cssRules[j].selectorText
          : style.cssRules[j].cssRules[0].selectorText;
      const styles =
        media === "desktop"
          ? style.cssRules[j].style
          : style.cssRules[j].cssRules[0].style;

      if (media) {
        this.styles[media] = this.styles[media] ?? {};
        if (selector) {
          this.styles[media][selector] = {};

          for (let k = 0; k < styles.length; k++) {
            const property = styles[k];
            const value = styles[property];

            this.styles[media][selector][property] = value;
          }
        }
      }
    }
  },

  getSelectorForElement: function (element) {
    if (!element) return "";

    let currentElement = element;
    let selector = [];

    while (currentElement.parentElement) {
      let elementSelector = "";
      let classSelector = Array.from(currentElement.classList)
        .map(function (className) {
          if (Vvveb.Builder.ignoreClasses.indexOf(className) == -1) {
            return "." + className;
          }
        })
        .join("");

      //element (tag) selector
      let tag = currentElement.tagName.toLowerCase();
      //exclude top most element body unless the parent element is body
      if (tag == "body" && selector.length > 1) {
        break;
      }

      //stop at a unique element (with id)
      if (currentElement.id) {
        elementSelector = "#" + currentElement.id;
        selector.push(elementSelector);
        break;
      } else if (classSelector) {
        //class selector
        elementSelector = classSelector;
      } else {
        //element selector
        elementSelector = tag;
      }

      if (elementSelector) {
        selector.push(elementSelector);
      }

      currentElement = currentElement.parentElement;
    }

    return selector.reverse().join(" > ");
  },

  setState: function (state) {
    this.state = state;
  },

  addSelectorState: function (selector) {
    return selector + (this.state ? ":" + this.state : "");
  },

  setStyle: function (element, styleProp, value) {
    let selector;

    if (typeof element == "string") {
      selector = element;
    } else {
      let node = element;

      //if propert is set with inline style attribute then override it and don't save to css
      //inline text editor sets properties like font-size inline that can't be later overriten from css
      if (node.style && node.style[styleProp]) {
        node.style[styleProp] = value;
        return element;
      }

      selector = this.getSelectorForElement(node);
    }

    if (this.inlineCSS) {
      element.style[styleProp] = value;
      return element;
    }

    selector = this.addSelectorState(selector);

    const media = document.getElementById("canvas").classList.contains("tablet")
      ? "tablet"
      : document.getElementById("canvas").classList.contains("mobile")
        ? "mobile"
        : "desktop";

    //styles[media][selector][styleProp] = value
    if (!this.styles[media]) {
      this.styles[media] = {};
    }
    if (!this.styles[media][selector]) {
      this.styles[media][selector] = {};
    }
    if (!this.styles[media][selector][styleProp]) {
      this.styles[media][selector][styleProp] = {};
    }
    this.styles[media][selector][styleProp] = value;

    this.generateCss(media);

    return element;
    //uncomment bellow code to set css in element's style attribute
    //return element.css(styleProp, value);
  },

  setCss: function (css) {
    this.cssContainer.innerHTML = css;
    this.loadCss();
  },

  getCss: function (css) {
    return this.cssContainer.innerHTML;
  },

  generateCss: function (media) {
    //let css = "";
    //for (selector in this.styles[media]) {

    //	css += `${selector} {`;
    //	for (property in this.styles[media][selector]) {
    //		value = this.styles[media][selector][property];
    //		css += `${property}: ${value};`;
    //	}
    //	css += '}';
    //}

    //this.cssContainer.innerHTML = css;

    //return element;
    //refresh container element to avoid issues with changes from code editor
    this.cssContainer = this.doc.getElementById("vvvebjs-styles");

    let css = "";
    for (media in this.styles) {
      if (media === "tablet" || media === "mobile") {
        css += `@media screen and (max-width: ${media === "tablet" ? this.tabletWidth : this.mobileWidth
          }){\n\n`;
      }
      for (selector in this.styles[media]) {
        css += `${selector} {\n`;
        for (property in this.styles[media][selector]) {
          const value = this.styles[media][selector][property];
          css += `\t${property}: ${value};\n`;
        }
        css += "}\n\n";
      }
      if (media === "tablet" || media === "mobile") {
        css += `}\n\n`;
      }
    }

    return (this.cssContainer.innerHTML = css);
  },

  _getCssStyle: function (element, styleProp) {
    let value = "",
      el,
      selector,
      media;

    el = element;
    if (el != this.currentElement) {
      selector = this.getSelectorForElement(el);
      this.currentElement = el;
      this.currentSelector = selector;
    } else {
      selector = this.currentSelector;
    }

    selector = this.addSelectorState(selector);
    media = document.getElementById("canvas").classList.contains("tablet")
      ? "tablet"
      : document.getElementById("canvas").classList.contains("mobile")
        ? "mobile"
        : "desktop";

    if (el.style && el.style.length > 0 && el.style[styleProp]) {
      //check inline
      value = el.style[styleProp];
    } else if (
      this.styles[media] !== undefined &&
      this.styles[media][selector] !== undefined &&
      this.styles[media][selector][styleProp] !== undefined
    ) {
      //check defined css
      value = this.styles[media][selector][styleProp];

      if (styleProp == "font-family") {
      }
    } else if (window.getComputedStyle) {
      value = document.defaultView.getDefaultComputedStyle
        ? document.defaultView
          .getDefaultComputedStyle(el, null)
          .getPropertyValue(styleProp)
        : window.getComputedStyle(el, null).getPropertyValue(styleProp);
    }

    return value;
  },

  getStyle: function (element, styleProp) {
    return this._getCssStyle(element, styleProp);
  },
};

Vvveb.ContentManager = {
  getAttr: function (element, attrName) {
    return element.getAttribute(attrName);
  },

  setAttr: function (element, attrName, value) {
    return element.setAttribute(attrName, value);
  },

  setHtml: function (element, html) {
    return (element.innerHTML = html);
  },

  getHtml: function (element) {
    return element.innerHTML;
  },

  setText: function (element, text) {
    return (element.textContent = text);
  },

  getText: function (element) {
    return element.textContent;
  },
};

function getNodeTree(node, parent, allowedComponents, idToNode = {}) {
  function getNodeTreeTraverse(node, parent, id = "") {
    if (node.hasChildNodes()) {
      for (let j = 0; j < node.childNodes.length; j++) {
        const child = node.childNodes[j];

        //skip text and comments nodes
        if (child.nodeType == 3 || child.nodeType == 8) {
          continue;
        }

        let element;
        if (
          child &&
          child["attributes"] != undefined &&
          (matchChild = Vvveb.Components.matchNode(child))
        ) {
          if (
            Array.isArray(allowedComponents) &&
            allowedComponents.indexOf(matchChild.type) == -1
          ) {
            element = getNodeTreeTraverse(child, parent);
            continue;
          }

          element = {
            name: matchChild.name,
            image: matchChild.image,
            type: matchChild.type,
            node: child,
            id: id + "-" + j,
            children: [],
          };

          element.children = [];
          parent.push(element);
          idToNode[id + "-" + j] = child;

          element = getNodeTreeTraverse(child, element.children, id + "-" + j);
        } else {
          element = getNodeTreeTraverse(child, parent, id + "-" + j);
        }
      }
    }

    return false;
  }

  getNodeTreeTraverse(node, parent, "1");
}

function drawComponentsTree(tree) {
  let j = 1;
  let prefix = Math.floor(Math.random() * 100);

  function drawComponentsTreeTraverse(tree) {
    let list = document.createElement("ol");
    j++;

    for (i in tree) {
      let node = tree[i];
      let id = node.id;
      let li;

      if (!id) {
        id = prefix + "-" + j + "-" + i;
      }

      if (tree[i].children.length > 0) {
        li = generateElements(
          '<li data-component="' +
          node.name +
          '">\
								<label for="id' +
          id +
          '" style="background-image:url(' +
          Vvveb.imgBaseUrl +
          node.image +
          ')"><span>' +
          node.name +
          '</span></label>\
								<input type="checkbox" id="id' +
          id +
          '">\
							</li>'
        )[0];
        li.append(drawComponentsTreeTraverse(node.children));
      } else {
        li = generateElements(
          '<li data-component="' +
          node.name +
          '" class="file">\
							<label for="id' +
          id +
          '" style="background-image:url(' +
          Vvveb.imgBaseUrl +
          node.image +
          ')"><span>' +
          node.name +
          '</span></label>\
							<input type="checkbox" id="id' +
          id +
          '">\
							</li>'
        )[0];
      }

      li._treeNode = node.node;
      list.append(li);
    }

    return list;
  }

  return drawComponentsTreeTraverse(tree);
}

let selected = null;
let dragover = null;

Vvveb.SectionList = {
  selector: ".sections-container",
  allowedComponents: {},

  init: function (allowedComponents = {}) {
    this.allowedComponents = allowedComponents;

    document
      .querySelector(this.selector)
      .addEventListener("click", function (e) {
        let element = e.target.closest(":scope > div .controls");
        if (element) {
          let node = element.parentNode._node;
          if (node) {
            node.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
            //node.click();
            Vvveb.Builder.selectNode(node);
            Vvveb.Builder.loadNodeComponent(node);
          }
        }
      });

    document
      .querySelector(this.selector)
      .addEventListener("dblclick", function (e) {
        let element = e.target.closest(":scope > div");
        if (element) {
          const node = element._node;
          node.click();
        }
      });

    document
      .querySelector(this.selector)
      .addEventListener("click", function (e) {
        let element = e.target.closest("li[data-component] label");
        if (element) {
          let node = element.parentNode._node;
          if (node) {
            node.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
            node.click();
          }
        }
      });

    document
      .querySelector(this.selector)
      .addEventListener("mouseenter", function (e) {
        let element = e.target.closest("li[data-component] label");
        if (element) {
          const node = document.querySelector(element.parentNode._node);
          node.css("outline", "1px dashed blue");
        }
      });

    document
      .querySelector(this.selector)
      .addEventListener("mouseleave", function (e) {
        let element = e.target.closest("li[data-component] label");
        if (element) {
          const node = document.querySelector(element.parentNode._node);
          node.css("outline", "");
          if (node.getAttribute("style") == "") node.removeAttribute("style");
        }
      });

    document
      .querySelector(this.selector)
      .addEventListener("dragstart", this.dragStart);
    document
      .querySelector(this.selector)
      .addEventListener("dragover", this.dragOver);
    document
      .querySelector(this.selector)
      .addEventListener("dragend", this.dragEnd);

    document
      .querySelector(this.selector)
      .addEventListener("click", function (e) {
        let element = e.target.closest(".delete-btn");
        if (element) {
          let section = element.closest(".section-item");
          let node = section._node;
          node.remove();
          section.remove();
          Vvveb.TreeList.loadComponents();

          e.stopPropagation();
          e.preventDefault();
        }
      });

    let sectionIn;
    let img = document.querySelector(".block-preview img");
    document
      .querySelector(".sections-list")
      .addEventListener("mouseover", function (e) {
        let element = e.target.closest("li[data-type]");
        if (element) {
          if (sectionIn != element) {
            let src = element.querySelector("img").getAttribute("src");
            sectionIn = element;
            img.setAttribute("src", src);
            img.style.display = "";
          }
        } else {
          sectionIn = element;
          img.setAttribute("src", "");
          img.style.display = "none";
        }
      });

    /*
    document.querySelector(this.selector).addEventListener("click", ".up-btn", function (e) {
      let section = e.target.closest(".section-item");
      let node = section._node;
      Vvveb.Builder.moveNodeUp(node);
      Vvveb.Builder.moveNodeUp(section);
    	
      e.preventDefault();
    });


    document.querySelector(this.selector).addEventListener("click", ".down-btn", function (e) {
      let section = e.target.closest(".section-item");
      let node = section._node;
      Vvveb.Builder.moveNodeDown(node);
      Vvveb.Builder.moveNodeDown(section);
    	
      e.preventDefault();
    });
    */

    let self = this;
    document
      .querySelector(".sections-list")
      .addEventListener("click", function (e) {
        let element = e.target.closest(".add-section-btn");
        if (element) {
          let item = element.closest("li");
          let section = Vvveb.Sections.get(item.dataset.type);
          let node = generateElements(section.html)[0];
          let sectionType = node.tagName.toLowerCase();
          let afterSection = Vvveb.Builder.frameBody.querySelector(
            ":scope > " + sectionType + ":last-of-type"
          );

          if (afterSection) {
            afterSection.after(node);
          } else {
            if (sectionType == "nav") {
              afterSection = Vvveb.Builder.frameBody.querySelector(
                ":scope > nav:first,> header:last-of-type"
              );

              if (afterSection) {
                afterSection.before(node);
              } else {
                Vvveb.Builder.frameBody.append(node);
              }
            } else if (sectionType != "footer") {
              afterSection = Vvveb.Builder.frameBody.querySelector(
                "body > footer:last-of-type"
              );

              if (afterSection) {
                afterSection.before(node);
              } else {
                Vvveb.Builder.frameBody.append(node);
              }
            } else {
              Vvveb.Builder.frameBody.append(node);
            }
          }

          node.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
          //node.click();
          Vvveb.Builder.selectNode(node);
          Vvveb.Builder.loadNodeComponent(node);
          /*
        Vvveb.Builder.frameHtml.animate({
          scrollTop: node.offset().top
        }, 1000);
      	
        delay(() => node.click(), 1000);
        */

          Vvveb.Undo.addMutation({
            type: "childList",
            target: node.parentNode,
            addedNodes: [node],
            nextSibling: node.nextSibling,
          });

          self.loadSections();
          Vvveb.TreeList.loadComponents();
          Vvveb.TreeList.selectComponent(node);

          e.preventDefault();
        }
      });

    document
      .querySelector(this.selector)
      .addEventListener("click", function (e) {
        let element = e.target.closest(".properties-btn");
        if (element) {
          let section = element.closest(".section-item");
          let node = section._node;
          node.click();

          e.preventDefault();
        }
      });
  },

  getSections: function () {
    let sections = [];
    let sectionList = window.FrameDocument.body.querySelectorAll(
      ":scope > section, :scope > header, :scope > footer, :scope > main, :scope > nav"
    );

    sectionList.forEach(function (node, i) {
      let id = node.id
        ? node.id
        : node.title
          ? node.title
          : node.ariaLabel ?? node.className;
      if (!id) {
        id = "section-" + Math.floor(Math.random() * 10000);
      }
      let section = {
        name: id.replace(/[^\w+]+/g, " "),
        id: node.id,
        type: node.tagName.toLowerCase(),
        node: node,
      };
      sections.push(section);
    });

    return sections;
  },

  loadComponents: function (sectionListItem, section, allowedComponents = {}) {
    let tree = [];
    getNodeTree(section, tree, allowedComponents);

    let html = drawComponentsTree(tree);
    document.querySelector("ol", sectionListItem).replaceWith(html);
  },

  addSection: function (data) {
    let section = generateElements(tmpl("vvveb-section", data))[0];
    section._node = data.node;
    document.querySelector(this.selector).append(section);

    //this.loadComponents(section, data.node, this.allowedComponents);
  },

  loadSections: function () {
    let sections = this.getSections();
    let container = document.querySelector(this.selector);

    container.replaceChildren();
    for (i in sections) {
      this.addSection(sections[i]);
    }
  },

  //drag and drop
  dragOver: function (e) {
    let element = e.target.closest("div");
    if (element) {
      if (e.target != dragover && e.target.className == "section-item") {
        if (dragover) {
          dragover.classList.remove("drag-over");
        }

        const dragover = e.target;
        dragover.classList.add("drag-over");
      }
    }
  },

  dragEnd: function (e) {
    let element = e.target.closest("div");
    if (element) {
      if (dragover) {
        let parent = selected.parentNode;
        let selectedNode = selected._node;
        let replaceNode = dragover._node;

        if (dragover.offsetTop > selected.offsetTop) {
          //replace section item list
          parent.insertBefore(selected, dragover.nextElementSibling);
          //replace section
          replaceNode.parentNode.insertBefore(
            selectedNode,
            replaceNode.nextElementSibling
          );
        } else {
          //replace section item list
          parent.insertBefore(selected, dragover);
          //replace section
          replaceNode.parentNode.insertBefore(selectedNode, replaceNode);
        }

        dragover.classList.remove("drag-over");

        let node = selectedNode;

        Vvveb.Undo.addMutation({
          type: "move",
          target: node,
          oldParent: node.parentNode,
          oldNextSibling: node.nextSibling,
        });
      }

      selected = null;
      dragover = null;
    }
  },

  dragStart: function (e) {
    let element = e.target.closest("div");
    if (element) {
      selected = e.target;
    }
  },
};

Vvveb.TreeList = {
  selector: "#tree-list",

  container: null,

  tree: [],

  idToNode: {},

  init: function () {
    // header move
    this.container = document.querySelector(this.selector);
    let header = this.container.querySelector(".header");
    let isDown = false;
    let offset = [0, 0];
    let self = this;

    header.addEventListener(
      "mousedown",
      function (e) {
        if (e.button === 0) {
          //left click
          isDown = true;
          offset = [
            self.container.offsetLeft - e.clientX,
            self.container.offsetTop - e.clientY,
          ];
        }
      },
      true
    );

    document.addEventListener(
      "mouseup",
      function () {
        isDown = false;
      },
      true
    );

    document.addEventListener("mousemove", function (event) {
      if (isDown) {
        event.preventDefault();
        let left = Math.max(event.clientX + offset[0], 0);
        let top = Math.max(event.clientY + offset[1], 0);

        if (left >= 0 && left < window.innerWidth - self.container.clientWidth)
          self.container.style.left = left + "px";
        if (top >= 0 && top < window.innerHeight - self.container.clientHeight)
          self.container.style.top = top + "px";
      }
    });

    document
      .querySelector(this.selector)
      .addEventListener("click", function (e) {
        let element = e.target.closest("li[data-component]");
        if (element) {
          const node = element._treeNode;
          node.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
          //node.click();
          Vvveb.Builder.selectNode(node);
          Vvveb.Builder.loadNodeComponent(node);

          document
            .querySelector(self.selector + " .active")
            ?.classList.remove("active");
          element.querySelector("label").classList.add("active");
        }
      });

    document
      .querySelector(this.selector)
      .addEventListener("mousemove", function (e) {
        let element = e.target.closest("li[data-component]");
        if (element) {
          const node = element._treeNode;

          node.dispatchEvent(
            new MouseEvent("mousemove", {
              bubbles: true,
              cancelable: true,
            })
          );
        }
      });
  },

  selectComponent: function (node) {
    let id;
    for (const i in this.idToNode) {
      if (node == this.idToNode[i]) {
        id = i;
        break;
      }
    }

    if (id) {
      let element = document.getElementById("id" + id);

      this.container.querySelector(".active")?.classList.remove("active");
      //collapse all
      let checkboxes = this.container.querySelectorAll(
        "input[type=checkbox]:checked"
      );
      for (let i = 0, len = checkboxes.length; i < len; i++) {
        checkboxes[i].checked = false;
        let label = checkboxes[i].labels[0];
        if (label) {
          label.classList.remove("active");
        }
      }

      //expand parents
      if (element) {
        let parent = element;
        let current = element;
        while ((parent = current.closest("li"))) {
          current = parent.parentNode;
          let input = parent.querySelector("input");
          if (input && input.hasAttribute("type") && input.type == "checkbox") {
            input.checked = true;
          }
        }

        element.checked = true;
        element.labels[0].classList.add("active");
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }

    return false;
  },

  // Custom modification - comment out for causing undo redo issue

  /*loadComponents: function() {
    let list = this.container.querySelector(".tree > ol");
    //if navigator not visible don't load
    if (list.offsetParent === null) return;
  	
    this.tree     = [];
    this.idToNode = {};
    getNodeTree(window.FrameDocument.body, this.tree, {}, this.idToNode);
  	
    let ol = drawComponentsTree(this.tree);
    list.replaceWith(ol);
    //list.replaceWith(html);
  },*/

  // Custom modification - added custom function
  loadComponents: function () {
    // Defensive check for container
    if (!this.container) {
      //console.warn("TreeList: container is null! Is #tree-list missing?");
      return;
    }

    let list = this.container.querySelector(".tree > ol");
    if (!list) {
      //console.warn("TreeList: .tree > ol not found inside #tree-list.");
      return;
    }

    // If navigator not visible, don't load
    if (list.offsetParent === null) return;

    this.tree = [];
    this.idToNode = {};
    getNodeTree(window.FrameDocument.body, this.tree, {}, this.idToNode);

    let ol = drawComponentsTree(this.tree);
    list.replaceWith(ol);
  },
};

Vvveb.FileManager = {
  tree: false,
  pages: {},
  currentPage: false,
  allowedComponents: {},

  init: function (allowedComponents = {}) {
    this.allowedComponents = allowedComponents;
    this.tree = document.querySelector("#filemanager .tree > ol");
    this.tree.replaceChildren();

    this.tree.addEventListener("click", function (e) {
      let element = event.target.closest("a");
      if (element) {
        e.stopImmediatePropagation();
        if (element.classList.contains("view")) return;
        e.preventDefault();
        return false;
      }
    });

    this.tree.addEventListener("click", function (e) {
      let element = event.target.closest(".delete");
      if (element) {
        Vvveb.FileManager.deletePage(element.closest("li"), e);
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
      }
    });

    this.tree.addEventListener("click", function (e) {
      let element = event.target.closest(".rename");
      if (element) {
        Vvveb.FileManager.renamePage(element.closest("li"), e, false);
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
      }
    });

    this.tree.addEventListener("click", function (e) {
      let element = event.target.closest(".duplicate");
      if (element) {
        Vvveb.FileManager.renamePage(element.closest("li"), e, true);
        e.stopImmediatePropagation();
        e.preventDefault();
        return false;
      }
    });

    this.tree.addEventListener("click", function (e) {
      let element = event.target.closest("li[data-page] label");
      if (element) {
        let page = element.parentNode.dataset.page;
        if (page) Vvveb.FileManager.loadPage(page, allowedComponents);
        e.preventDefault();
        return false;
      }
    });

    this.tree.addEventListener("click", function (e) {
      let element = event.target.closest("li[data-component] label");
      if (element) {
        const node = e.currentTarget.parentNode._node;
        node.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
        node.click();
      }
    });

    this.tree.addEventListener("mouseenter", function (e) {
      let element = event.target.closest("li[data-component] label");
      if (element) {
        const node = e.currentTarget.parentNode._node;
        node.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });

        node.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
          })
        );
        //node.trigger("mousemove");
      }
    });
  },

  clear: function () {
    this.pages = {};
    this.currentPage = false;
    this.tree.replaceChildren();
  },

  deletePage: function (element, e) {
    let page = element.dataset;
    if (confirm(`Are you sure you want to delete "${page.file}"template?`)) {
      let detail = { page, element };
      //allow event to change page or cancel by setting page to false
      window.dispatchEvent(
        new CustomEvent("vvveb.FileManager.deletePage", {
          detail,
        })
      );

      if (detail.page) {
        fetch(deleteUrl, {
          method: "POST",
          body: new URLSearchParams({ file: page.file }),
        })
          .then((response) => {
            if (!response.ok) {
              return Promise.reject(response);
            }
            return response.text();
          })
          .then((data) => {
            let bg = "bg-success";
            if (data.success) {
              document
                .querySelectorAll("#top-panel .save-btn")
                .forEach((e) => e.setAttribute("disabled", "true"));
            } else {
              bg = "bg-danger";
            }

            displayToast(bg, "Delete", data.message ?? data);
          })
          .catch((error) => {
            // console.log(error);
            let message = error.statusText ?? "Error deleting page!";
            displayToast("bg-danger", "Error", message);

            err.text().then((errorMessage) => {
              let message = errorMessage.substr(0, 200);
              displayToast("bg-danger", "Error", message);
            });
          });

        element.remove();
      }
    }
  },

  renamePage: function (element, e, duplicate = false) {
    let page = element.dataset;
    let newfile = prompt(`Enter new file name for "${page.file}"`, page.file);
    let _self = this;
    if (newfile) {
      let detail = { page, newfile, element };
      //allow event to change page or newfile or cancel by setting page to false
      window.dispatchEvent(
        new CustomEvent("vvveb.FileManager.renamePage", {
          detail,
        })
      );

      if (detail.page) {
        fetch(renameUrl, {
          method: "POST",
          body: new URLSearchParams({
            file: page.file,
            newfile: newfile,
            duplicate,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              return Promise.reject(response);
            }
            return response.text();
          })
          .then((data) => {
            let bg = "bg-success";
            if (data.success) {
              document
                .querySelectorAll("#top-panel .save-btn")
                .forEach((e) => e.setAttribute("disabled", "true"));
            } else {
              bg = "bg-danger";
            }

            newfile = data.newfile ?? newfile;
            displayToast(bg, "Rename", data.message ?? data);
            let baseName = newfile.replace(".html", "");
            let newName = friendlyName(
              newfile.replace(/.*[\/\\]+/, "")
            ).replace(".html", "");

            if (duplicate) {
              let data = _self.pages[page.page];
              data["file"] = newfile;
              data["title"] = newName;
              Vvveb.FileManager.addPage(baseName, data);
            } else {
              _self.pages[page.page]["file"] = newfile;
              _self.pages[page.page]["title"] = newName;
              page.url = data.url ?? page.url.replace(page.file, newfile);
              page.file = newfile;
              element.querySelector(":scope > label span").innerHTML = newName;
              element
                .querySelector(":scope > label a.view")
                .setAttribute("href", page.url);
              _self.pages[page.page]["url"] = page.url;
              _self.pages[page.page]["file"] = page.file;
            }
          })
          .catch((error) => {
            // console.log(error);
            let message = error.statusText ?? "Error renaming page!";
            displayToast("bg-danger", "Error", message);

            error.text().then((errorMessage) => {
              let message = errorMessage.substr(0, 200);
              displayToast("bg-danger", "Error", message);
            });
          });
      }
    }
  },

  addPage: function (name, data, afterPage = false) {
    //allow event to change name or cancel by setting name to false
    window.dispatchEvent(
      new CustomEvent("vvveb.FileManager.addPage", {
        detail: [name, data],
      })
    );

    if (!name) {
      return false;
    }

    this.pages[name] = data;
    data["name"] = name;

    let folder = this.tree;
    if (data.folder) {
      if (
        data.folder &&
        data.folder != "/" &&
        !(folder = folder.querySelector(
          'li[data-folder="' + data.folder + '"]'
        ))
      ) {
        data.folderTitle = friendlyName(data.folder); //data.folder[0].toUpperCase() + data.folder.slice(1);
        folder = generateElements(tmpl("vvveb-filemanager-folder", data))[0];
        this.tree.append(folder);
      }

      folder = folder.querySelector("ol");
    }

    let page = generateElements(tmpl("vvveb-filemanager-page", data))[0];
    if (
      afterPage &&
      (afterPage = folder.querySelector('[data-page="' + afterPage + '"]'))
    ) {
      afterPage.after(page);
    } else {
      folder.append(page);
    }

    return page;
  },

  addPages: function (pages) {
    for (page in pages) {
      this.addPage(pages[page]["name"], pages[page]);
    }
  },

  addComponent: function (name, url, title, page) {
    document.querySelector("[data-page='" + page + "'] > ol", this.tree).append(
      tmpl("vvveb-filemanager-component", {
        name: name,
        url: url,
        title: title,
      })
    );
  },

  loadComponents: function (allowedComponents = {}) {
    let tree = [];
    getNodeTree(window.FrameDocument.body, tree, allowedComponents);

    let html = drawComponentsTree(tree);
    document
      .querySelector("[data-page='" + this.currentPage + "'] > ol", this.tree)
      .replaceWith(html);
  },

  getCurrentUrl: function () {
    if (this.currentPage) {
      return this.pages[this.currentPage]["url"];
    }
  },

  getCurrentPage: function () {
    return this.currentPage;
  },

  getPageData: function (key) {
    if (this.currentPage) {
      return this.pages[this.currentPage][key];
    }
  },

  getCurrentFileName: function () {
    if (this.currentPage) {
      let folder = this.pages[this.currentPage]["folder"];
      folder = folder ? folder + "/" : "";
      return folder + this.pages[this.currentPage]["file"];
    }
  },

  reloadCurrentPage: function () {
    if (this.currentPage) return this.loadPage(this.currentPage);
  },

  loadPage: function (
    name,
    allowedComponents = false,
    disableCache = true,
    loadComponents = false
  ) {
    let url = this.pages[name]["url"] ?? "";

    if (!url) {
      return;
    }

    let page = this.tree.querySelector("[data-page='" + name + "']");
    //remove active from current active page
    this.tree.querySelector("[data-page].active")?.classList.remove("active");
    //set loaded page as active
    page.classList.add("active");
    //open parent folder if closed
    page
      .closest("[data-folder]")
      ?.querySelector("input[type=checkbox]")
      .setAttribute("checked", true);

    this.currentPage = name;
    document.querySelector(".btn-preview-url").setAttribute("href", url);

    //allow event to change page or url or cancel by setting url to false
    let self = this;

    window.dispatchEvent(
      new CustomEvent("vvveb.FileManager.loadPage", {
        detail: self.pages[name],
      })
    );

    // Re-read url after event (handlers may set it to false to cancel default load)
    url = self.pages[name]["url"] ?? "";

    if (url) {
      Vvveb.Builder.loadUrl(
        url +
        (disableCache
          ? (url.indexOf("?") > -1 ? "&r=" : "?r=") + Math.random()
          : ""),
        function () {
          if (loadComponents) {
            Vvveb.FileManager.loadComponents(allowedComponents);
          }
          Vvveb.SectionList.loadSections(allowedComponents);
          Vvveb.TreeList.loadComponents();
          Vvveb.StyleManager.init();
        }
      );
    }
  },

  scrollToPage: function (page) {
    page.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  },
};

Vvveb.Breadcrumb = {
  tree: false,

  init: function () {
    this.tree = document.querySelector(".breadcrumb-navigator > .breadcrumb");
    this.tree.replaceChildren();

    this.tree.addEventListener("click", function (e) {
      let element = event.target.closest(".breadcrumb-item");
      if (element) {
        let node = element._node;
        if (node) {
          //node.click();
          Vvveb.Builder.selectNode(node);
          Vvveb.Builder.loadNodeComponent(node);
          node.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center",
          });
        }

        e.preventDefault();
      }
    });

    let currentHoverNode;
    this.tree.addEventListener("mousemove", function (e) {
      if (event.target == currentHoverNode) return;
      currentHoverNode = event.target;

      let element = event.target.closest(".breadcrumb-item");
      if (element) {
        let node = element._node;

        node.dispatchEvent(
          new MouseEvent("mousemove", {
            bubbles: true,
            cancelable: true,
          })
        );
      }
    });
  },

  addElement: function (data, element) {
    let li = generateElements(tmpl("vvveb-breadcrumb-navigaton-item", data))[0];
    li._node = element;
    this.tree.prepend(li);
  },

  loadBreadcrumb: function (element) {
    this.tree.replaceChildren();
    let currentElement = element;

    while (currentElement.parentElement) {
      let elementType = Vvveb.Builder._getElementType(currentElement);
      let el = elementType[1].toLowerCase();

      this.addElement(
        {
          name: el + " " + elementType[0],
          className: "el-" + el,
        },
        currentElement
      );

      currentElement = currentElement.parentElement;
    }
  },
};

Vvveb.FontsManager = {
  activeFonts: [],
  providers: {}, //{"google":GoogleFontsManager};

  addFontList: function (provider, groupName, fontList) {
    let fonts = {};
    let fontNames = [];

    let fontSelect = generateElements(
      "<optgroup label='" + groupName + "'></optgroup>"
    )[0];
    for (const font in fontList) {
      fontNames.push({
        text: font,
        value: font,
        "data-provider": provider,
      });
      let option = new Option(font, font);
      option.dataset.provider = provider;
      //option.style.setProperty("font-family", font);//font preview if the fonts are loaded in editor
      fontSelect.append(option);
    }
    document.getElementById("font-family").append(fontSelect);

    let list = Vvveb.Components.getProperty("_base", "font-family");
    if (list) {
      list.onChange = function (node, value, input, component) {
        let option = input.options[input.selectedIndex];
        Vvveb.FontsManager.addFont(option.dataset.provider, value, node);
        return node;
      };

      list.data.options.push({ optgroup: groupName });
      list.data.options = list.data.options.concat(fontNames);

      Vvveb.Components.updateProperty("_base", "font-family", {
        data: list.data,
      });

      //update default font list
      fontList = list.data.options;
    }
  },

  addProvider: function (provider, Obj) {
    this.providers[provider] = Obj;
  },

  //add also element so we can keep track of the used fonts to remove unused ones
  addFont: function (provider, fontFamily, element = false) {
    if (!provider) return;
    // console.log("element: ", element);
    let providerObj = this.providers[provider];
    if (providerObj) {
      providerObj.addFont(fontFamily);
      this.activeFonts.push({ provider, fontFamily, element });
    }
  },

  removeFont: function (provider, fontFamily) {
    if (!provider) return;

    let providerObj = this.providers[provider];
    if (provider != "default" && providerObj) {
      providerObj.removeFont(fontFamily);
    }
  },

  //check if the added fonts are still used for the elements they were set and remove unused ones
  cleanUnusedFonts: function () {
    for (i in this.activeFonts) {
      let elementFont = this.activeFonts[i];
      if (elementFont.element) {
        if (
          Vvveb.StyleManager.getStyle(
            elementFont.element,
            "font-family"
          ).replaceAll('"', "") != elementFont.fontFamily
        ) {
          this.removeFont(elementFont.provider, elementFont.fontFamily);
        }
      }
    }
  },
};

//Custom Modification - Jayanti - 07-10-25
// ---- Register Google Fonts provider  ----
Vvveb.FontsManager.addProvider("google", {
  _fontsByDoc: new WeakMap(),

  addFont: function (fontFamily, targetDoc) {
    const doc =
      targetDoc ||
      window.FrameDocument ||
      Vvveb.Builder?.iframe?.contentDocument ||
      document;

    if (!doc || !doc.head) return;

    let fonts = this._fontsByDoc.get(doc) || [];
    if (!fonts.includes(fontFamily)) {
      fonts.push(fontFamily);
      this._fontsByDoc.set(doc, fonts);
    }

    const families = fonts
      .map(
        (font) =>
          `family=${font.replace(/ /g, "+")}:ital,wght@0,100..900;1,100..900`
      )
      .join("&");

    const href = `https://fonts.googleapis.com/css2?${families}&display=swap`;

    let link = doc.getElementById("google-fonts-link");
    if (!link) {
      link = doc.createElement("link");
      link.id = "google-fonts-link";
      link.rel = "stylesheet";
      doc.head.appendChild(link);
    }

    link.href = href;
  },

  removeFont: function (fontFamily, targetDoc) {
    const doc =
      targetDoc ||
      window.FrameDocument ||
      Vvveb.Builder?.iframe?.contentDocument ||
      document;

    if (!doc) return;

    let fonts = this._fontsByDoc.get(doc) || [];
    fonts = fonts.filter((f) => f !== fontFamily);
    this._fontsByDoc.set(doc, fonts);

    const link = doc.getElementById("google-fonts-link");
    if (!link) return;

    if (!fonts.length) {
      link.remove();
      return;
    }

    const families = fonts
      .map(
        (font) =>
          `family=${font.replace(/ /g, "+")}:ital,wght@0,100..900;1,100..900`
      )
      .join("&");

    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  },
});

// === helper: build clean Google Fonts URL ===
function buildGoogleFontsLink(familiesWithWeights) {
  const seen = new Set();
  const parts = [];
  for (let fam of familiesWithWeights) {
    if (!fam) continue;
    fam = fam.trim().replace(/^['"]|['"]$/g, ""); // quotes hatao
    fam = fam.replace(/\s+/g, " "); // collapse whitespace
    let [name, weights] = fam.split(":");
    const encName = name.replace(/\s/g, "+");
    const key = weights ? `${encName}:${weights}` : encName;
    if (seen.has(key)) continue;
    seen.add(key);
    parts.push(`family=${key}`);
  }
  const base = "https://fonts.googleapis.com/css2?display=swap";
  return base + (parts.length ? "&" + parts.join("&") : "");
}

//Custom Modification Ends Here - Jayanti - 07-10-25
Vvveb.ColorPalette = {
  colors: {},

  getAll: function () {
    return this.colors;
  },

  add: function (name, color) {
    this.colors[name] = color;
  },

  remove: function (color) {
    delete this.colors[name];
  },
};

function friendlyName(name) {
  name = name.replaceAll("--bs-", "").replace(/[-_]/g, " ").trim();
  return (name = name[0].toUpperCase() + name.slice(1));
}

Vvveb.ColorPaletteManager = {
  cssVars: { font: {}, color: {}, dimensions: {} },

  getType: function (type) {
    return this.cssVars[type];
  },

  getAllCSSVariableNames: function (
    styleSheets = document.styleSheets,
    selector
  ) {
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        let cssRules = styleSheets[i].cssRules;
        for (let j = 0; j < cssRules.length; j++) {
          try {
            let style = cssRules[j].style;
            if (
              selector &&
              cssRules[j].selectorText &&
              cssRules[j].selectorText != selector
            )
              continue;
            for (let k = 0; k < style.length; k++) {
              let name = style[k];
              let value = style.getPropertyValue(name).trim();
              let type = "";

              if (name.startsWith("--")) {
                //ignore bootstrap rgb variables
                if (name.endsWith("-rgb")) continue;
                //ignore variables depending on other variables
                if (value.startsWith("var(")) continue;

                let friendlyName = name
                  .replace("--bs-", "")
                  .replaceAll("-", " ");

                if (value.startsWith("#")) {
                  type = "color";
                } else if (value.indexOf('"') >= 0 || value.indexOf("'") >= 0) {
                  type = "font";
                } else if (
                  value.endsWith("em") > 0 ||
                  value.endsWith("px") > 0
                ) {
                  type = "dimensions";
                } else if (!isNaN(parseFloat(value))) {
                  type = "dimensions";
                }

                if (type) {
                  if (!this.cssVars[type]) this.cssVars[type] = {};
                  this.cssVars[type][name] = {
                    value,
                    type,
                    friendlyName,
                  };
                }
              }
            }
          } catch (error) { }
        }
      } catch (error) { }
    }

    return this.cssVars;
  },

  getCssWithVars: function (styleSheets = document.styleSheets, vars) {
    let cssVars = {};
    let css = "";
    let cssStyles = "";
    for (let i = 0; i < styleSheets.length; i++) {
      try {
        let cssRules = styleSheets[i].cssRules;
        for (let j = 0; j < cssRules.length; j++) {
          try {
            let style = cssRules[j].style;
            //if (selector && cssRules[j].selectorText && cssRules[j].selectorText != selector) continue;
            cssStyles = "";
            for (let k = 0; k < style.length; k++) {
              let name = style[k];
              let value = style.getPropertyValue(name);
              if (name.startsWith("--bs-btn-")) {
                for (v in vars) {
                  if (value == vars[v]) {
                    cssVars[name] = v;
                    cssStyles += name + ":var(" + v + ");\n";
                  }
                }
              }
            }
            if (cssStyles) {
              css += cssRules[j].selectorText + "{\n";
              css += cssStyles;
              css += "}\n";
            }
          } catch (error) { }
        }
      } catch (error) { }
    }
    return cssVars;
  },

  init: function (document) {
    Vvveb.Components.render(
      "config/bootstrap",
      "#configuration .component-properties"
    );

    //apply current theme color palette
    //let colors = Vvveb.ColorPaletteManager.getType("color");
    let colors = this.cssVars.color;
    for (const name in colors) {
      let color = colors[name].value;

      if (color[0] == "#" && color.length == 7) {
        //add only valid hex color values 7 char long
        //add color as name to keep values unique
        Vvveb.ColorPalette.add(color, color);
      }
    }
  },
};

Vvveb.Config = {
  components: [],
  blocks: [],
  plugins: [],

  load: function (url = "default.json") {
    $.getJSON(url, function (data) { });
  },
};

// Toggle fullscreen
function launchFullScreen(document) {
  if (document.documentElement.requestFullScreen) {
    if (document.FullScreenElement) document.exitFullScreen();
    else document.documentElement.requestFullScreen();
    //mozilla
  } else if (document.documentElement.mozRequestFullScreen) {
    if (document.mozFullScreenElement) document.mozCancelFullScreen();
    else document.documentElement.mozRequestFullScreen();
    //webkit
  } else if (document.documentElement.webkitRequestFullScreen) {
    if (document.webkitFullscreenElement) document.webkitExitFullscreen();
    else document.documentElement.webkitRequestFullScreen();
    //ie
  } else if (document.documentElement.msRequestFullscreen) {
    if (document.msFullScreenElement) document.msExitFullscreen();
    else document.documentElement.msRequestFullscreen();
  }
}

let fontList = [
  {
    value: "",
    text: "Default",
  },
  {
    value: "Arial, Helvetica, sans-serif",
    text: "Arial",
  },
  {
    value: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
    text: "Lucida Grande",
  },
  {
    value: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    text: "Palatino Linotype",
  },
  {
    value: "'Times New Roman', Times, serif",
    text: "Times New Roman",
  },
  {
    value: "Georgia, serif",
    text: "Georgia, serif",
  },
  {
    value: "Tahoma, Geneva, sans-serif",
    text: "Tahoma",
  },
  {
    value: "'Comic Sans MS', cursive, sans-serif",
    text: "Comic Sans",
  },
  {
    value: "Verdana, Geneva, sans-serif",
    text: "Verdana",
  },
  {
    value: "Impact, Charcoal, sans-serif",
    text: "Impact",
  },
  {
    value: "'Arial Black', Gadget, sans-serif",
    text: "Arial Black",
  },
  {
    value: "'Trebuchet MS', Helvetica, sans-serif",
    text: "Trebuchet",
  },
  {
    value: "'Courier New', Courier, monospace",
    text: "Courier New",
  },
  {
    value: "'Brush Script MT', sans-serif",
    text: "Brush Script",
  },
];

// Custom modification - (9.7.25)

// Hide by default on page load
document.getElementById("edit-link-btn").style.display = "none";

// Check for selection change (using polling for broad compatibility)

// Custom Modification - Jayanti Changes - Commented out for hide link button custom
// setInterval(function () {
//   var selected = Vvveb?.Builder?.selectedEl;
//   var editBtn = document.getElementById("edit-link-btn");
//   if (selected && selected.tagName === "A") {
//     editBtn.style.display = "inline-block";
//   } else {
//     editBtn.style.display = "none";
//   }
// }, 300); // adjust interval as needed

// document
//   .getElementById("edit-link-btn")
//   .addEventListener("click", function (e) {
//     e.preventDefault();
//     var selected = Vvveb.Builder.selectedEl;
//     var linkInput = document.getElementById("popup-link-input");
//     var linkTarget = document.getElementById("popup-link-target");
//     //var linkTargetContainer = document.getElementById('popup-link-target-container');
//     if (!selected) return;

//     // Only for buttons/links
//     if (selected && selected.tagName === "A") {
//       linkInput.value = selected.getAttribute("href") || "";
//       linkTarget.checked = selected.getAttribute("target") === "_blank";
//       document.getElementById("link-popup").style.display = "block";

//       setTimeout(() => {
//         linkInput.focus();
//       }, 150);
//     }
//   });

// document.getElementById("save-link-btn").addEventListener("click", function () {
//   var selected = Vvveb.Builder.selectedEl;
//   var linkInput = document.getElementById("popup-link-input");
//   var linkTarget = document.getElementById("popup-link-target");

//   if (selected && selected.tagName === "A") {
//     // Amit's code changes here start for the link record storing
//     const oldHref = selected.getAttribute("href") ?? null;
//     const oldTarget = selected.getAttribute("target") ?? null;
//     // Amit's code changes here ends for the link record storing

//     selected.setAttribute("href", linkInput.value);
//     // Amit's code changes here starts for the link record storing
//     // Set new href and record mutation
//     selected.setAttribute("href", linkInput.value);
//
// Vvveb.Undo.addMutation({
//       type: "attributes",
//       target: selected,
//       attributeName: "href",
//       oldValue: oldHref,
//       newValue: linkInput.value,
//     });
//     // Amit's code changes here ends for the link record storing

//     if (linkTarget.checked) {
//       selected.setAttribute("target", "_blank");
//       // Amit's code changes here starts for the link record storing
//
// Vvveb.Undo.addMutation({
//         type: "attributes",
//         target: selected,
//         attributeName: "target",
//         oldValue: oldTarget,
//         newValue: "_blank",
//       });
//       // Amit's code changes here edns for the link record storing
//     } else {
//       selected.removeAttribute("target");
//       // Amit's code changes here starts for the link record storing
//
// Vvveb.Undo.addMutation({
//         type: "attributes",
//         target: selected,
//         attributeName: "target",
//         oldValue: oldTarget,
//         newValue: null, // will be interpreted as removal by Undo.restore
//       });
//       // Amit's code changes here ends for the link record storing
//     }
//   }
//   document.getElementById("link-popup").style.display = "none";
// });

// document
//   .getElementById("close-link-popup")
//   .addEventListener("click", function () {
//     document.getElementById("link-popup").style.display = "none";
//   });

// Optional: Pressing Enter in input also saves
// document
//   .getElementById("popup-link-input")
//   .addEventListener("keydown", function (e) {
//     if (e.key === "Enter") {
//       document.getElementById("save-link-btn").click();
//     }
//   });

// Hide on load
document.getElementById("edit-image-btn").style.display = "none";

// Check selection every 300ms
// Custom Modification - Jayanti Changes - Commented out for hide img button custom
// setInterval(function () {
//   var selected = Vvveb?.Builder?.selectedEl;
//   var imgBtn = document.getElementById("edit-image-btn");
//   if (!imgBtn) return;
//   if (selected && selected.tagName === "IMG") {
//     imgBtn.style.display = "inline-block";
//   } else {
//     imgBtn.style.display = "none";
//   }
// }, 300);

document
  .getElementById("edit-image-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    var selected = Vvveb.Builder.selectedEl;
    if (selected && selected.tagName === "IMG") {
      // Ensure modal is initialized (plugin-media.js handles this, but safe to check)
      if (!Vvveb.MediaModal) {
        Vvveb.MediaModal = new MediaModal(true);
        Vvveb.MediaModal.mediaPath = window.mediaPath;
      }
      // Open modal, use callback to set the src on the selected image
      //Current changes : 13-2-26 start
      Vvveb.MediaModal.open(null, function (imageData) {
        const payload =
          typeof imageData === "string" ? { src: imageData } : imageData || {};
        if (selected && selected.tagName === "IMG" && payload.src) {
          // selected.setAttribute("src", payload.src);
          // Amit's code changes here starts for the link record storing
          const oldSrc = selected.getAttribute("src") ?? null;
          const hadTitle = selected.hasAttribute("title");
          const oldTitle = selected.getAttribute("title");
          const hadDesc = selected.hasAttribute("data-media-description");
          const oldDesc = selected.getAttribute("data-media-description");
          selected.setAttribute("src", payload.src);
          if (payload.alt !== undefined)
            selected.setAttribute("alt", payload.alt || "");
          if (hadTitle) {
            selected.setAttribute("title", oldTitle || "");
          } else {
            selected.removeAttribute("title");
          }
          if (hadDesc) {
            selected.setAttribute("data-media-description", oldDesc || "");
          } else {
            selected.removeAttribute("data-media-description");
          }
          console.log("Called attributes on 7498");

          Vvveb.Undo.addMutation({
            type: "attributes",
            target: selected,
            attributeName: "src",
            oldValue: oldSrc,
            newValue: payload.src,
          });

          //Current changes : 13-2-26 ends
          // Amit's code changes here ends for the link record storing
        }
      });
    } else {
      alert("Please select an image element to edit.");
    }
  });

function updateToolbarIcons() {
  var selected = Vvveb.Builder.selectedEl;
  var imgIcon = document.getElementById("edit-image-btn");
  if (!imgIcon) return;
  if (selected && selected.tagName === "IMG") {
    imgIcon.style.display = "inline-block";
  } else {
    imgIcon.style.display = "none";
  }
}
document.addEventListener("vvveb.selectNode", updateToolbarIcons);

// Pull options from the actual component property
const CONTAINER_TYPE_OPTIONS = [
  { value: "container", text: "Default" },
  { value: "container-fluid", text: "Fluid" },
];

// This array must come from your actual builder config:
const CONTAINER_BG_OPTIONS = [
  { value: "", text: "Default" },
  { value: "bg-primary", text: "Primary" },
  { value: "bg-secondary", text: "Secondary" },
  { value: "bg-success", text: "Success" },
  { value: "bg-danger", text: "Danger" },
  { value: "bg-warning", text: "Warning" },
  { value: "bg-info", text: "Info" },
  { value: "bg-light-subtle", text: "Light" },
  { value: "bg-dark", text: "Dark" },
  { value: "bg-white", text: "White" },
];

// Renders the selects with the same options as the sidebar
function renderContainerPopupFields() {
  let typeSelect = document.getElementById("container-type");
  let bgSelect = document.getElementById("container-bg");
  typeSelect.innerHTML = CONTAINER_TYPE_OPTIONS.map(
    (o) => `<option value="${o.value}">${o.text}</option>`
  ).join("");
  bgSelect.innerHTML = CONTAINER_BG_OPTIONS.map(
    (o) => `<option value="${o.value}">${o.text}</option>`
  ).join("");
}

// Hide on load
document.getElementById("edit-container-btn").style.display = "none";

setInterval(function () {
  var selected = window.Vvveb && Vvveb.Builder && Vvveb.Builder.selectedEl;
  var btn = document.getElementById("edit-container-btn");
  if (!btn) return;

  if (
    selected &&
    (selected.classList.contains("container") ||
      selected.classList.contains("container-fluid"))
  ) {
    // btn.style.display = "inline-block";        // Amit has commented this
    btn.style.display = "none";
  } else {
    btn.style.display = "none";
  }
}, 300);

// Open popup and sync with selected container's current values
function openContainerPopup(containerNode) {
  renderContainerPopupFields();

  let classes = Array.from(containerNode.classList);

  // Set Type
  let type = classes.find((c) => c === "container" || c === "container-fluid");
  document.getElementById("container-type").value = type || "container";

  // Set Background
  let bg = classes.find((c) =>
    CONTAINER_BG_OPTIONS.some((opt) => opt.value === c)
  );
  document.getElementById("container-bg").value = bg || "";

  document.getElementById("container-popup").style.display = "block";
  document.getElementById("container-popup")._target = containerNode;
}

// Save
document.getElementById("container-save-btn").onclick = function () {
  var popup = document.getElementById("container-popup");
  var node = popup._target;
  if (!node) return;

  // Remove only "container" and "container-fluid" and all background classes
  node.className = node.className
    .split(" ")
    .filter(
      (c) =>
        c !== "container" &&
        c !== "container-fluid" &&
        !CONTAINER_BG_OPTIONS.some((opt) => opt.value === c)
    )
    .join(" ");

  // Add selected type
  let type = document.getElementById("container-type").value;
  if (type) node.classList.add(type);

  // Add selected background
  let bg = document.getElementById("container-bg").value;
  if (bg) node.classList.add(bg);

  // Mark builder dirty and sync
  if (
    window.Vvveb &&
    Vvveb.Builder &&
    typeof Vvveb.Builder.setDirty === "function"
  ) {
    Vvveb.Builder.setDirty(true);
  }
  if (
    window.Vvveb &&
    Vvveb.Builder &&
    typeof Vvveb.Builder.selectElement === "function"
  ) {
    Vvveb.Builder.selectElement(node);
  }

  popup.style.display = "none";
  popup._target = null;
};

// Cancel
document.getElementById("container-cancel-btn").onclick = function () {
  var popup = document.getElementById("container-popup");
  popup.style.display = "none";
  popup._target = null;
};

// Trigger button
// document.getElementById("edit-container-btn").onclick = function () {
//   var selected = window.Vvveb && Vvveb.Builder && Vvveb.Builder.selectedEl;
//   if (
//     selected &&
//     (selected.classList.contains("container") ||
//       selected.classList.contains("container-fluid"))
//   ) {
//     openContainerPopup(selected);
//   } else {
//     alert("Please select a container in the builder first!");
//   }
// };

// Locate where you handle the pencil button click
document
  .getElementById("section-edit-pencil")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // 1. Get the current selected element from the Builder
    // let node = Vvveb.Builder.selectedEl;

    // // 2. If nothing is selected, try to find the element currently being hovered
    // // (since the pencil usually appears on hover)
    // if (!node && Vvveb.Builder.highlightEl) {
    //   node = Vvveb.Builder.highlightEl;
    // }

    // 3. Ensure we are editing a section or footer
    // const targetSection = node ? node.closest("section, footer") : null;
    const targetSection = hoveredSection;

    if (targetSection) {
      // Force the builder to select this node so SectionEditor has context
      Vvveb.Builder.selectNode(targetSection);
      Vvveb.SectionEditor.edit(targetSection);
    } else {
      // Optional: Provide feedback if no section is found
      Vvveb.SectionEditor.destroy();
      console.warn("No section found to edit.");
    }
  });

Vvveb.SectionEditor = {
  isActive: false,
  element: null,
  oldStyles: {},
  _gradientPreviewOriginalStyle: null,

  edit: function (element) {
    if (!["section", "footer"].includes(element.tagName.toLowerCase())) return;

    this.element = element;
    this.isActive = true;

    // Save old values for undo
    this.oldStyles = {
      backgroundColor: element.style.backgroundColor,
      backgroundImage: element.style.backgroundImage,
    };

    this._gradientPreviewOriginalStyle = null;
    this.updatePreview();

    //  Jayanti updates here 12-12-25
    this._gradientPreviewOriginalStyle = null;
    this.updatePreview();

    var computed = window.getComputedStyle(element);
    var bgImage = computed.backgroundImage || "";
    var bgColor = computed.backgroundColor || "";

    var modeLabel = document.getElementById("section-bg-mode-label");
    var imgInfo = document.getElementById("section-bg-selected-info");
    var colorInput = document.getElementById("section-bg-color");

    // default state
    if (modeLabel) modeLabel.textContent = "None";
    if (imgInfo) imgInfo.textContent = "No image selected.";

    // 1️⃣  GRADIENT ACTIVE?
    if (
      bgImage &&
      bgImage !== "none" &&
      bgImage.indexOf("linear-gradient(") !== -1
    ) {
      if (modeLabel) modeLabel.textContent = "Gradient";

      // Expect string like:
      // linear-gradient(180deg, rgba(...), rgba(...))
      var match = bgImage.match(
        /linear-gradient\(\s*([-\d.]+)deg\s*,\s*(rgba?\([^)]*\))[^,]*,\s*(rgba?\([^)]*\))/
      );

      if (match) {
        var angleVal = parseInt(match[1], 10) || 180;
        var rgba1 = match[2];
        var rgba2 = match[3];

        var c1 = _rgbaToHexAlpha(rgba1);
        var c2 = _rgbaToHexAlpha(rgba2);

        var c1Input = document.getElementById("section-grad-c1");
        var c1Alpha = document.getElementById("section-grad-c1a");
        var c2Input = document.getElementById("section-grad-c2");
        var c2Alpha = document.getElementById("section-grad-c2a");
        var ang = document.getElementById("section-grad-angle");

        if (c1Input && c1.hex) c1Input.value = c1.hex;
        if (c1Alpha) c1Alpha.value = c1.alpha;
        if (c2Input && c2.hex) c2Input.value = c2.hex;
        if (c2Alpha) c2Alpha.value = c2.alpha;
        if (ang) ang.value = angleVal;

        var evt = new Event("input", { bubbles: true });
        c1Alpha && c1Alpha.dispatchEvent(evt);
        c2Alpha && c2Alpha.dispatchEvent(evt);
        ang && ang.dispatchEvent(evt);
      }

      // 2️⃣  IMAGE ACTIVE?
    } else if (bgImage && bgImage !== "none") {
      if (modeLabel) modeLabel.textContent = "Image";
      if (imgInfo) imgInfo.textContent = "Image selected";

      // 3️⃣  SOLID COLOR ACTIVE?
    } else if (
      bgColor &&
      bgColor !== "rgba(0, 0, 0, 0)" &&
      bgColor !== "transparent"
    ) {
      if (modeLabel) modeLabel.textContent = "Color";

      var hex = _rgbToHex(bgColor);
      if (colorInput && hex) {
        colorInput.value = hex;
      }
    } else {
      if (modeLabel) modeLabel.textContent = "None";
    }
    //  Jayanti updates Ends here 12-12-25
    // Set UI values
    // Amit's code changes are here for the rgb issue hex color changing
    // Convert int 0..255 to two-digit hex
    function toHex(byte) {
      const v = Math.max(0, Math.min(255, Math.round(byte)));
      return ("0" + v.toString(16)).slice(-2);
    }

    // Blend rgba color over a white background and return {r,g,b}
    function compositeOverWhite(r, g, b, a) {
      // a in 0..1
      const invA = 1 - a;
      return {
        r: Math.round(r * a + 255 * invA),
        g: Math.round(g * a + 255 * invA),
        b: Math.round(b * a + 255 * invA),
      };
    }

    // Parse rgb(...) or rgba(...) or return null
    function parseRgbString(str) {
      if (!str || typeof str !== "string") return null;
      const m = str.match(
        /rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})(?:\s*,\s*([0-9]*\.?[0-9]+))?\s*\)/i
      );
      if (!m) return null;
      const r = parseInt(m[1], 10);
      const g = parseInt(m[2], 10);
      const b = parseInt(m[3], 10);
      const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
      return { r, g, b, a };
    }

    // Convert various color inputs to #rrggbb (best-effort)
    function colorValueToHex(value) {
      if (!value) return "#ffffff";
      value = value.trim();

      // already hex #rgb or #rrggbb -> normalize to #rrggbb
      if (/^#([0-9a-f]{3}){1,2}$/i.test(value)) {
        if (value.length === 4) {
          // expand #rgb -> #rrggbb
          const r = value[1],
            g = value[2],
            b = value[3];
          return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
        }
        return value.toLowerCase();
      }

      // rgb / rgba
      const parsed = parseRgbString(value);
      if (parsed) {
        let { r, g, b, a } = parsed;
        if (a === undefined || a === null) a = 1;
        if (a < 1) {
          const comp = compositeOverWhite(r, g, b, a);
          r = comp.r;
          g = comp.g;
          b = comp.b;
        }
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toLowerCase();
      }

      // named colors (basic fallback): set on an offscreen element and compute
      try {
        const tmp = document.createElement("div");
        tmp.style.color = value;
        document.body.appendChild(tmp);
        const cs = getComputedStyle(tmp).color;
        document.body.removeChild(tmp);
        const p = parseRgbString(cs);
        if (p) return `#${toHex(p.r)}${toHex(p.g)}${toHex(p.b)}`.toLowerCase();
      } catch (e) {
        /* ignore */
      }

      // last resort
      return "#ffffff";
    }
    const backRawForUI = Vvveb.StyleManager.getStyle(element, "background");
    document.getElementById("section-bg-color").value =
      colorValueToHex(backRawForUI);
    // document.getElementById("section-bg-color").value =
    //   Vvveb.StyleManager.getStyle(element, "background") || "#ffffff";
    // Amit's code changes are here for the rgb issue hex color changing

    // document.getElementById("section-edit-pencil").style.display = "block";
    // document.getElementById("section-editor").style.display = "none";
    // document.getElementById("section-replace-btn").style.display = "block";
  },

  applyColor: function (color) {
    if (!this.element) return;

    var el = this.element;
    var oldStyle = el.getAttribute("style") || "";

    el.style.backgroundImage = "";
    el.style.background = "";
    el.style.background = color;

    if (Vvveb.Undo && Vvveb.Undo.addMutation) {
      Vvveb.Undo.addMutation({
        type: "attributes",
        target: el,
        attributeName: "style",
        oldValue: oldStyle,
        newValue: el.getAttribute("style") || "",
      });
    }

    this.updatePreview();
  },

  applyImage: function (file) {
    if (!this.element) return;

    let reader = new FileReader();
    reader.onload = (e) => {
      const el = this.element;
      const doc = el.ownerDocument;
      _ensureSectionOverlayCSS(doc);
      const oldStyle = el.getAttribute("style") || "";
      const oldClass = el.className;

      // 🔴 purana gradient / color / image hatao
      el.style.backgroundImage = "";
      el.style.background = "";
      el.style.backgroundColor = "";

      // ✅ ab sirf image lagao
      el.style.backgroundImage = "url('" + e.target.result + "')";
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";

      //   if (!el.classList.contains("vvv-section-has-bg")) {
      //     el.classList.add("vvv-section-has-bg");
      //   }

      // Undo snapshot (same as pehle)
      if (Vvveb.Undo && Vvveb.Undo.addMutation) {
        Vvveb.Undo.addMutation({
          type: "attributes",
          target: el,
          attributeName: "style",
          oldValue: oldStyle,
          newValue: el.getAttribute("style") || "",
        });

        Vvveb.Undo.addMutation({
          type: "attributes",
          target: el,
          attributeName: "class",
          oldValue: oldClass,
          newValue: el.className,
        });
      }
    };
    reader.readAsDataURL(file);
  },

  applyImageFromMedia: function (imgUrl) {
    if (!this.element || !imgUrl) return;

    if (typeof imgUrl === "object" && imgUrl.url) {
      imgUrl = imgUrl.url;
    }

    const el = this.element;
    const oldStyle = el.getAttribute("style") || "";
    const oldClass = el.className;

    el.style.backgroundImage = "";
    el.style.background = "";
    el.style.backgroundColor = "";

    el.style.backgroundImage = "url('" + imgUrl + "')";
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";

    // if (el.classList.contains("vvv-section-has-bg") === false) {
    //   el.classList.add("vvv-section-has-bg");
    // }

    if (Vvveb.Undo && Vvveb.Undo.addMutation) {
      if (oldStyle != (el.getAttribute("style") || "")) {
        Vvveb.Undo.addMutation({
          type: "attributes",
          target: el,
          attributeName: "style",
          oldValue: oldStyle,
          newValue: el.getAttribute("style") || "",
        });
      }
      if (oldClass != el.className) {
        Vvveb.Undo.addMutation({
          type: "attributes",
          target: el,
          attributeName: "class",
          oldValue: oldClass,
          newValue: el.className,
        });
      }
    }

    Vvveb.SectionEditor.updatePreview();
    if (Vvveb?.Builder?.setDirty) Vvveb.Builder.setDirty(true);
  },

  applyGradient: function (opts) {
    if (!this.element) return;

    opts = opts || {};
    var recordUndo = opts.recordUndo === true;

    var el = this.element;

    if (!recordUndo) {
      if (this._gradientPreviewOriginalStyle == null) {
        this._gradientPreviewOriginalStyle = el.getAttribute("style") || "";
      }
    }
    var oldStyle;
    if (recordUndo) {
      if (this._gradientPreviewOriginalStyle != null) {
        oldStyle = this._gradientPreviewOriginalStyle;
      } else {
        oldStyle = el.getAttribute("style") || "";
      }
    } else {
      oldStyle = el.getAttribute("style") || "";
    }

    el.style.backgroundImage = "";
    el.style.background = "";
    el.style.backgroundColor = "";

    var c1 =
      (document.getElementById("section-grad-c1") || {}).value || "#000000";
    var a1 =
      parseInt(
        (document.getElementById("section-grad-c1a") || {}).value || "60",
        10
      ) / 100;
    var c2 =
      (document.getElementById("section-grad-c2") || {}).value || "#000000";
    var a2 =
      parseInt(
        (document.getElementById("section-grad-c2a") || {}).value || "0",
        10
      ) / 100;
    var angle = parseInt(
      (document.getElementById("section-grad-angle") || {}).value || "180",
      10
    );

    var rgba1 = _hexToRgba(c1, a1);
    var rgba2 = _hexToRgba(c2, a2);

    var grad =
      "linear-gradient(" + angle + "deg, " + rgba1 + " 0%, " + rgba2 + " 100%)";

    el.style.backgroundImage = grad;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";

    if (Vvveb.Undo && Vvveb.Undo.addMutation && recordUndo) {
      if (oldStyle != (el.getAttribute("style") || "")) {
        Vvveb.Undo.addMutation({
          type: "attributes",
          target: el,
          attributeName: "style",
          oldValue: oldStyle,
          newValue: el.getAttribute("style") || "",
        });
      }
      this._gradientPreviewOriginalStyle = null;
    }
    this.updatePreview();
  },

  clearGradient: function () {
    if (!this.element) return;

    var el = this.element;
    var oldStyle = el.getAttribute("style") || "";

    // agar backgroundImage hai tabhi clear karo
    if (!el.style.backgroundImage) return;

    // ✅ sirf gradient/background image hata do
    el.style.backgroundImage = "";

    if (Vvveb.Undo && Vvveb.Undo.addMutation) {
      if (oldStyle != (el.getAttribute("style") || "")) {
        Vvveb.Undo.addMutation({
          type: "attributes",
          target: el,
          attributeName: "style",
          oldValue: oldStyle,
          newValue: el.getAttribute("style") || "",
        });
      }
    }
  },

  updatePreview: function () {
    if (!this.element) return;

    var el = this.element;
    var computed = window.getComputedStyle(el);
    var bgImage = computed.backgroundImage || "";
    var bgColor = computed.backgroundColor || "";

    var modeLabel = document.getElementById("section-bg-mode-label");
    var preview = document.getElementById("section-bg-preview");
    var details = document.getElementById("section-bg-details");

    function resetPreview() {
      if (modeLabel) modeLabel.textContent = "None";
      if (preview) {
        preview.style.backgroundImage = "none";
        preview.style.backgroundColor = "transparent";
      }
      if (details) details.textContent = "None";
    }

    if (!modeLabel && !preview && !details) return;

    // default
    resetPreview();

    // 1) GRADIENT?
    if (
      bgImage &&
      bgImage !== "none" &&
      bgImage.indexOf("linear-gradient(") !== -1
    ) {
      if (modeLabel) modeLabel.textContent = "Gradient";

      if (preview) {
        preview.style.backgroundImage = bgImage;
        preview.style.backgroundColor = "transparent";
      }

      // Gradient details (angle + colors)
      var info = "Gradient";

      var match = bgImage.match(
        /linear-gradient\(\s*([-\d.]+)deg\s*,\s*(rgba?\([^)]*\))[^,]*,\s*(rgba?\([^)]*\))/
      );

      if (match) {
        var angleVal = parseInt(match[1], 10) || 180;
        var rgba1 = match[2];
        var rgba2 = match[3];

        var c1 = _rgbaToHexAlpha(rgba1);
        var c2 = _rgbaToHexAlpha(rgba2);

        info =
          angleVal +
          "° • " +
          c1.hex.toUpperCase() +
          " → " +
          c2.hex.toUpperCase();
      }

      if (details) details.textContent = info;
      return;
    }

    // 2) IMAGE?
    if (bgImage && bgImage !== "none") {
      if (modeLabel) modeLabel.textContent = "Image";

      var urlMatch = bgImage.match(/url\(["']?(.*?)["']?\)/);
      if (preview) {
        if (urlMatch && urlMatch[1]) {
          preview.style.backgroundImage = 'url("' + urlMatch[1] + '")';
          preview.style.backgroundColor = "#f5f5f5";
        } else {
          preview.style.backgroundImage = "none";
          preview.style.backgroundColor = "#f5f5f5";
        }
      }

      if (details) details.textContent = "Background image";
      return;
    }

    // 3) SOLID COLOR?
    if (
      bgColor &&
      bgColor !== "rgba(0, 0, 0, 0)" &&
      bgColor !== "transparent"
    ) {
      var hex = _rgbToHex(bgColor) || bgColor;

      if (modeLabel) modeLabel.textContent = "Color";
      if (preview) {
        preview.style.backgroundImage = "none";
        preview.style.backgroundColor = hex;
      }
      if (details) details.textContent = hex.toUpperCase();
      return;
    }

    resetPreview();
  },

  // destroy: function () {
  //   document.getElementById("section-edit-pencil").style.display = "none";
  //   document.getElementById("section-editor").style.display = "none";
  //   document.getElementById("section-replace-btn").style.display = "none";
  //   this.isActive = false;
  //   this.element = null;
  // },
  destroy: function () {
    // Amit has added this and commented upper
    // Hide/remove all pencils inside the iframe
    // try {
    //   const iframe = document.getElementById("iframe1");
    //   if (iframe && iframe.contentDocument) {
    //     const doc = iframe.contentDocument;
    //     doc
    //       .querySelectorAll("#section-edit-pencil")
    //       .forEach((btn) => btn.remove());
    //   }
    // } catch (e) {
    //   console.warn("SectionEditor.destroy: could not clean iframe pencils", e);
    // }

    // Hide Section Editor panel UI
    const editorPanel = document.getElementById("section-editor");
    const sectionEditOptions = document.getElementById("section-edit-options");

    if (editorPanel) {
      editorPanel.style.display = "none";
      sectionEditOptions.style.display = "block";
    }

    this.isActive = false;
    this.element = null;
    this._gradientPreviewOriginalStyle = null;
  },
};

// Custom Modification - Jayanti Changes - Commented out for not close section editor by itself
// document.addEventListener("click", (e) => {
//   if (!e.target.closest("#section-editor, #section-edit-pencil, .mymediagallery")) {
//     Vvveb.SectionEditor.destroy();
//   }
// });

window.addEventListener("blur", () => {
  if (document.activeElement.tagName === "IFRAME") {
    Vvveb.SectionEditor.destroy();
  }
});

Vvveb.SectionPadding = {
  pdstyles: `
  .pt0{padding-top:0px !important}.pb0{padding-bottom:0px !important}.pt8{padding-top:8px !important}.pb8{padding-bottom:8px !important}.pt16{padding-top:16px !important}.pb16{padding-bottom:16px !important}.pt24{padding-top:24px !important}.pb24{padding-bottom:24px !important}.pt32{padding-top:32px !important}.pb32{padding-bottom:32px !important}.pt40{padding-top:40px !important}.pb40{padding-bottom:40px !important}.pt48{padding-top:48px !important}.pb48{padding-bottom:48px !important}.pt56{padding-top:56px !important}.pb56{padding-bottom:56px !important}.pt64{padding-top:64px !important}.pb64{padding-bottom:64px !important}.pt72{padding-top:72px !important}.pb72{padding-bottom:72px !important}.pt80{padding-top:80px !important}.pb80{padding-bottom:80px !important}.pt88{padding-top:88px !important}.pb88{padding-bottom:88px !important}.pt96{padding-top:96px !important}.pb96{padding-bottom:96px !important}.pt104{padding-top:104px !important}.pb104{padding-bottom:104px !important}.pt112{padding-top:112px !important}.pb112{padding-bottom:112px !important}.pt120{padding-top:120px !important}.pb120{padding-bottom:120px !important}.pt128{padding-top:128px !important}.pb128{padding-bottom:128px !important}.pt136{padding-top:136px !important}.pb136{padding-bottom:136px !important}.pt144{padding-top:144px !important}.pb144{padding-bottom:144px !important}.pt152{padding-top:152px !important}.pb152{padding-bottom:152px !important}.pt160{padding-top:160px !important}.pb160{padding-bottom:160px !important}.pt168{padding-top:168px !important}.pb168{padding-bottom:168px !important}.pt176{padding-top:176px !important}.pb176{padding-bottom:176px !important}.pt184{padding-top:184px !important}.pb184{padding-bottom:184px !important}.pt192{padding-top:192px !important}.pb192{padding-bottom:192px !important}.pt200{padding-top:200px !important}.pb200{padding-bottom:200px !important}.pt208{padding-top:208px !important}.pb208{padding-bottom:208px !important}.pt216{padding-top:216px !important}.pb216{padding-bottom:216px !important}.pt224{padding-top:224px !important}.pb224{padding-bottom:224px !important}.pt232{padding-top:232px !important}.pb232{padding-bottom:232px !important}.pt240{padding-top:240px !important}.pb240{padding-bottom:240px !important}.pt248{padding-top:248px !important}.pb248{padding-bottom:248px !important}.pt256{padding-top:256px !important}.pb256{padding-bottom:256px !important}
  @media (max-width:768px){.pt40{padding-top:32px !important}.pb40{padding-bottom:32px !important}.pt48{padding-top:40px !important}.pb48{padding-bottom:40px !important}.pt56{padding-top:48px !important}.pb56{padding-bottom:48px !important}.pt64{padding-top:56px !important}.pb64{padding-bottom:56px !important}.pt72{padding-top:64px !important}.pb72{padding-bottom:64px !important}.pt80{padding-top:64px !important}.pb80{padding-bottom:64px !important}.pt88{padding-top:72px !important}.pb88{padding-bottom:72px !important}.pt96{padding-top:80px !important}.pb96{padding-bottom:80px !important}.pt104{padding-top:88px !important}.pb104{padding-bottom:88px !important}.pt112{padding-top:96px !important}.pb112{padding-bottom:96px !important}.pt120{padding-top:104px !important}.pb120{padding-bottom:104px !important}.pt128{padding-top:104px !important}.pb128{padding-bottom:104px !important}.pt136{padding-top:112px !important}.pb136{padding-bottom:112px !important}.pt144{padding-top:120px !important}.pb144{padding-bottom:120px !important}.pt152{padding-top:128px !important}.pb152{padding-bottom:128px !important}.pt160{padding-top:128px !important}.pb160{padding-bottom:128px !important}.pt168{padding-top:136px !important}.pb168{padding-bottom:136px !important}.pt176{padding-top:144px !important}.pb176{padding-bottom:144px !important}.pt184{padding-top:152px !important}.pb184{padding-bottom:152px !important}.pt192{padding-top:152px !important}.pb192{padding-bottom:152px !important}.pt200{padding-top:160px !important}.pb200{padding-bottom:160px !important}.pt208{padding-top:168px !important}.pb208{padding-bottom:168px !important}.pt216{padding-top:176px !important}.pb216{padding-bottom:176px !important}.pt224{padding-top:176px !important}.pb224{padding-bottom:176px !important}.pt232{padding-top:184px !important}.pb232{padding-bottom:184px !important}.pt240{padding-top:192px !important}.pb240{padding-bottom:192px !important}.pt248{padding-top:200px !important}.pb248{padding-bottom:200px !important}.pt256{padding-top:200px !important}.pb256{padding-bottom:200px !important}}
  @media (max-width:576px){.pt40{padding-top:24px !important}.pb40{padding-bottom:24px !important}.pt48{padding-top:24px !important}.pb48{padding-bottom:24px !important}.pt56{padding-top:32px !important}.pb56{padding-bottom:32px !important}.pt64{padding-top:32px !important}.pb64{padding-bottom:32px !important}.pt72{padding-top:40px !important}.pb72{padding-bottom:40px !important}.pt80{padding-top:40px !important}.pb80{padding-bottom:40px !important}.pt88{padding-top:48px !important}.pb88{padding-bottom:48px !important}.pt96{padding-top:48px !important}.pb96{padding-bottom:48px !important}.pt104{padding-top:56px !important}.pb104{padding-bottom:56px !important}.pt112{padding-top:56px !important}.pb112{padding-bottom:56px !important}.pt120{padding-top:64px !important}.pb120{padding-bottom:64px !important}.pt128{padding-top:64px !important}.pb128{padding-bottom:64px !important}.pt136{padding-top:72px !important}.pb136{padding-bottom:72px !important}.pt144{padding-top:72px !important}.pb144{padding-bottom:72px !important}.pt152{padding-top:80px !important}.pb152{padding-bottom:80px !important}.pt160{padding-top:80px !important}.pb160{padding-bottom:80px !important}.pt168{padding-top:88px !important}.pb168{padding-bottom:88px !important}.pt176{padding-top:88px !important}.pb176{padding-bottom:88px !important}.pt184{padding-top:96px !important}.pb184{padding-bottom:96px !important}.pt192{padding-top:96px !important}.pb192{padding-bottom:96px !important}.pt200{padding-top:104px !important}.pb200{padding-bottom:104px !important}.pt208{padding-top:104px !important}.pb208{padding-bottom:104px !important}.pt216{padding-top:112px !important}.pb216{padding-bottom:112px !important}.pt224{padding-top:112px !important}.pb224{padding-bottom:112px !important}.pt232{padding-top:120px !important}.pb232{padding-bottom:120px !important}.pt240{padding-top:120px !important}.pb240{padding-bottom:120px !important}.pt248{padding-top:128px !important}.pb248{padding-bottom:128px !important}.pt256{padding-top:128px !important}.pb256{padding-bottom:128px !important}}
`,

  init: function () {
    const self = this;
    const iframe = document.querySelector("#iframe-wrapper iframe");
    if (!iframe) return false;

    const startAction = (e) => {
      const isMouse = e.type === 'mousedown';
      if (isMouse && e.button !== 0) return;

      if (e.target.classList.contains("padding-top-button") ||
        e.target.classList.contains("padding-bottom-button")) {
        if (e.type === 'touchstart') e.preventDefault();

        // temporary code starts from here
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const head = iframeDoc.head || iframeDoc.querySelector("head");

        if (!head) return;

        if (!this.checkStylesExist("#iframe-wrapper iframe", "pd-dynamic-styles")) {
          const pdlink = document.createElement('style');
          pdlink.id = "pd-dynamic-styles";
          pdlink.innerHTML = self.pdstyles;
          head.appendChild(pdlink);
        }
        // temporary code ends here

        self.startDrag(e);
      }
    };
    document.addEventListener("mousedown", startAction);
    document.addEventListener("touchstart", startAction, { passive: false });
  },

  startDrag: function (e) {
    const isTop = e.target.classList.contains("padding-top-button");
    const section = hoveredSection;
    const oldClasses = section.getAttribute("class") || "";
    if (!section) return;

    const iframe = document.querySelector("#iframe-wrapper iframe");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    section.classList.add("padding-dragging");
    const startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
    const startPadding = this.getCurrentPadding(section, isTop);

    const onMouseMove = (moveEvent) => {
      let currentY;
      let eventY = moveEvent.type.includes('touch') ?
        moveEvent.touches[0].clientY :
        moveEvent.clientY;

      if (moveEvent.target.ownerDocument !== document) {
        const rect = iframe.getBoundingClientRect();
        currentY = eventY + rect.top;
      } else {
        currentY = eventY;
      }

      const MIN_PADDING = 8; // Smallest class step
      const MAX_PADDING = 256;
      const STEP = 8;        // each step increment (8px)

      const deltaY = currentY - startY;
      let newValue = startPadding + deltaY;

      // Snap to the nearest 8px increment
      newValue = Math.round(newValue / STEP) * STEP;

      if (newValue < MIN_PADDING) newValue = MIN_PADDING;
      if (newValue > MAX_PADDING) newValue = MAX_PADDING;

      this.applyPaddingClass(section, isTop, newValue);
      this.syncEditorOverlay();
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onMouseMove);
      iframeDoc.removeEventListener("mousemove", onMouseMove);
      iframeDoc.removeEventListener("touchmove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onMouseUp);
      iframeDoc.removeEventListener("mouseup", onMouseUp);
      iframeDoc.removeEventListener("touchend", onMouseUp);

      section.classList.remove("padding-dragging");
      document.body.style.userSelect = "";

      // Add to Undo History using classes
      Vvveb.Undo.addMutation({
        type: "attributes",
        target: section,
        attributeName: "class",
        oldValue: oldClasses,
        newValue: section.getAttribute("class") || "",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    iframeDoc.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onMouseMove);
    iframeDoc.addEventListener("touchmove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    iframeDoc.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onMouseUp);
    iframeDoc.addEventListener("touchend", onMouseUp);

    document.body.style.userSelect = "none";
  },

  getCurrentPadding: function (el, isTop) {
    // We still use computed style to get the pixel value for drag math
    const style = window.getComputedStyle(el);
    return parseInt(isTop ? style.paddingTop : style.paddingBottom) || 0;
  },

  applyPaddingClass: function (el, isTop, value) {
    const prefix = isTop ? "pt" : "pb";
    const newClass = `${prefix}${value}`;

    // 1. Remove any existing padding classes of the same type (pt* or pb*)
    const regx = new RegExp(`\\b${prefix}\\d+\\b`, "g");
    const currentClasses = el.getAttribute("class") || "";
    const updatedClasses = currentClasses.replace(regx, "").trim();

    el.setAttribute("class", updatedClasses);

    el.classList.add(newClass);

    if (isTop) el.style.paddingTop = "";
    else el.style.paddingBottom = "";
  },

  syncEditorOverlay: function () {
    if (hoveredSection) {
      const rect = hoveredSection.getBoundingClientRect();
      const iframe = document.querySelector("#iframe-wrapper iframe");
      const iframeRect = iframe.getBoundingClientRect();

      const editOptions = document.getElementById("section-edit-options");
      if (editOptions) {
        editOptions.style.height = rect.height + "px";
        editOptions.style.top = (rect.top + window.scrollY) + "px";

        const style = window.getComputedStyle(hoveredSection);
        document.querySelector(".padding-top-button").style.height = style.paddingTop;
        document.querySelector(".padding-bottom-button").style.height = style.paddingBottom;
        document.getElementById("select-box").style.display = "none";
        document.getElementById("highlight-box").style.display = "none";
      }
    }
  },

  // It is only for the temporary ( we can remove this if all the templates configured easily style file )
  checkStylesExist: function (iframeSelector, customStyleId) {
    const iframe = document.querySelector(iframeSelector);
    if (!iframe) return false;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    const links = iframeDoc.querySelectorAll('link[rel="stylesheet"]');
    const assetExists = Array.from(links).some(link =>
      link.href.includes("web.assets_frontend.min.css")
    );

    if (assetExists) {
      return true;
    } else {
      const customStyle = iframeDoc.getElementById(customStyleId);
      return !!customStyle;
    }
  }
};

Vvveb.SectionPadding.init();

Vvveb.FormEditor = {
  modal: "#form-editor-modal",
  targetForm: null,
  fields: [],
  submitButton: null,
  dragIndex: null,
  dragPlaceholder: null,

  init() {
    this.bindEvents();
    document.addEventListener("mousedown", (e) => {
      const modal = document.querySelector(this.modal);
      const modalDialog = document.querySelector(".vvv-form-modal__dialog");
      if (!modal || modal.style.display !== "flex") return;

      if (!modalDialog.contains(e.target)) {
        this.close(true); // revert + close
      }
    });
  },
  open(form) {
    if (!form || form.tagName !== "FORM") return;

    ensureVvvebId(form);

    this.targetForm = form;

    // 🔒 Snapshot original HTML
    this._originalHTML = form.innerHTML;

    this.fields = this.buildFields(form);
    this.submitButton = this.buildSubmitButton(form);
    this.render();

    document.querySelector(this.modal).style.display = "flex";
  },

  buildFields(form) {
    const fields = [];

    form
      .querySelectorAll("div[form-question-zigrow]")
      .forEach((wrapper, index) => {
        const input = wrapper.querySelector("input, textarea, select");
        if (!input) return;

        const id = ensureVvvebId(input);
        const labelEl = wrapper.querySelector("label");

        const labelText =
          labelEl?.innerText?.trim() ||
          input.placeholder?.trim() ||
          `Question ${index + 1}`;

        fields.push({
          vvvebId: id,
          wrapper,
          labelEl,
          hasLabel: !!labelEl, // 👈 ADD THIS
          label: labelText,
          type:
            input.tagName === "TEXTAREA" ? "textarea" : input.type || "text",
          required: input.required,
          placeholder: input.placeholder || "",
        });
      });

    return fields;
  },

  buildSubmitButton(form) {
    const submitButton = form.querySelector(
      'button, input[type="submit"], input[type="button"]'
    );

    if (!submitButton) return null;

    const label =
      submitButton.tagName === "INPUT"
        ? submitButton.value || ""
        : submitButton.innerText?.trim() || submitButton.textContent?.trim() || "";

    return {
      label,
      originalLabel: label,
    };
  },

  syncFieldsFromUI() {
    const rows = document.querySelectorAll(".form-field-row[data-index]");

    rows.forEach((row) => {
      const i = +row.dataset.index;
      const f = this.fields[i];

      f.label = row.querySelector(".ff-label")?.value || "";
      f.placeholder = row.querySelector(".ff-placeholder")?.value || "";
      f.type = row.querySelector(".ff-type")?.value || "text";
      f.required = row.querySelector(".ff-required")?.checked || false;
    });

    this.syncSubmitButtonFromUI();
  },

  syncSubmitButtonFromUI() {
    if (!this.submitButton) return;

    const submitLabelInput = document.querySelector(".ff-submit-label");
    if (!submitLabelInput) return;

    this.submitButton.label = submitLabelInput.value;
  },

  escapeAttribute(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  },

  render() {
    const wrap = document.getElementById("form-fields-list");
    wrap.innerHTML = "";

    this.fields.forEach((f, i) => {
      const hasLabel = f.hasLabel;

      wrap.insertAdjacentHTML(
        "beforeend",
        `
<div class="form-field-row ${f.expanded ? " is-expanded" : "is-collapsed"
        }" data-index="${i}">

  <div class="field-header">
    <div class="field-header-left-part">
      <div class="field-move d-flex align-items-center justify-center me-2" draggable="true">
        <i class="fa-solid fa-grip-vertical to-drag-que"></i>
      </div>
      <div class="field-title">
        <div class="field-title-label">${f.label || f.placeholder || "Untitled question"
        }</div>
        <div class="answer-title-type">Answer: ${f.type || "Not defined"}</div>
      </div>
    </div>
    <div class="field-meta">
      <span class="ff-expand-question">
  ${f.expanded ? "Close" : "Edit"}
</span>
      <!-- Delete -->
      <div class="delete-field" style="grid-area: box-5;">
        <button class="ff-delete" aria-label="Delete" data-bs-original-title="Delete"><span class="d-none d-sm-inline" style="margin-right: 4px;">Remove</span><i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  </div>

  <div class="field-body">
    <!-- Question text (virtual label text) -->
    <div class="label-field-parent mb-2">
      <div class="label-field" style="grid-area: box-1;">
        <label>Label:</label>
        <input class="ff-label" value="${f.label}" placeholder="Question" ${hasLabel ? "" : "disabled"
        } />
      </div>

      <!-- Label control -->
      <div class="label-control-field" style="grid-area: box-7;">
        <label class="label-toggle">
          <input type="checkbox" class="ff-has-label" style="height: 40px;" ${hasLabel ? "checked" : ""
        } />
          <span>Show label</span>
        </label>
      </div>
    </div>

    <div class="input-field-parent">
      <!-- Placeholder -->
      <div class="placeholder-field" style="grid-area: box-4;">
        <label>Input placeholder:</label>
        <input class="ff-placeholder" value="${f.placeholder
        }" placeholder="Placeholder" />
      </div>

      <!-- Type -->
      <div class="type-field" style="grid-area: box-2;">
        <label>Input type:</label>
        <select class="ff-type" style="width: 100%;">
          ${["text", "email", "tel", "number", "textarea", "date", "time"]
          .map(
            (t) =>
              `<option value="${t}" ${t === f.type ? "selected" : ""
              }>${t}</option>`
          )
          .join("")}
        </select>
      </div>
    </div>

    <!-- Required -->
    <div class="required-field">
      <span class="required-label ms-auto me-0">
        <span>
            <span class="info-popup">
              <i class="fa-regular fa-circle-question make-required-icon"></i>
              <span class="make-required">Make this field mandatory</span>
              <span class="make-required-arrow-box"></span>
            </span>
        </span>
      Required</span>

      <label class="required-switch">
        <input type="checkbox" class="ff-required" ${f.required ? "checked" : ""
        } />
        <span class="required-slider"></span>
      </label>
    </div>

  </div>
</div>
  `
      );
    });

    if (this.submitButton) {
      wrap.insertAdjacentHTML(
        "beforeend",
        `
<div class="form-field-row form-submit-row is-expanded" data-kind="submit-button">
  <div class="field-header">
    <div class="field-header-left-part">
      <div class="field-title">
        <div class="field-title-label">Form button</div>
        <div class="answer-title-type">Edit the button text shown at the bottom of the form</div>
      </div>
    </div>
  </div>

  <div class="field-body">
    <div class="label-field-parent mb-2">
      <div class="label-field" style="grid-area: box-1;">
        <label>Button text:</label>
        <input class="ff-submit-label" value="${this.escapeAttribute(
          this.submitButton.label
        )}" placeholder="Submit" />
      </div>
    </div>
  </div>
</div>
  `
      );
    }
  },

  slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  },

  bindEvents() {
    document.addEventListener("click", (e) => {
      if (e.target.matches("#form-editor-update")) {
        this.apply();
        this.close(false);
      }

      if (
        e.target.matches("#form-editor-cancel") ||
        e.target.matches("#form-editor-close")
      ) {
        this.close(true);
      }

      if (e.target.matches("#form-add-field")) {
        this.syncFieldsFromUI();
        this.addQuestion();
      }

      const infoPopup = e.target.closest(".info-popup");

      if (infoPopup) {
        // close others
        document.querySelectorAll(".info-popup.active").forEach((p) => {
          if (p !== infoPopup) p.classList.remove("active");
        });

        infoPopup.classList.toggle("active");

        return; // ← IMPORTANT: just return, don't stop propagation
      }
      // click outside → close all
      document
        .querySelectorAll(".info-popup.active")
        .forEach((p) => p.classList.remove("active"));

      // Toggle label via checkbox
      if (e.target.classList.contains("ff-has-label")) {
        const row = e.target.closest(".form-field-row");
        const i = +row.dataset.index;
        const f = this.fields[i];

        f.hasLabel = e.target.checked;

        if (e.target.classList.contains("ff-has-label")) {
          const row = e.target.closest(".form-field-row");
          const i = +row.dataset.index;
          const f = this.fields[i];

          // 🔐 Save current UI state BEFORE toggling
          this.syncFieldsFromUI();

          f.hasLabel = e.target.checked;

          this.render();
        }

        this.render();
      }

      // Move up
      const moveUpBtn = e.target.closest(".ff-move-up");
      if (moveUpBtn) {
        this.syncFieldsFromUI();

        const row = moveUpBtn.closest(".form-field-row");
        const i = +row.dataset.index;
        if (i === 0) return;

        [this.fields[i - 1], this.fields[i]] = [
          this.fields[i],
          this.fields[i - 1],
        ];

        this.render();
      }

      // Move down
      const moveDownBtn = e.target.closest(".ff-move-down");
      if (moveDownBtn) {
        this.syncFieldsFromUI();

        const row = moveDownBtn.closest(".form-field-row");
        const i = +row.dataset.index;
        if (i === this.fields.length - 1) return;

        [this.fields[i + 1], this.fields[i]] = [
          this.fields[i],
          this.fields[i + 1],
        ];

        this.render();
      }

      // Delete question (DOM + modal)
      const deleteBtn = e.target.closest(".ff-delete");
      if (deleteBtn) {
        this.syncFieldsFromUI();
        const i = +e.target.closest(".form-field-row").dataset.index;
        this.fields.splice(i, 1);
        this.render();
      }

      // Expand / collapse question (toggle)
      const header = e.target.closest(".ff-expand-question");
      if (header) {
        const row = header.closest(".form-field-row");
        const index = +row.dataset.index;

        this.syncFieldsFromUI();

        const isCurrentlyExpanded = this.fields[index].expanded;

        // collapse all first
        this.fields.forEach((f) => (f.expanded = false));

        // toggle clicked one
        this.fields[index].expanded = !isCurrentlyExpanded;

        this.render();
        return;
      }
    });

    document.addEventListener("dragstart", (e) => {
      const handle = e.target.closest(".field-move");
      if (!handle) return; // 🔥 ignore everything else

      const row = e.target.closest(".form-field-row[data-index]");
      if (!row) return;

      this.dragIndex = +row.dataset.index;
      row.classList.add("dragging");

      // Create placeholder
      this.dragPlaceholder = document.createElement("div");
      this.dragPlaceholder.className = "drag-placeholder";
      row.after(this.dragPlaceholder);
    });

    document.addEventListener("dragover", (e) => {
      const row = e.target.closest(".form-field-row[data-index]");
      if (!row || !this.dragPlaceholder) return;

      e.preventDefault();

      const rect = row.getBoundingClientRect();
      const shouldInsertAfter = e.clientY > rect.top + rect.height / 2;

      if (shouldInsertAfter) {
        row.after(this.dragPlaceholder);
      } else {
        row.before(this.dragPlaceholder);
      }
    });

    // Inside bindEvents()
    document.addEventListener("touchstart", (e) => {
      const handle = e.target.closest(".field-move");
      if (!handle) return;

      // Prevent scrolling while dragging
      // e.preventDefault(); 

      const row = e.target.closest(".form-field-row[data-index]");
      if (!row) return;

      this.dragIndex = +row.dataset.index;
      row.classList.add("dragging");

      this.dragPlaceholder = document.createElement("div");
      this.dragPlaceholder.className = "drag-placeholder";
      row.after(this.dragPlaceholder);
    }, { passive: false });

    document.addEventListener("touchmove", (e) => {
      if (!this.dragPlaceholder || this.dragIndex === null) return;

      // Prevent page scroll
      e.preventDefault();

      const touch = e.touches[0];
      // Get the element currently under the finger
      const targetEl = document.elementFromPoint(touch.clientX, touch.clientY);
      const row = targetEl?.closest(".form-field-row[data-index]");

      if (row && row !== this.dragPlaceholder) {
        const rect = row.getBoundingClientRect();
        const shouldInsertAfter = touch.clientY > rect.top + rect.height / 2;

        if (shouldInsertAfter) {
          row.after(this.dragPlaceholder);
        } else {
          row.before(this.dragPlaceholder);
        }
      }
    }, { passive: false });

    document.addEventListener("touchend", (e) => {
      if (this.dragIndex !== null) {
        const row = document.querySelector(".form-field-row[data-index].dragging");
        if (!row) {
          this.cleanupDrag();
          return;
        }

        if (!this.dragPlaceholder || this.dragIndex === null) {
          this.cleanupDrag();
          return;
        }

        const list = document.getElementById("form-fields-list");
        const children = [...list.children];

        const placeholderIndex = children.indexOf(this.dragPlaceholder);

        // 🔥 FIX: compensate for dragged item still in DOM
        const dropIndex =
          placeholderIndex > this.dragIndex
            ? placeholderIndex - 1
            : placeholderIndex;

        this.syncFieldsFromUI();

        const [moved] = this.fields.splice(this.dragIndex, 1);
        this.fields.splice(dropIndex, 0, moved);

        this.cleanupDrag();
        this.render();

        list.addEventListener("dragover", (e) => {
          e.preventDefault(); // 🔑 allow drop
          e.dataTransfer.dropEffect = "move";
        });
        this.handleDrop();
      }
    });

    document.addEventListener("dragend", () => {
      const row = document.querySelector(".form-field-row[data-index].dragging");
      if (!row) {
        this.cleanupDrag();
        return;
      }

      if (!this.dragPlaceholder || this.dragIndex === null) {
        this.cleanupDrag();
        return;
      }

      const list = document.getElementById("form-fields-list");
      const children = [...list.children];

      const placeholderIndex = children.indexOf(this.dragPlaceholder);

      // 🔥 FIX: compensate for dragged item still in DOM
      const dropIndex =
        placeholderIndex > this.dragIndex
          ? placeholderIndex - 1
          : placeholderIndex;

      this.syncFieldsFromUI();

      const [moved] = this.fields.splice(this.dragIndex, 1);
      this.fields.splice(dropIndex, 0, moved);

      this.cleanupDrag();
      this.render();
    });

    const list = document.getElementById("form-fields-list");

    list.addEventListener("dragover", (e) => {
      e.preventDefault(); // 🔑 allow drop
      e.dataTransfer.dropEffect = "move";
    });
  },

  addQuestion() {
    this.syncFieldsFromUI();
    this.fields.forEach((f) => (f.expanded = false));

    this.fields.push({
      vvvebId: null,
      isNew: true,
      label: "New Question",
      type: "text",
      placeholder: "Enter your answer",
      required: false,
      hasLabel: true,
      expanded: true,
    });

    this.render();

    requestAnimationFrame(() => {
      this.scrollToLastField();
    });
  },

  cleanupDrag() {
    document
      .querySelector(".form-field-row[data-index].dragging")
      ?.classList.remove("dragging");

    this.dragPlaceholder?.remove();
    this.dragPlaceholder = null;
    this.dragIndex = null;
  },

  scrollToLastField() {
    const wrap = document.getElementById("form-fields-list");
    const lastRow = Array.from(
      wrap.querySelectorAll(".form-field-row[data-index]")
    ).pop();
    lastRow?.scrollIntoView({ behavior: "smooth", block: "end" });
  },

  apply() {
    this.syncFieldsFromUI();

    // --- UNDO INTEGRATION START ---
    const form = this.targetForm;
    const oldHTML = form.innerHTML; // Capture state before change

    this.updateFormDOM(); // Perform the update

    const newHTML = form.innerHTML; // Capture state after change

    // Record mutation if there's a difference
    if (oldHTML !== newHTML && Vvveb.Undo) {
      Vvveb.Undo.addMutation({
        type: "characterData",
        target: form,
        oldValue: oldHTML,
        newValue: newHTML,
      });
    }

    this.updateFormDOM();
  },

  updateFormDOM() {
    const form = this.targetForm;

    // Preserve the submit button before clearing the form
    const submitBtn = form.querySelector(
      'button, input[type="submit"], input[type="button"]'
    );

    form.innerHTML = "";

    // Track used names to ensure uniqueness within this form instance
    const usedNames = new Set();

    this.fields.forEach((f) => {
      const wrapper = document.createElement("div");
      wrapper.setAttribute("form-question-zigrow", "");

      if (f.hasLabel) {
        const label = document.createElement("label");
        label.innerText = f.label || "Label";
        wrapper.appendChild(label);
      }

      let el =
        f.type === "textarea"
          ? document.createElement("textarea")
          : document.createElement("input");

      if (el.tagName === "INPUT") {
        el.type = f.type;

        if (f.type === "tel") {
          el.setAttribute("inputmode", "tel");
          el.setAttribute("pattern", "^\\+?[0-9\\s\\-]{7,15}$");
          el.setAttribute(
            "title",
            "Enter a valid phone number (with optional country code)"
          );
          el.placeholder = f.placeholder || "+91 98765 43210";
        }
      }

      el.placeholder = f.placeholder || "";
      el.required = f.required;

      // --- UNIQUE NAME LOGIC START ---
      const baseName =
        f.hasLabel && f.label ? f.label : f.placeholder || "field";
      let slug = this.slugify(baseName);
      let uniqueName = slug;
      let counter = 1;

      // If the name is already used, append a number until it's unique
      while (usedNames.has(uniqueName)) {
        uniqueName = `${slug}-${counter}`;
        counter++;
      }

      usedNames.add(uniqueName);
      el.name = uniqueName;
      // --- UNIQUE NAME LOGIC END ---

      ensureVvvebId(el);
      wrapper.appendChild(el);

      form.appendChild(wrapper);
    });

    if (submitBtn && this.submitButton) {
      const hasButtonTextChanged =
        this.submitButton.label !== this.submitButton.originalLabel;

      if (hasButtonTextChanged) {
        if (submitBtn.tagName === "INPUT") {
          submitBtn.value = this.submitButton.label;
        } else {
          submitBtn.textContent = this.submitButton.label;
        }
      }
    }

    if (submitBtn) form.appendChild(submitBtn);
  },

  close(revert = false) {
    if (revert && this.targetForm && this._originalHTML) {
      this.targetForm.innerHTML = this._originalHTML;
    }

    document.querySelector(this.modal).style.display = "none";
    this.targetForm = null;
    this.fields = [];
    this.submitButton = null;
    this._originalHTML = null;
  },
};

// form edit commented
Vvveb.FormEditor.init();

document.getElementById("form-edit-btn").addEventListener("click", (e) => {
  const form = hoveredForm;
  if (!form) return;
  Vvveb.FormEditor.open(form);
});

// Background color
document
  .getElementById("section-bg-color")
  .addEventListener("change", function () {
    Vvveb.SectionEditor.applyColor(this.value);
    SectionRecentColors.add(this.value);
    renderSectionRecentColors();
  });

// Background image
document
  .getElementById("section-bg-upload")
  .addEventListener("change", function () {
    if (this.files && this.files[0]) {
      Vvveb.SectionEditor.applyImage(this.files[0]);
    }
  });

// Custom Modification - Jayanti - 31-10-25
// Background image via Media Gallery
(function () {
  const btn = document.getElementById("section-bg-gallery-btn");
  const info = document.getElementById("section-bg-selected-info");
  const clear = document.getElementById("section-bg-clear-btn");

  function setInfo(msg) {
    if (info) info.textContent = msg || "No image selected.";
  }

  btn?.addEventListener("click", function () {
    try {
      if (!window.Vvveb.MediaModal) {
        Vvveb.MediaModal = new MediaModal(true);
        Vvveb.MediaModal.mediaPath = window.mediaPath;
      }
      //Current changes : 13-2-26 start
      Vvveb.MediaModal.open(null, function (imgData) {
        const payload =
          typeof imgData === "string" ? { src: imgData } : imgData || {};
        const imgUrl = payload.src;
        if (!imgUrl) return;

        //Current changes : 13-2-26 ends
        // Apply to the currently edited section
        Vvveb.SectionEditor.applyImageFromMedia(imgUrl);

        try {
          const short = imgUrl.split("/").pop();
          setInfo(short || imgUrl);
        } catch (e) {
          setInfo(imgUrl);
        }
      });
    } catch (e) {
      setInfo("Media gallery not available");
    }
  });

  clear?.addEventListener("click", function (e) {
    e.preventDefault();
    const el = Vvveb.SectionEditor?.element;
    if (!el) return;

    const oldStyle = el.getAttribute("style") || "";
    el.style.removeProperty("background-image");

    if (info) info.textContent = "No image selected.";

    if (Vvveb?.Undo?.addMutation) {
      console.log("Called attributes on 8076");

      Vvveb.Undo.addMutation({
        type: "attributes",
        target: el,
        attributeName: "style",
        oldValue: oldStyle,
        newValue: el.getAttribute("style") || "",
      });
    }
    if (Vvveb?.Builder?.setDirty) Vvveb.Builder.setDirty(true);
  });
})();
// Undo/Redo
document.getElementById("section-undo-btn").onclick = function () {
  Vvveb.SectionEditor.destroy();
  Vvveb.Undo.undo();
};
document.getElementById("section-redo-btn").onclick = function () {
  Vvveb.SectionEditor.destroy();
  Vvveb.Undo.redo();
};

// Close
document.getElementById("section-close-btn").onclick = function () {
  Vvveb.SectionEditor.destroy();
};

document
  .getElementById("section-edit-pencil")
  .addEventListener("click", function () {
    document.getElementById("section-edit-options").style.display = "none";
    document.getElementById("section-editor").style.display = "block";
  });

// Gradient UI live labels + LIVE PREVIEW with single undo
(function () {
  var c1 = document.getElementById("section-grad-c1");
  var a1 = document.getElementById("section-grad-c1a");
  var c2 = document.getElementById("section-grad-c2");
  var a2 = document.getElementById("section-grad-c2a");
  var ang = document.getElementById("section-grad-angle");
  var ov = document.getElementById("section-grad-overlay");

  function updateLabels() {
    if (a1) {
      var v1 = parseInt(a1.value || "0", 10);
      var l1 = document.getElementById("section-grad-c1a-val");
      if (l1) l1.textContent = v1 + "%";
    }
    if (a2) {
      var v2 = parseInt(a2.value || "0", 10);
      var l2 = document.getElementById("section-grad-c2a-val");
      if (l2) l2.textContent = v2 + "%";
    }
    if (ang) {
      var va = parseInt(ang.value || "0", 10);
      var la = document.getElementById("section-grad-angle-val");
      if (la) la.textContent = va + "°";
    }
  }

  function preview() {
    if (!Vvveb.SectionEditor || !Vvveb.SectionEditor.element) return;
    Vvveb.SectionEditor.applyGradient({ recordUndo: false });
  }

  function commit() {
    if (!Vvveb.SectionEditor || !Vvveb.SectionEditor.element) return;
    Vvveb.SectionEditor.applyGradient({ recordUndo: true });
  }

  function bindRange(el, withLabel) {
    if (!el) return;

    // Slider drag karte waqt live preview
    el.addEventListener("input", function () {
      if (withLabel) updateLabels();
      preview();
    });

    // Mouse chhodte hi / value final hote hi commit + undo snapshot
    el.addEventListener("change", function () {
      if (withLabel) updateLabels();
      commit();
    });
  }

  function bindColor(el) {
    if (!el) return;
    // Color picker drag -> preview
    el.addEventListener("input", preview);
    // Color chosen -> commit
    el.addEventListener("change", commit);
  }

  function bindOverlay(el) {
    if (!el) return;
    // Toggle change -> directly commit (Undo ke saath)
    el.addEventListener("change", commit);
  }

  // Bind controls
  bindRange(a1, true);
  bindRange(a2, true);
  bindRange(ang, true);
  bindColor(c1);
  bindColor(c2);
  bindOverlay(ov);

  // Apply + Clear buttons (agar rakhne hain)
  var applyBtn = document.getElementById("section-grad-apply");
  if (applyBtn)
    applyBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      commit();
    });

  var clearBtn = document.getElementById("section-grad-clear");
  if (clearBtn)
    clearBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      Vvveb.SectionEditor.clearGradient();
    });

  // Initial label sync
  updateLabels();
})();

// ---- helpers for gradient ----
function _hexToRgba(hex, alpha) {
  if (!hex) hex = "#000000";
  hex = hex.replace("#", "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map(function (c) {
        return c + c;
      })
      .join("");
  var r = parseInt(hex.substr(0, 2), 16);
  var g = parseInt(hex.substr(2, 2), 16);
  var b = parseInt(hex.substr(4, 2), 16);
  var a = isNaN(alpha) ? 1 : Math.max(0, Math.min(1, alpha));
  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}

// Helpers for recognize gradient, color
function _rgbToHex(rgbString) {
  if (!rgbString) return null;

  // "rgb(255, 0, 128)" ya "rgba(255, 0, 128, 0.8)"
  var parts = rgbString.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return null;

  var r = parseInt(parts[0], 10);
  var g = parseInt(parts[1], 10);
  var b = parseInt(parts[2], 10);

  function toHex(v) {
    v = Math.max(0, Math.min(255, v || 0));
    var h = v.toString(16);
    return h.length === 1 ? "0" + h : h;
  }

  return "#" + toHex(r) + toHex(g) + toHex(b);
}

function _rgbaToHexAlpha(rgbaString) {
  if (!rgbaString) {
    return { hex: "#000000", alpha: 100 };
  }

  var nums = rgbaString.match(/[\d.]+/g);
  if (!nums || nums.length < 3) {
    return { hex: "#000000", alpha: 100 };
  }

  var r = parseInt(nums[0], 10) || 0;
  var g = parseInt(nums[1], 10) || 0;
  var b = parseInt(nums[2], 10) || 0;
  var a = nums[3] !== undefined ? parseFloat(nums[3]) : 1;

  function toHex(v) {
    v = Math.max(0, Math.min(255, v || 0));
    var h = v.toString(16);
    return h.length === 1 ? "0" + h : h;
  }

  var hex = "#" + toHex(r) + toHex(g) + toHex(b);
  var alphaPercent = Math.round(a * 100);

  return { hex: hex, alpha: alphaPercent };
}

//Custom Modification Ends Here - Jayanti - 09-09-2025

// ---- helpers for Image overlay ----
function _ensureSectionOverlayCSS(doc) {
  if (!doc) return;
  if (doc.getElementById("vvv-overlay-section-bg-css")) return; // already added

  const style = doc.createElement("style");
  style.id = "vvv-overlay-section-bg-css";
  style.textContent = `
    /* more specific selector + stacking isolation */
    section.vvv-section-has-bg, 
    footer.vvv-section-has-bg {
      position: relative !important;
      background-size: cover !important;
      background-position: center !important;
      isolation: isolate;
      z-index: 0;
    }
    section.vvv-section-has-bg::before ,
    footer.vvv-section-has-bg::before {
      content: "";                /* REQUIRED for pseudo-element */
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.5);/* default overlay */
      pointer-events: none;
      z-index: 1;
    }
    section.vvv-section-has-bg > * ,
    footer.vvv-section-has-bg > * {
      position: relative;
      z-index: 2;
    }
  `;
  doc.head.appendChild(style);
}

(function () {
  const c1 = document.getElementById("section-grad-c1");
  const a1 = document.getElementById("section-grad-c1a");
  const c2 = document.getElementById("section-grad-c2");
  const a2 = document.getElementById("section-grad-c2a");
  const ang = document.getElementById("section-grad-angle");
  const chip = document.getElementById("section-grad-preview-mini");
  const big = document.getElementById("section-grad-preview");
  const angVal = document.getElementById("section-grad-angle-val");
  const a1Val = document.getElementById("section-grad-c1a-val");
  const a2Val = document.getElementById("section-grad-c2a-val");
  const ov = document.getElementById("section-grad-overlay");
  const ovTxt = document.getElementById("se-overlay-text");

  function grad() {
    const _c1 = c1?.value || "#000000";
    const _a1 = parseInt(a1?.value || "60", 10) / 100;
    const _c2 = c2?.value || "#000000";
    const _a2 = parseInt(a2?.value || "0", 10) / 100;
    const _ang = parseInt(ang?.value || "180", 10);
    return {
      css: `linear-gradient(${_ang}deg, ${_hexToRgba(
        _c1,
        _a1
      )} 0%, ${_hexToRgba(_c2, _a2)} 100%)`,
      ang: _ang,
    };
  }
  function paint() {
    const g = grad();
    if (chip) chip.style.backgroundImage = g.css;
    if (big) {
      big.style.backgroundImage = g.css;
      big.setAttribute("data-label", g.ang + "°");
    }
    if (angVal) angVal.textContent = g.ang + "°";
    if (a1Val) a1Val.textContent = parseInt(a1.value || "0", 10) + "%";
    if (a2Val) a2Val.textContent = parseInt(a2.value || "0", 10) + "%";
    if (ovTxt) ovTxt.textContent = ov && ov.checked ? "On" : "Off";
  }
  ["input", "change"].forEach((e) => {
    c1?.addEventListener(e, paint);
    a1?.addEventListener(e, paint);
    c2?.addEventListener(e, paint);
    a2?.addEventListener(e, paint);
    ang?.addEventListener(e, paint);
    ov?.addEventListener(e, paint);
  });
  paint();
})();

Vvveb.Builder.updateAddBtnLabel = Vvveb.Builder.updateAddBtnLabel;

function updateSliderFill(slider) {
  const min = +slider.min || 0;
  const max = +slider.max || 100;
  const val = +slider.value || 0;
  const pct = ((val - min) / (max - min)) * 100;
  // WebKit: first gradient ka width % me set
  slider.style.backgroundSize = pct + "% var(--track-h)";
}

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll(
    '#section-editor input[type="range"]'
  );
  sliders.forEach((s) => {
    updateSliderFill(s);
    s.addEventListener("input", () => updateSliderFill(s));
    s.addEventListener("change", () => updateSliderFill(s));
  });
});

(function () {
  const ov = document.getElementById("section-grad-overlay");
  const label = ov ? ov.closest("label.se-toggle") : null;
  const txt = document.getElementById("se-overlay-text");

  function sync() {
    if (!ov || !label) return;
    const on = !!ov.checked;
    label.setAttribute("role", "button");
    label.setAttribute("aria-pressed", String(on));
    label.title = on ? "Overlay: On" : "Overlay: Off";
    if (txt) txt.textContent = on ? "On" : "Off";
  }

  if (ov) {
    sync();
    ov.addEventListener("change", sync);
    ov.addEventListener("input", sync);
  }
})();

// Recent Section Bg Colors
const SectionRecentColors = {
  key: "zigrow.sectionRecentBgColors",
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.key)) || [];
    } catch (e) {
      return [];
    }
  },

  set(arr) {
    localStorage.setItem(this.key, JSON.stringify(arr));
  },
  add(color) {
    if (!color) return;
    let arr = this.get().filter((c) => c !== color);
    arr.unshift(color);
    if (arr.length > 10) arr = arr.slice(0, 8);
    this.set(arr);
  },
};

// Recent Colors Preset
function renderSectionRecentColors() {
  const wrap = document.getElementById("section-recent-colors");
  if (!wrap) return;
  wrap.innerHTML = "";
  SectionRecentColors.get().forEach((c) => {
    const colorBtn = document.createElement("button");
    colorBtn.type = "button";
    colorBtn.className = "se-swatch";
    colorBtn.title = c;
    colorBtn.style.background = c;
    colorBtn.setAttribute("aria-label", c);
    colorBtn.addEventListener("click", () => {
      const input = document.getElementById("section-bg-color");
      if (!input) input.value = c;
      Vvveb.SectionEditor.applyColor(c);
      SectionRecentColors.add(c);
      renderSectionRecentColors();
    });
    wrap.appendChild(colorBtn);
  });
}

// Section Replacement - Jayanti
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("section-replace-btn");
  if (!btn) console.log("section reaplce btn doesn't exist");

  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const el = hoveredSection;
    if (!el) return;

    const cat = _sectionCategoryFromEl(el);

    const modal = document.getElementById("insert-modal");
    modal._replaceTarget = el;

    (window.InsertPanel || Vvveb.InsertPanel).open("blocks");

    const once = () => {
      document.removeEventListener("vvveb.insertpanel.blocksReady", once);
      const list = document.getElementById("block-cat-list");
      if (!list) return;

      list.querySelectorAll("li[data-cat]").forEach((li) => {
        li.style.display = "";
      });

      const chosen = (cat || "all").toLowerCase();

      let target =
        list.querySelector(`li[data-cat="${chosen}"]`) ||
        list.querySelector(`li[data-cat='all']`);

      if (target) {
        list
          .querySelectorAll("li[data-cat]")
          .forEach((li) => li.classList.remove("active"));
        target.classList.add("active");

        setTimeout(() => {
          target.click();
        }, 0);
      } else {
        const first = list.querySelector(`li[data-cat]`);
        if (first) {
          first.classList.add("active");
          setTimeout(() => {
            first.click();
          }, 0);
        }
      }
    };

    document.addEventListener("vvveb.insertpanel.blocksReady", once);
  });
});

function refreshSwiperIfRequired(element) {
  if (!element) return;
  const swiperContainer = element.closest(".swiper");
  if (swiperContainer && swiperContainer.swiper) {
    reindexSwiper(swiperContainer);
    updateAddSlideBtnState(swiperContainer);
    swiperContainer.swiper.update();
    if (swiperContainer.swiper.pagination) {
      swiperContainer.swiper.pagination.render();
      swiperContainer.swiper.pagination.update();
    }
  }
}

function reindexSwiper(swiperContainer) {
  const wrapper = swiperContainer.querySelector(".swiper-wrapper");
  const pagination = swiperContainer.querySelector(".swiper-pagination");

  const remainingSlides = Array.from(wrapper.children).filter(
    (el) =>
      el.classList.contains("swiper-slide") &&
      !el.hasAttribute("data-vvveb-helpers")
  );

  // Update Slide attributes
  remainingSlides.forEach((slide, i) => {
    slide.setAttribute("data-swiper-slide-index", i);
    slide.setAttribute("aria-label", `${i + 1} / ${remainingSlides.length}`);
  });

  // Update Pagination Bullet attributes
  if (pagination) {
    const bullets = pagination.querySelectorAll(".swiper-pagination-bullet");
    bullets.forEach((bullet, i) => {
      bullet.setAttribute("aria-label", `Go to slide ${i + 1}`);
    });
  }

  // Refresh the Swiper JS instance
  if (swiperContainer.swiper) {
    swiperContainer.swiper.update();
  }
}

// === Properties modal helper (open for any node) ===
function openPropsModalFor(node) {
  if (!node) return;

  // Select node + compute component
  Vvveb.Builder.selectNode(node);
  Vvveb.TreeList?.selectComponent?.(node);
  Vvveb.Builder.loadNodeComponent(node); // sets Vvveb.component + selectedComponent

  // Temporarily point component properties panel to the modal body
  const prevTarget = Vvveb.Components.componentPropertiesElement;
  const modalSel = "#props-modal .component-properties";
  Vvveb.Components.componentPropertiesElement = modalSel;

  // Render currently selected component into the modal
  Vvveb.Components.render(Vvveb.Builder.selectedComponent, modalSel);

  // Restore default target for sidebar
  Vvveb.Components.componentPropertiesElement = prevTarget;

  // Optional: nicer modal title
  try {
    const [label, tag] = Vvveb.Builder._getElementType(node);
    document.getElementById("props-modal-title").textContent =
      Vvveb.component?.name || label || "Properties";
  } catch (e) { }

  // Show modal
  const modalEl = document.getElementById("props-modal");
  const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
  bsModal.show();
}
document
  .getElementById("open-props-btn")
  ?.addEventListener("click", function (e) {
    e.preventDefault();
    const el = Vvveb?.Builder?.selectedEl;
    if (el) openPropsModalFor(el);
  });

Vvveb.LinkEditor = {
  el: null,
  modal: null,
  fieldsWrap: null,
  actionSel: null,
  styleSheet: null,
  _lastBgFromUser: null,

  // for keep data of original style
  styleTouched: {
    text: false,
    bg: false,
    hoverText: false,
    hoverBg: false,
    size: false,
    radius: false,
    border: false,
    borderColor: false,
  },

  styleCleared: {
    text: false,
    bg: false,
    hoverText: false,
    hoverBg: false,
    size: false,
    radius: false,
    border: false,
    borderColor: false,
  },
  _resetStyleFlags() {
    this.styleTouched = {
      text: false,
      bg: false,
      hoverText: false,
      hoverBg: false,
      size: false,
      radius: false,
      border: false,
      borderColor: false,
    };
    this.styleCleared = {
      text: false,
      bg: false,
      hoverText: false,
      hoverBg: false,
      size: false,
      radius: false,
      border: false,
      borderColor: false,
    };
  },

  countryCodes: [
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+1", name: "USA", flag: "🇺🇸" },
    { code: "+33", name: "France", flag: "🇫🇷" },
  ],
  init() {
    this.modal = document.getElementById("link-popup");
    if (!this.modal) return;

    if (!this.modal.querySelector("#link-action")) {
      this.modal.innerHTML = `
        <button type="button" class="popup-close" id="link-close-x" aria-label="Close">&times;</button>
        <h3 style="margin:0 0 10px">Link Settings</h3>
        
        <label for="link-action" class="form-label">What do you want this link to do?</label>
        <select id="link-action" class="form-select">
            <option value="url">🌐 Open a web address</option>
            <option value="popup">✨ Create a popup</option>
            <option value="phone">📞 Make a phone call</option>
            <option value="email">✉️ Send an email</option>
            <option value="scroll">⬇️ Scroll to a section</option>
        </select>
            <div class="popup-actions mt-3" style="display:flex; gap:8px; justify-content:flex-end;">
            <button id="link-apply" class="btn btn-primary">Apply</button>
            <button id="link-cancel" class="btn btn-secondary">Cancel</button>
        </div>
    `;
    }

    this.fieldsWrap = this.modal.querySelector("#link-fields");
    this.actionSel = this.modal.querySelector("#link-action");
    this.buttonModeToggle = this.modal.querySelector(
      "#link-as-button-toggle",
    );

    if (this.buttonModeToggle && !this.buttonModeToggle._bound) {
      this.buttonModeToggle._bound = true;

      this.buttonModeToggle.addEventListener("change", (e) => {
        this.pendingButtonMode = !!e.target.checked;
        this.toggleButtonCustomization(this.pendingButtonMode);
      });
    }

    this.actionSel.addEventListener("change", () => {
      this.render(this.actionSel.value);
    });

    this.modal.querySelector("#link-apply").addEventListener("click", (e) => {
      e.preventDefault();
      this.apply();
    });
    const close = () => this.close();
    this.modal.querySelector("#link-cancel").addEventListener("click", close);
    this.modal.querySelector("#link-close-x").addEventListener("click", close);

    this.modal
      .querySelector(".vvv-link-modal__backdrop[data-dismiss='link']")
      .addEventListener("click", close);

    const touch = (key) => {
      if (!this.styleTouched || !this.styleCleared) this._resetStyleFlags();
      this.styleTouched[key] = true;
      this.styleCleared[key] = false;
    };

    const map = [
      ["text", "#link-style-text"],
      ["bg", "#link-style-bg"],
      ["hoverText", "#link-style-hover-text"],
      ["hoverBg", "#link-style-hover-bg"],
      ["size", "#link-style-size"],
      ["radius", "#link-style-radius"],
      ["borderColor", "#link-style-border-color"],
    ];

    map.forEach(([key, sel]) => {
      const input = this.modal.querySelector(sel);
      if (!input) return;

      const markActive = () => {
        touch(key);
        input.classList.remove("is-default");
        const row = input.closest(".vvv-link-style-row");
        if (row) row.classList.remove("is-default");
      };
      input.addEventListener("input", markActive);
      input.addEventListener("change", markActive);
    });

    // Size toggle buttons -
    // function - set hidden input value + active class + styleTouched flag
    const sizeToggle = this.modal.querySelector("#link-size-toggle");
    if (sizeToggle) {
      sizeToggle.querySelectorAll(".vvv-size-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          const val = btn.getAttribute("data-size"); // "1x" / "2x" / "3x"
          const hidden = this.modal.querySelector("#link-style-size");
          if (hidden) hidden.value = val || "";

          // active class update
          sizeToggle
            .querySelectorAll(".vvv-size-option")
            .forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");

          if (!this.styleTouched || !this.styleCleared) {
            this._resetStyleFlags();
          }
          this.styleTouched.size = true;
          this.styleCleared.size = false;
        });
      });
    }

    const inputByKey = {
      text: "#link-style-text",
      bg: "#link-style-bg",
      hoverText: "#link-style-hover-text",
      hoverBg: "#link-style-hover-bg",
      size: "#link-style-size",
      radius: "#link-style-radius",
      borderColor: "#link-style-border-color",
    };

    // Reset Buttons for Button customization
    this.modal.querySelectorAll(".vvv-link-style-reset").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const key = btn.getAttribute("data-style-key");
        console.log("Reset style key:", key);
        if (!key) return;
        if (!this.styleTouched || !this.styleCleared) this._resetStyleFlags();

        this.styleTouched[key] = true;
        this.styleCleared[key] = true;

        // For Better UI
        const sel = inputByKey[key];
        const input = sel && this.modal.querySelector(sel);
        if (input) {
          if (key === "bg") input.value = "#ffffff";
          else if (key === "hoverBg") input.value = "#3730a3";
          else if (key === "radius") input.value = "";
          else if (key === "size") input.value = "";
          else input.value = "#ffffff";

          input.classList.add("is-default");
          const row = input.closest(".vvv-link-style-row");
          if (row) row.classList.add("is-default");
        }

        // size UI reset
        if (key === "size") {
          const toggle = this.modal.querySelector("#link-size-toggle");
          if (toggle) {
            toggle
              .querySelectorAll(".vvv-size-option")
              .forEach((b) => b.classList.remove("is-active"));
          }
        }

        // radius UI reset
        // radius + border reset
        if (key === "radius") {
          const wrap = this.modal.querySelector("#link-radius-options");
          if (wrap) {
            wrap
              .querySelectorAll(".vvv-radius-option")
              .forEach((b) => b.classList.remove("is-active"));
          }

          // hidden values clear
          const radiusHidden = this.modal.querySelector("#link-style-radius");
          const borderHidden = this.modal.querySelector("#link-style-border");
          const borderColorInput = this.modal.querySelector(
            "#link-style-border-color"
          );
          const borderRow = this.modal.querySelector("#link-border-color-row");

          if (radiusHidden) radiusHidden.value = "";
          if (borderHidden) borderHidden.value = "";
          if (borderColorInput) borderColorInput.value = "#000000"; // jo tumhara default hai
          if (borderRow) borderRow.style.display = "none";

          // flags: radius + border + borderColor sabko clear mark karo
          this.styleTouched.radius = true;
          this.styleCleared.radius = true;

          this.styleTouched.border = true;
          this.styleCleared.border = true;

          this.styleTouched.borderColor = true;
          this.styleCleared.borderColor = true;
        }
      });
    });
  },

  open(el) {
    this.el = el;

    this.wasTemporaryLink = this.el.getAttribute("data-temp-link") === "true"
    this.originalLinkHtml = this.el ? this.el.innerHTML : ""
    if (!this.modal) this.init();
    if (!this.modal || !this.el) return;

    const showButtonToggle = this.shouldShowButtonToggle();
    const isActualButton = this.el.hasAttribute("data-btn");
    const isConvertedButton =
      this.el.getAttribute("data-btn-converted") === "true";

    // pending mode for checkbox flow
    this.pendingButtonMode = showButtonToggle ? isConvertedButton : isActualButton;

    if (this.buttonModeToggle) {
      this.buttonModeToggle.checked = isConvertedButton;
    }

    this.toggleButtonModeCheckbox(showButtonToggle);
    this.toggleButtonCustomization(isActualButton);

    // Reset flags here for style Touchd
    this._resetStyleFlags();

    const href = this.el.getAttribute("href") || "";
    let type = "url"; // default

    if (href.startsWith("tel:")) {
      type = "phone";
    } else if (href.startsWith("mailto:")) {
      type = "email";
    } else if (href.startsWith("#")) {
      const id = href.slice(1);
      const doc =
        window.FrameDocument ||
        Vvveb?.Builder?.iframe?.contentDocument ||
        document;
      console.log("jayanti link editor", doc);
      if (id && doc.getElementById(id)) {
        type = "scroll";
      }
    } else if (/\.pdf(?:\?|#|$)/i.test(href)) {
      type = "pdf";
    } else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)/i.test(href)) {
      type = "whatsapp";
    }

    // Detect "land to page" links via data-page-key attribute
    if (this.el.hasAttribute("data-page-key")) {
      type = "page";
    }

    this.actionSel.value = type;
    this.render(type, href);

    const lt = this.modal.querySelector("#link-text");
    if (lt) {
      lt.value = (this.el.textContent || "").trim();
    }

    // ---- Prefill button style fields from element ----
    let bgAttr = this.el.getAttribute("data-btn-bg") || "";
    let colorAttr = this.el.getAttribute("data-btn-color") || "";
    let hBgAttr = this.el.getAttribute("data-btn-hover-bg") || "";
    let hColorAttr = this.el.getAttribute("data-btn-hover-color") || "";
    const size = this.el.getAttribute("data-btn-size") || "";
    const radius = this.el.getAttribute("data-btn-radius") || "";
    let borderColorAttr =
      this.el.getAttribute("data-btn-border-color") || "";
    const borderAttr = this.el.getAttribute("data-btn-border") || "";

    const alreadyButton = this.el.hasAttribute("data-btn");

    // 2. REAL CSS se style lao (computed) only for real buttons
    const cs = alreadyButton ? this._getComputedButtonStyle() : null;

    let computedBg =
      cs && cs.backgroundColor
        ? this._normalizeColor(cs.backgroundColor)
        : "";
    const computedColor =
      cs && cs.color ? this._normalizeColor(cs.color) : "";
    const computedBorderColor =
      cs && cs.borderColor ? this._normalizeColor(cs.borderColor) : "";

    // 2.1 - ORIGINAL base background ka snapshot only for real buttons
    let originalBgAttr = this.el.getAttribute("data-btn-bg-original") || "";

    if (alreadyButton && !originalBgAttr && computedBg) {
      originalBgAttr = computedBg;
      this.el.setAttribute("data-btn-bg-original", originalBgAttr);
      this.el.style.display = "inline-block";
    }

    // 2.2 - ORIGINAL base text color ka snapshot only for real buttons
    let originalColorAttr =
      this.el.getAttribute("data-btn-color-original") || "";

    if (alreadyButton && !originalColorAttr && computedColor) {
      originalColorAttr = computedColor;
      this.el.setAttribute("data-btn-color-original", originalColorAttr);
    }

    // 3. Merge priorities only for already existing buttons
    const bg = alreadyButton ? (bgAttr || originalBgAttr || computedBg || "") : "";
    const color = alreadyButton ? (colorAttr || originalColorAttr || computedColor || "") : "";
    const hBg = alreadyButton ? hBgAttr : "";
    const hColor = alreadyButton ? hColorAttr : "";
    const borderColor = alreadyButton ? (borderColorAttr || computedBorderColor || "") : "";
    const border = alreadyButton ? (borderAttr || "") : "";


    // Debug once (dekhne ke liye kya jaa raha hai inputs me)
    // console.log("[LinkEditor] style merge:", {
    //   bgAttr,
    //   computedBg,
    //   finalBg: bg,
    //   colorAttr,
    //   computedColor,
    //   finalColor: color,
    //   borderColorAttr,
    //   computedBorderColor,
    //   finalBorderColor: borderColor,
    // });

    const selVal = (sel, val, fallback) => {
      const input = this.modal.querySelector(sel);
      if (input) {
        input.value = val || fallback;
      }
    };

    selVal("#link-style-bg", bg, "#ffffff");
    selVal("#link-style-text", color, "#ffffff");
    selVal("#link-style-hover-bg", hBg, "#ffffff");
    selVal("#link-style-hover-text", hColor, "#ffffff");
    selVal("#link-style-size", size, "");
    selVal("#link-style-radius", radius, "");
    selVal("#link-style-border-color", borderColor, "#000000");

    // new helper for default classes of UI
    const markDefault = (selector, hasCustomValue) => {
      const el = this.modal.querySelector(selector);
      if (!el) return;

      const isDefault = !hasCustomValue;
      el.classList.toggle("is-default", isDefault);

      const row = el.closest(".vvv-link-style-row");
      if (row) row.classList.toggle("is-default", isDefault);
    };

    const hasBgUI = !!this.el.getAttribute("data-btn-bg") || !!bg;
    const hasTextUI = !!this.el.getAttribute("data-btn-color") || !!color;
    const hasHoverBgUI =
      !!this.el.getAttribute("data-btn-hover-bg") || !!hBg;
    const hasHoverTextUI =
      !!this.el.getAttribute("data-btn-hover-color") || !!hColor;

    markDefault("#link-style-bg", hasBgUI);
    markDefault("#link-style-text", hasTextUI);
    markDefault("#link-style-hover-bg", hasHoverBgUI);
    markDefault("#link-style-hover-text", hasHoverTextUI);

    // --- Lock base background when hover background changes ---
    // --- Lock base background when hover background changes ---
    const bgInput = this.modal.querySelector("#link-style-bg");
    const hoverBgInput = this.modal.querySelector("#link-style-hover-bg");

    if (bgInput) {
      this._lastBgFromUser = bg || bgInput.value || "";

      const onBaseBgChange = () => {
        this._lastBgFromUser = bgInput.value;
      };

      bgInput.addEventListener("input", onBaseBgChange);
      bgInput.addEventListener("change", onBaseBgChange);
    }

    if (bgInput && hoverBgInput) {
      const fixBgAfterHoverChange = () => {
        let frames = 5;

        const restore = () => {
          if (!bgInput) return;
          if (this._lastBgFromUser != null) {
            bgInput.value = this._lastBgFromUser;
          }
          if (--frames > 0) {
            requestAnimationFrame(restore);
          }
        };

        requestAnimationFrame(restore);
      };

      hoverBgInput.addEventListener("input", fixBgAfterHoverChange);
      hoverBgInput.addEventListener("change", fixBgAfterHoverChange);
    }

    // UI active for toggling size buttons
    const sizeToggle = this.modal.querySelector("#link-size-toggle");
    if (sizeToggle) {
      sizeToggle.querySelectorAll(".vvv-size-option").forEach((btn) => {
        const val = btn.getAttribute("data-size");
        if (val && val === size) {
          btn.classList.add("is-active");
        } else {
          btn.classList.remove("is-active");
        }
      });
    }

    // Show/hide border color row
    const borderRow = this.modal.querySelector("#link-border-color-row");
    if (borderRow) {
      borderRow.style.display = border === "border" ? "" : "none";
    }

    // UI active for toggling radius buttons
    // UI active for toggling radius + border presets
    const radiusWrap = this.modal.querySelector("#link-radius-options");
    if (radiusWrap) {
      const radiusHidden = this.modal.querySelector("#link-style-radius");
      const borderHidden = this.modal.querySelector("#link-style-border");
      const borderRow = this.modal.querySelector(
        "#link-border-color-row",
      );

      const applyPresetActiveState = (radiusVal, borderVal) => {
        // saare buttons se active class hatao
        radiusWrap
          .querySelectorAll(".vvv-radius-option")
          .forEach((b) => {
            b.classList.remove("is-active");
          });

        // jis button ka radius+border match kare use active karo
        const activeBtn = radiusWrap.querySelector(
          `.vvv-radius-option[data-radius="${radiusVal}"][data-border="${borderVal}"]`,
        );
        if (activeBtn) {
          activeBtn.classList.add("is-active");
        }

        // border color row show/hide
        if (borderRow) {
          borderRow.style.display =
            borderVal === "border" ? "" : "none";
        }
      };

      // modal open hone par initial state set karo
      const currentRadius = this.el.getAttribute("data-btn-radius") || "";
      const currentBorder =
        this.el.getAttribute("data-btn-border") || "none";
      if (radiusHidden) radiusHidden.value = currentRadius;
      if (borderHidden) borderHidden.value = currentBorder;
      applyPresetActiveState(currentRadius, currentBorder);

      // click handler for all presets
      radiusWrap.querySelectorAll(".vvv-radius-option").forEach((btn) => {
        btn.addEventListener("click", () => {
          const radiusVal = btn.getAttribute("data-radius") || "";
          const borderVal = btn.getAttribute("data-border") || "none";

          if (radiusHidden) radiusHidden.value = radiusVal;
          if (borderHidden) borderHidden.value = borderVal;

          applyPresetActiveState(radiusVal, borderVal);

          if (!this.styleTouched || !this.styleCleared) {
            this._resetStyleFlags();
          }
          this.styleTouched.radius = true;
          this.styleCleared.radius = false;

          // ✅ border attribute bhi touch karo
          this.styleTouched.border = true;
          // agar preset "border" hai to clear mat karo, warna clear kar do
          this.styleCleared.border =
            borderVal === "border" ? false : true;

          // ✅ agar hum border hata rahe hain (none), to borderColor bhi clear kar do
          if (borderVal !== "border") {
            this.styleTouched.borderColor = true;
            this.styleCleared.borderColor = true;
          }
        });
      });
    }

    this.modal.style.display = "block";

    setTimeout(() => {
      const first = this.fieldsWrap.querySelector(
        "input, select, textarea",
      );
      if (first) first.focus();
    }, 50);
  },

  close() {
    if (this.el && this.wasTemporaryLink) {
      this.unwrapTemporaryLink()
    }
    if (this.modal) this.modal.style.display = "none";

    this.clearValidationError();


    this.el = null;

    this.pendingButtonMode = false;
    if (this.buttonModeToggle) {
      this.buttonModeToggle.checked = false;
    }
    this.toggleButtonCustomization(false);

    this.toggleButtonModeCheckbox(true);
  },

  render(type, href = "") {
    const htmlByType = {
      url: `
      <label for="link-url" class="form-label">What's the web address?</label>
      <div style="display: flex; align-items: center;">
          <span style="background: #eee; padding: 9px 12px; border-radius: 6px 0 0 6px; border: 1px solid #ccc; border-right: none; color: #373737;">https://</span>
          <input type="text" id="link-url" class="form-control" placeholder="your-site.com" style="flex: 1; border-radius: 0 6px 6px 0; border-left: none;">
      </div>
        <div class="form-check mt-2">
          <input class="form-check-input" type="checkbox" id="link-newtab" />
          <label class="form-check-label" for="link-newtab">Open in new tab</label>
        </div>
      `,
      phone: `
    <label for="link-phone" class="form-label">Phone Number</label>
    <div class="vvv-phone">
      <select id="link-phone-country" class="form-select vvv-cc-select">
        ${this._getCountryCodeOptions()}
      </select>
      <input
        type="text"
        id="link-phone"
        class="form-control vvv-phone-input"
        placeholder="9876543210"
      />
    </div>
  
  `,
      email: `
        <label for="link-email" class="form-label">What's your Email address</label>
        <input type="email" id="link-email" class="form-control" placeholder="hello@example.com" />
      `,
      scroll: `
        <label for="link-scroll" class="form-label">To which Section?</label>
        <select id="link-scroll" class="form-select">
          <option value="">— Select section —</option>
          ${this._sectionsOptions()}
        </select>
      `,

      whatsapp: `
    <label for="link-wa-number" class="form-label">WhatsApp Number</label>
    <div class="vvv-phone">
      <select id="link-wa-country" class="form-select vvv-cc-select">
        ${this._getCountryCodeOptions()}
      </select>
      <input
        type="text"
        id="link-wa-number"
        class="form-control vvv-phone-input"
        placeholder="9876543210"
      />
    </div>
   
    <label for="link-wa-message" class="form-label mt-2">Message (optional)</label>
    <input
      type="text"
      id="link-wa-message"
      class="form-control"
      placeholder="Type message here"
    />
  `,
      pdf: `
     <div class="vvv-field">
  <label class="form-label">Pick PDF from Media Gallery</label>

  <div style="display:flex; gap:8px;">
    <button
      type="button"
      id="pick-pdf-from-gallery"
      class="zg-btn-secondary"
    >
      Choose
    </button>
  </div>

  <!-- PDF URL (hidden until selected) -->
  <div id="pdf-url-wrap" style="display:none; margin-top:8px;">
    <input
      type="text"
      id="link-pdf-url"
      class="form-control"
      readonly
    />
  </div>

  <div class="form-text">Choose a PDF from Media Gallery</div>
</div>

  `,
      page: (() => {
        const opts = this._pagesOptions();
        if (!opts) {
          return `
            <div class="vvv-link-page-notice" style="padding:12px; background:#fef3cd; border:1px solid #ffc107; border-radius:6px; color:#664d03; font-size:13px; margin-top:4px;">
              <strong>No pages available.</strong><br>
              Add more pages using the Page Manager before linking to a page.
            </div>
          `;
        }
        return `
          <label for="link-page" class="form-label">Which page?</label>
          <select id="link-page" class="form-select">
            <option value="">— Select page —</option>
            ${opts}
          </select>
        `;
      })(),
    };

    this.fieldsWrap.innerHTML = htmlByType[type] || htmlByType["url"];
    // prefill based on existing href/target

    if (type === "url") {
      // Show URL fields
      this.fieldsWrap.innerHTML = `
            <div class="form-row">
                <label class="form-label">What's the web address?</label>
                <div style="display: flex; align-items: center;">
                    <span style="background: #eee; padding: 8px 12px; border-radius: 6px 0 0 6px; border: 1px solid #ccc; border-right: none; color: #373737;">https://</span>
                    <input type="text" id="link-url" class="form-control" placeholder="your-site.com" style="flex: 1; border-radius: 0 6px 6px 0; border-left: none;">
                </div>
            </div>
            <div class="form-check mt-2">
                <input class="form-check-input" type="checkbox" id="link-newtab">
                <label class="form-check-label" for="link-newtab">Open in new tab</label>
            </div>
        `;

      // Prefill existing values
      const urlInput = this.fieldsWrap.querySelector("#link-url");
      if (urlInput && href) {
        if (href === "#" || href === "/") {
          // Bare "/" or "#" are stale fallbacks from deleted page links
          // — show empty so user picks a fresh destination
          urlInput.value = "";
        } else if (
          !href.startsWith("tel:") &&
          !href.startsWith("mailto:") &&
          !href.startsWith("#")
        ) {
          urlInput.value = href.replace(/^https?:\/\//, "");
        }
      }
    } else if (type === "phone") {
      const phoneInput = this.fieldsWrap.querySelector("#link-phone");
      const ccSelect = this.fieldsWrap.querySelector("#link-phone-country");

      let raw = "";
      if (href && href.startsWith("tel:")) {
        raw = href.replace(/^tel:/, "");
      }
      if (raw && ccSelect) {
        const options = Array.from(ccSelect.options || []);
        let bestCode = "";
        options.forEach((opt) => {
          const code = opt.value || "";
          if (code && raw.startsWith(code) && code.length > bestCode.length) {
            bestCode = code;
          }
        });

        if (bestCode) {
          ccSelect.value = bestCode; // dropdown me +91 set
          raw = raw.slice(bestCode.length); // input me sirf 7827289079
        }
      }

      if (phoneInput) {
        phoneInput.value = raw;
      }
    } else if (type === "email") {
      const inp = this.fieldsWrap.querySelector("#link-email");
      inp.value = href.startsWith("mailto:")
        ? href.replace(/^mailto:/, "")
        : "";
    } else if (type === "scroll") {
      const sel = this.fieldsWrap.querySelector("#link-scroll");
      sel.value = href.startsWith("#") ? href : "";
    } else if (type === "whatsapp") {
      const numInput = this.fieldsWrap.querySelector("#link-wa-number");
      const msgInput = this.fieldsWrap.querySelector("#link-wa-message");
      const ccSelect = this.fieldsWrap.querySelector("#link-wa-country");

      if (href) {
        try {
          const urlObj = new URL(href, window.location.origin);
          let rawNumber = "";

          if (/wa\.me$/i.test(urlObj.hostname)) {
            rawNumber = urlObj.pathname.replace(/^\//, "");
          } else if (/api\.whatsapp\.com$/i.test(urlObj.hostname)) {
            rawNumber = urlObj.searchParams.get("phone") || "";
          }

          const text = urlObj.searchParams.get("text") || "";

          // yahan bhi country code alag
          let localNumber = rawNumber;
          if (rawNumber && ccSelect) {
            const options = Array.from(ccSelect.options || []);
            let bestCode = "";
            options.forEach((opt) => {
              const code = opt.value || "";
              if (
                code &&
                rawNumber.startsWith(code) &&
                code.length > bestCode.length
              ) {
                bestCode = code;
              }
            });

            if (bestCode) {
              ccSelect.value = bestCode;
              localNumber = rawNumber.slice(bestCode.length);
            }
          }

          if (numInput) numInput.value = localNumber;
          if (msgInput)
            msgInput.value = decodeURIComponent(text.replace(/\+/g, ""));
        } catch (error) {
          // ignore parse errors
        }
      }
    } else if (type === "page") {
      const pageSel = this.fieldsWrap.querySelector("#link-page");
      if (pageSel) {
        const pageKey = this.el?.getAttribute("data-page-key") || "";
        let matched = false;
        if (pageKey) {
          const opt = pageSel.querySelector(`option[data-page-key="${pageKey}"]`);
          if (opt) { pageSel.value = opt.value; matched = true; }
        }
        if (!matched && href && href !== "#") {
          // Fallback: match by slug value
          pageSel.value = href;
          if (!pageSel.value) pageSel.value = ""; // reset to "Select a page" if no match
        }
        if (!matched && (!href || href === "#")) {
          pageSel.value = ""; // show "Select a page" placeholder
        }
      }
    } else if (type === "pdf") {
      const pickBtn = this.fieldsWrap.querySelector("#pick-pdf-from-gallery");

      const urlInp = this.fieldsWrap.querySelector("#link-pdf-url");
      const pdfWrap = this.fieldsWrap.querySelector("#pdf-url-wrap");

      if (urlInp && pdfWrap) {
        if (href && /\.pdf(?:\?|#|$)/i.test(href)) {
          urlInp.value = href;
          pdfWrap.style.display = "block";
        } else {
          urlInp.value = "";
          pdfWrap.style.display = "none";
        }
      }

      if (urlInp && href && /\.pdf(?:\?|#|$)/i.test(href)) {
        urlInp.value = href;
      }
      if (pickBtn) {
        pickBtn.addEventListener("click", () => {
          try {
            if (!window.Vvveb.MediaModal) {
              Vvveb.MediaModal = new MediaModal(true);
              Vvveb.MediaModal.mediaPath = window.mediaPath;
            }

            //Current changes : 13-2-26 start

            Vvveb.MediaModal.open(null, function (fileData) {
              const payload =
                typeof fileData === "string"
                  ? { src: fileData }
                  : fileData || {};
              const fileUrl = payload.src;
              //Current changes : 13-2-26 ends
              if (!fileUrl) return;
              if (!/\.pdf(?:\?|#|$)/i.test(fileUrl)) {
                alert("Please select a PDF file from media.");
                return;
              }
              urlInp.value = fileUrl; // fill selected PDF url
              if (pdfWrap) pdfWrap.style.display = "block";
            });
          } catch (e) {
            alert("Media gallery not available");
          }
        });
      }
    }

    this.clearValidationError()

    this.fieldsWrap
      .querySelectorAll("input, select, textarea")
      .forEach((field) => {
        const clear = () => {
          field.classList.remove("link-invalid");
          this.modal
            .querySelectorAll(".link-field-error")
            .forEach((el) => el.remove());
        };

        field.addEventListener("input", clear);
        field.addEventListener("change", clear);
      });
  },

  apply() {
    if (!this.el) return;

    if (!this.validateBeforeApply()) {
      return;
    }

    const type = this.actionSel.value;
    let newHref = "";
    let newTarget = null;

    const oldHref = this.el.getAttribute("href") || "";
    const oldTarget = this.el.getAttribute("target");

    // Amit has added this related to multiple-undo/redo
    const oldLinkParent = this.el.parentElement.innerHTML;

    if (type === "url") {
      let url = this.modal.querySelector("#link-url").value.trim();

      if (url.startsWith("#")) {
        newHref = url;
        newTarget = null;
      } else {
        if (url && !/^https?:\/\//i.test(url)) {
          url = "https://" + url;
        }
      }

      newHref = url || "#";
      const openNew =
        this.fieldsWrap.querySelector("#link-newtab")?.checked;
      newTarget = openNew ? "_blank" : null;
    } else if (type === "phone") {
      const phone = (
        this.fieldsWrap.querySelector("#link-phone")?.value || ""
      ).trim();
      const code = (
        this.fieldsWrap.querySelector("#link-phone-country")?.value ||
        ""
      ).trim();
      const fullPhone = code && phone ? code + phone : phone;
      newHref = fullPhone ? "tel:" + fullPhone : "#";
      newTarget = null;
    } else if (type === "email") {
      const email = (
        this.fieldsWrap.querySelector("#link-email")?.value || ""
      ).trim();
      newHref = email ? "mailto:" + email : "#";
      newTarget = null;
    } else if (type === "scroll") {
      const id = (
        this.fieldsWrap.querySelector("#link-scroll")?.value || ""
      ).trim();
      newHref = id || "#";
      newTarget = null;
    } else if (type === "whatsapp") {
      // Input values
      const number = document
        .querySelector("#link-wa-number")
        ?.value.trim();
      const message = encodeURIComponent(
        document.querySelector("#link-wa-message")?.value.trim() ?? "",
      );
      let waHref = "https://wa.me/" + number;
      if (message) waHref += "?text=" + message;
      newHref = waHref;
      newTarget = "_blank";
    } else if (type === "pdf") {
      const pdfUrl = document
        .querySelector("#link-pdf-url")
        ?.value.trim();
      newHref = pdfUrl;
      newTarget = "_blank";
      if (pdfUrl) {
        this.el.setAttribute("download", "");
      } else {
        this.el.removeAttribute("download");
      }
    } else if (type === "page") {
      const pageSel = this.fieldsWrap.querySelector("#link-page");
      if (pageSel && pageSel.value) {
        newHref = pageSel.value;
        const selectedOpt = pageSel.options[pageSel.selectedIndex];
        const pageKey = selectedOpt ? selectedOpt.getAttribute("data-page-key") || "" : "";
        if (pageKey) {
          this.el.setAttribute("data-page-key", pageKey);
        } else {
          this.el.removeAttribute("data-page-key");
        }
      } else {
        newHref = "#";
        this.el.removeAttribute("data-page-key");
      }
      newTarget = null;
    }

    const oldHtml = this.el.innerHTML;

    (() => {
      const textInput = this.modal.querySelector("#link-text");
      if (!textInput) return;

      const newText = (textInput.value || "").trim();
      if (!newText) return;

      const linkEl = this.el;
      const iconEl = linkEl.querySelector("i");

      if (!iconEl) {
        linkEl.textContent = newText;
        return;
      }

      const iconHTML = iconEl.outerHTML;
      const trimmedOld = (oldHtml || "").trim();

      // <i ...></i> Text   == iconFirst
      // Text <i ...></i>   == iconLast
      const iconFirst = trimmedOld.startsWith("<i");
      const iconLast = trimmedOld.endsWith("</i>");

      if (iconLast && !iconFirst) {
        linkEl.innerHTML = newText + " " + iconHTML;
      } else {
        linkEl.innerHTML = iconHTML + " " + newText;
      }
    })();

    // if (oldHtml !== this.el.innerHTML) {
    //   //
    //   Vvveb.Undo.addMutation({
    //     type: "characterData",
    //     target: this.el, // IMPORTANT: element, not text node
    //     oldValue: oldHtml,
    //     newValue: this.el.innerHTML,
    //   });
    // }

    // apply attrs
    if (newHref) this.el.setAttribute("href", newHref);
    else this.el.removeAttribute("href");

    if (newTarget) this.el.setAttribute("target", newTarget);
    else this.el.removeAttribute("target");

    // Clean up data-page-key when switching away from "page" type
    if (type !== "page") {
      this.el.removeAttribute("data-page-key");
    }

    // undo mutations
    //
    // Vvveb.Undo.addMutation({
    //   type: "attributes",
    //   target: this.el,
    //   attributeName: "href",
    //   oldValue: oldHref,
    //   newValue: this.el.getAttribute("href"),
    // });

    //
    // Vvveb.Undo.addMutation({
    //   type: "attributes",
    //   target: this.el,
    //   attributeName: "target",
    //   oldValue: oldTarget,
    //   newValue: this.el.getAttribute("target"),
    // });

    if (this.pendingButtonMode) {
      this.el.setAttribute("data-btn", "true");
      this.el.setAttribute("data-btn-converted", "true")
    } else {
      this.el.removeAttribute("data-btn");
      this.el.removeAttribute("data-btn-converted")
      this.el.removeAttribute("data-link-style-id");

      this.el.removeAttribute("data-btn-bg");
      this.el.removeAttribute("data-btn-color");
      this.el.removeAttribute("data-btn-hover-bg");
      this.el.removeAttribute("data-btn-hover-color");
      this.el.removeAttribute("data-btn-size");
      this.el.removeAttribute("data-btn-radius");
      this.el.removeAttribute("data-btn-border");
      this.el.removeAttribute("data-btn-border-color");
    }

    if (
      this.pendingButtonMode &&
      !this.el.getAttribute("data-link-style-id")
    ) {
      const id =
        "link-" +
        Date.now().toString(36) +
        "-" +
        Math.floor(Math.random() * 9999).toString(36);

      this.el.setAttribute("data-link-style-id", id);
    }

    if (this.pendingButtonMode) {
      const getVal = (colorSel) => {
        // const t = this.modal.querySelector(toggleSel);
        const c = this.modal.querySelector(colorSel);
        return c ? c.value || "" : "";
      };


      // Without toggle
      const newBg = getVal("#link-style-bg");
      const newColor = getVal("#link-style-text");
      const newHoverBg = getVal("#link-style-hover-bg");
      const newHoverColor = getVal("#link-style-hover-text");
      const newSize = getVal("#link-style-size");
      const newRadius = getVal("#link-style-radius");
      const newBorder = getVal("#link-style-border");
      const newBorderColor = getVal("#link-style-border-color");

      // Old values (for undo if needed)
      const oldBg = this.el.getAttribute("data-btn-bg");
      const oldColor = this.el.getAttribute("data-btn-color");
      const oldHoverBg = this.el.getAttribute("data-btn-hover-bg");
      const oldHoverColor = this.el.getAttribute("data-btn-hover-color");
      const oldSize = this.el.getAttribute("data-btn-size");
      const oldRadius = this.el.getAttribute("data-btn-radius");
      const oldBorderColor = this.el.getAttribute("data-btn-border-color");
      const oldBorder = this.el.getAttribute("data-btn-border");

      // Set / clear attributes
      const setAttr = (name, val, oldVal) => {
        if (val) this.el.setAttribute(name, val);
        else this.el.removeAttribute(name);

        //
        // Vvveb.Undo.addMutation({
        //   type: "attributes",
        //   target: this.el,
        //   attributeName: name,
        //   oldValue: oldVal,
        //   newValue: val || null,
        // });
      };

      const t = this.styleTouched || {};
      const cl = this.styleCleared || {};

      if (t.bg) {
        const val = cl.bg ? null : newBg;
        setAttr("data-btn-bg", val, oldBg);
      }
      if (t.text) {
        const val = cl.text ? "" : newColor;
        setAttr("data-btn-color", val, oldColor);
      }
      if (t.hoverBg) {
        const val = cl.hoverBg ? "" : newHoverBg;
        setAttr("data-btn-hover-bg", val, oldHoverBg);
      }
      if (t.hoverText) {
        const val = cl.hoverText ? "" : newHoverColor;
        setAttr("data-btn-hover-color", val, oldHoverColor);
      }


      if (t.size) {
        const val = cl.size ? "" : newSize;
        setAttr("data-btn-size", val, oldSize);
      }
      if (t.radius) {
        const val = cl.radius ? "" : newRadius;
        setAttr("data-btn-radius", val, oldRadius);
      }
      if (t.borderColor) {
        const val = cl.borderColor ? "" : newBorderColor;
        setAttr("data-btn-border-color", val, oldBorderColor);
      }
      if (t.border) {
        const val = cl.border ? "" : newBorder;
        setAttr("data-btn-border", val, oldBorder);
      }
    }
    // Rebuild CSS for all styled links (normal + hover)

    this._rebuildButtonStyles();

    const newLinkParent = this.el.parentElement.innerHTML;

    if (oldLinkParent != newLinkParent && Vvveb.Undo) {
      Vvveb.Undo.addMutation({
        type: "characterData",
        target: this.el.parentElement,
        oldValue: oldLinkParent,
        newValue: newLinkParent,
      });
    }


    this.el.removeAttribute("data-temp-link")
    this.wasTemporaryLink = false;
    this.close();
  },

  _sectionsOptions() {
    // read sections from the iframe document
    const doc = window.FrameDocument || Vvveb?.Builder?.iframe?.contentDocument;
    if (!doc) return "";
    const nodes = Array.from(
      doc.querySelectorAll(
        "section[id], [id][data-section], header[id], footer[id]"
      )
    );
    if (!nodes.length) return "";
    return nodes
      .map((n) => {
        const id = n.getAttribute("id");
        if (!id) return "";
        return `<option value="#${id}">${id}</option>`;
      })
      .join("");
  },

  _pagesOptions() {
    const pages = window.__zigrowPages || {};
    const keys = Object.keys(pages);
    if (!keys.length) return "";

    // Sort by sort order
    keys.sort((a, b) => (pages[a]._sortOrder || 0) - (pages[b]._sortOrder || 0));

    return keys
      .map((fname) => {
        const p = pages[fname];
        const label = p._pageName + (p._isHome ? " (Home)" : "");
        const slug = p._pageSlug || "/";
        const safeKey = (p._pageKey || "").replace(/"/g, "&quot;");
        return `<option value="${slug}" data-page-key="${safeKey}">${label}</option>`;
      })
      .join("");
  },

  _getCountryCodeOptions() {
    const codes = [
      { code: "+91", name: "India 🇮🇳" },
      { code: "+1", name: "USA 🇺🇸" },
      { code: "+44", name: "UK 🇬🇧" },
      { code: "+61", name: "Australia 🇦🇺" },
    ];
    return codes
      .map((c) => `<option value="${c.code}">${c.name} (${c.code})</option>`)
      .join("");
  },

  _getDoc() {
    return (
      window.FrameDocument ||
      Vvveb?.Builder?.iframe?.contentDocument ||
      document
    );
  },

  _ensureStyleSheet() {
    const doc = this._getDoc();
    if (this.styleSheet && this.styleSheet.ownerDocument === doc) {
      return this.styleSheet;
    }

    let style = doc.getElementById("vv-link-style-sheet");
    if (!style) {
      style = doc.createElement("style");
      style.id = "vv-link-style-sheet";
      doc.head.appendChild(style);
    }

    this.styleSheet = style;
    return style;
  },

  _rebuildButtonStyles() {
    const doc = this._getDoc();
    const styleEl = this._ensureStyleSheet();
    const nodes = doc.querySelectorAll("a[data-link-style-id]");

    let css = "";
    nodes.forEach((el) => {
      const id = el.getAttribute("data-link-style-id");
      const bg = el.getAttribute("data-btn-bg");
      const color = el.getAttribute("data-btn-color");
      const hoverBg = el.getAttribute("data-btn-hover-bg");
      const hoverColor = el.getAttribute("data-btn-hover-color");
      const size = el.getAttribute("data-btn-size");
      const radius = el.getAttribute("data-btn-radius");
      const border = el.getAttribute("data-btn-border");
      const borderColor = el.getAttribute("data-btn-border-color");

      if (!id) return;

      const sel = `a[data-link-style-id="${id}"]`;

      // Border radius
      let radiusCss = "";

      if (radius === "square") {
        radiusCss = "border-radius: 0 !important;";
      } else if (radius === "rounded") {
        radiusCss = "border-radius: 8px !important;";
      } else if (radius === "pill") {
        radiusCss = "border-radius: 9999px !important;";
      } else {
        radiusCss = "border-radius: 8px !important;"
      }

      // Base styles
      css += `${sel}{`;
      css += `display: inline-block !important;`;
      css += `text-decoration: none !important;`;
      css += `transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;`;

      css += `background: ${bg || "var(--primary-colors, #ccc)"} !important;`;
      css += `color: ${color || "#ffffff"} !important;`;

      // size -> padding + font-size
      if (size === "1x") {
        css += `padding: 6px 14px !important; font-size: 12px !important;`;
      } else if (size === "2x") {
        css += `padding: 9px 18px !important; font-size: 14px !important;`;
      } else if (size === "3x") {
        css += `padding: 12px 24px !important; font-size: 16px !important;`;
      } else if (size === "4x") {
        css += `padding: 14px 28px !important; font-size: 18px !important;`;
      } else if (size === "5x") {
        css += `padding: 16px 30px !important; font-size: 20px !important;`;
      } else if (size === "6x") {
        css += `padding: 18px 32px !important; font-size: 22px !important;`;
      } else {
        css += `padding: 10px 18px !important; font-size: 14px !important;`
      }
      if (radiusCss) {
        css += radiusCss;
      }
      if (border === "border") {
        const bColor = borderColor || color || "currentColor";
        css += `border: 1px solid ${bColor} !important;`;
      } else {
        css += `border: none`;
      }

      css += `}\n`;

      if (hoverBg || hoverColor) {
        css += `${sel}:hover{`;
        if (hoverBg) css += `background:${hoverBg} !important;\n`;
        if (hoverColor) css += `color:${hoverColor} !important;`;
        css += `}\n`;
      }
    });
    styleEl.textContent = css;
  },

  // --- Helpers to read real CSS styles ---

  _getComputedButtonStyle() {
    if (!this.el) return null;

    const startEl = this.el;
    const doc = startEl.ownerDocument || document;
    const win = doc.defaultView || window;

    try {
      let node = startEl;
      let lastCs = null;

      while (node && node !== doc.documentElement) {
        const cs = win.getComputedStyle(node);
        if (!cs) break;

        const bg = cs.backgroundColor;
        lastCs = cs;

        // koi solid color mila (not fully transparent)
        if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
          return cs;
        }

        node = node.parentElement;
      }

      // kuch solid bg nahi mila, last computed style hi de do (at least text color correct hoga)
      return lastCs;
    } catch (e) {
      return null;
    }
  },

  _normalizeColor(color) {
    if (!color) return "";
    color = color.trim();

    if (color.startsWith("#") || /^[a-zA-Z]+$/.test(color)) {
      return color;
    }

    const rgbMatch = color.match(
      /rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d\.]+)?\s*\)/
    );
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
      return "#" + toHex(r) + toHex(g) + toHex(b);
    }

    return color; // fallback
  },

  toggleButtonCustomization(show) {
    if (!this.modal) return;

    const wrap = this.modal.querySelector("#link-btn-customization-wrap");
    if (!wrap) return;

    const dialog = this.modal.querySelector(".vvv-link-modal__dialog");
    if (dialog) {
      dialog.classList.toggle("is-button-mode", !!show);
    }

    const linkEditorHeading = this.modal.querySelector("#link-popup-title");
    if (linkEditorHeading) {
      linkEditorHeading.textContent = show
        ? "Button Settings"
        : "Link Settings";
    }

    const linkEditortextHeading = this.modal.querySelector(
      "#vvv-link-heading-text"
    );
    if (linkEditortextHeading) {
      linkEditortextHeading.textContent = show ? "Button text" : "Link text";
    }

    const linkEditorActionHeading = this.modal.querySelector(
      "#vvv-link-heading-action"
    );
    if (linkEditorActionHeading) {
      linkEditorActionHeading.textContent = show
        ? "What do you want this button to do?"
        : "What do you want this link to do?";
    }

    wrap.style.display = show ? "" : "none";
  },
  // Helpers for validation
  clearValidationError() {
    if (!this.modal) return;

    this.modal
      .querySelectorAll(".link-field-error")
      .forEach((el) => el.remove());
    this.modal.querySelectorAll(".link-invalid").forEach((el) => {
      el.classList.remove("link-invalid");
    });
  },

  showValidationError(input, message) {
    if (!input) return;

    input.classList.add("link-invalid");

    const error = document.createElement("div");
    error.className = "link-field-error";
    error.textContent = message;
    error.style.color = "#dc3545";
    error.style.fontSize = "12px";
    error.style.marginTop = "6px";

    const parent =
      input.closest(".vvv-phone") || input.parentElement || input;
    parent.insertAdjacentElement("afterend", error);

    if (typeof input.focus === "function") input.focus();
  },
  validateBeforeApply() {
    this.clearValidationError();

    const type = this.actionSel?.value;

    if (type === "url") {
      const input = this.modal.querySelector("#link-url");
      const value = (input?.value || "").trim();

      if (!value) {
        this.showValidationError(input, "Please enter a web address.");
        return false;
      }
    }

    if (type === "phone") {
      const input = this.fieldsWrap.querySelector("#link-phone");
      const value = (input?.value || "").trim();

      if (!value) {
        this.showValidationError(input, "Please enter a phone number.");
        return false;
      }
    }

    if (type === "email") {
      const input = this.fieldsWrap.querySelector("#link-email");
      const value = (input?.value || "").trim();

      if (!value) {
        this.showValidationError(
          input,
          "Please enter an email address.",
        );
        return false;
      }
    }

    if (type === "scroll") {
      const input = this.fieldsWrap.querySelector("#link-scroll");
      const value = (input?.value || "").trim();

      if (!value) {
        this.showValidationError(input, "Please select a section.");
        return false;
      }
    }

    if (type === "whatsapp") {
      const input = this.fieldsWrap.querySelector("#link-wa-number");
      const value = (input?.value || "").trim();

      if (!value) {
        this.showValidationError(
          input,
          "Please enter a WhatsApp number.",
        );
        return false;
      }
    }

    if (type === "pdf") {
      const input = this.fieldsWrap.querySelector("#link-pdf-url");
      const value = (input?.value || "").trim();

      if (!value) {
        this.showValidationError(
          input,
          "Please select or enter a PDF URL.",
        );
        return false;
      }
    }

    if (type === "page") {
      const input = this.fieldsWrap.querySelector("#link-page");
      const value = (input?.value || "").trim();

      if (!value) {
        this.showValidationError(input, "Please select a page.");
        return false;
      }
    }

    return true;
  },
  shouldShowButtonToggle() {
    if (!this.el) return false;

    const isButton = this.el.hasAttribute("data-btn");
    const isConvertedButton =
      this.el.getAttribute("data-btn-converted") === "true";

    return !isButton || isConvertedButton;
  },

  toggleButtonModeCheckbox(show) {
    if (!this.modal) return;

    const toggle = this.modal.querySelector("#link-as-button-toggle");
    if (!toggle) return;

    const row =
      toggle.closest(".form-check") ||
      toggle.closest("label") ||
      toggle.parentElement;

    if (row) {
      row.style.display = show ? "" : "none";
    }
  },

  unwrapTemporaryLink() {
    if (!this.el || !this.el.parentNode) return;

    const parent = this.el.parentNode;
    while (this.el.firstChild) {
      parent.insertBefore(this.el.firstChild, this.el)
    }
    parent.removeChild(this.el)
  }
};

// wire up toolbar button to open the LinkEditor
(function () {
  const btn = document.getElementById("edit-link-btn");
  if (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const el = Vvveb?.Builder?.selectedEl;
      if (!el || el.tagName !== "A") return;
      Vvveb.LinkEditor.open(el);
    });
  }
  // init once DOM is ready
  Vvveb.LinkEditor.init();
})();

// Amit has started code added for the link inputs pop up when we add the anchor tag
const btn = document.getElementById("link-btn");
btn.addEventListener("click", () => {
  setTimeout(() => {
    const el = Vvveb?.Builder?.selectedEl;
    if (!el || el.tagName !== "A") return;
    Vvveb.LinkEditor.open(el);
    // init once DOM is ready
    Vvveb.LinkEditor.init();
  }, 80);
});
// Amit has ended code added for the link inputs pop up when we add the anchor tag

// Amit's code for the save-btn reset
document.getElementById("save-btn").addEventListener("click", () => {
  // code to run when clicked
  Vvveb.Undo.reset();
});

// ============================
// AI Writer Controller (Jayanti)
// ============================
Vvveb.AIWriter = {
  btn: null,
  menu: null,
  _bound: false,
  panel: null,
  ppToneLabel: null,
  ppActionLabel: null,
  ppInput: null,
  ppPreview: null,

  state: {
    tone: "default",
    action: null,
    element: null,
    generatedText: "",
    sourceText: "",
    systemHint: "",
  },

  init() {
    this.btn = document.getElementById("ai-writer-btn");
    this.menu = document.getElementById("ai-writer-menu");
    this.panel = document.getElementById("ai-prompt-panel");
    this.ppToneLabel = document.getElementById("ai-pp-tone-label");
    this.ppActionLabel = document.getElementById("ai-pp-action-label");
    this.ppInput = document.getElementById("ai-pp-input");
    this.ppPreview = document.getElementById("ai-pp-preview");
    this.quickPanel = document.getElementById("ai-quick-panel");

    this.quickInput = document.getElementById("ai-quick-input");
    this.ppOutput = document.getElementById("ai-pp-output");
    this.ppLoader = document.getElementById("ai-pp-loader");
    this.ppActions = document.getElementById("ai-pp-actions");
    this.toneChipValue = document.getElementById("ai-tone-chip-value");
    this.tokenRow = document.getElementById("ai-token-row");
    this.tokenCountEl = document.getElementById("ai-token-count");
    this.tokenRemainingEl = document.getElementById("ai-token-remaining");
    this.tokenBarFill = document.getElementById("ai-token-bar-fill");

    this.tokenState = { total: 5000, used: 0, remaining: 5000 };

    if (this.menu) this.menu.classList.add("is-hidden");
    if (this.panel) this.panel.classList.add("is-hidden");
    if (this._bound) return;
    this._bound = true;
    this._bindUI();

    Vvveb.AIWriter.positionPanelBound = Vvveb.AIWriter.positionPanel.bind(
      Vvveb.AIWriter
    );

    this.quickSendBtn =
      this.quickPanel?.querySelector("[data-ai-quick-send]") || null;

    this._bindQuickInputState();
    this._updateQuickSendUI(); // initial
  },

  _bindUI() {
    const self = this;

    document.addEventListener("click", function (e) {
      const btn = e.target.closest("#ai-writer-btn");
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      self.init();

      if (self.isAnythingOpen()) {
        self.closeQuick();
        self.closePanel();
        self.closeMenu();
        return false;
      }
      self.open();

      return false;
    });

    document.addEventListener("click", function (e) {
      const menuRoot = document.getElementById("ai-writer-menu");
      if (!menuRoot) return;

      const item = e.target.closest(".ai-menu-item,.ai-sub-item");
      if (!item || !menuRoot.contains(item)) return;

      // Action
      const action = item.dataset.aiAction;
      if (action) {
        self.handleAction(action);
        self.closeMenu();
        return;
      }

      // Tone
      const tone = item.dataset.aiTone;
      if (tone) {
        self.handleTone(tone);
        return;
      }

      const submenuKey = item.dataset.aiSubmenu;
      if (submenuKey) self.openSubmenu(submenuKey, item);
    });

    document.addEventListener("click", (e) => {
      const rep = e.target.closest("[data-ai-pp-replace]");
      const ins = e.target.closest("[data-ai-pp-below]");
      const gen = e.target.closest("[data-ai-pp-generate]");
      const copy = e.target.closest("[data-ai-pp-copy]");
      if (rep) return self.applyReplace();
      if (ins) return self.applyInsertBelow();
      if (gen) return self.autoGenerate();
      if (copy) return self.copyGeneratedText(copy);
    });

    document.addEventListener("click", (e) => {
      const send = e.target.closest("[data-ai-quick-send]");
      if (!send) return;

      e.preventDefault();
      e.stopPropagation();

      const prompt = (self.quickInput?.value || "").trim();
      if (!prompt) return;

      self.state.action = "transform";
      // close quick, open full panel
      self.closeQuick();

      // set prompt into main panel input
      if (self.ppInput) self.ppInput.value = prompt;

      // open full panel at same place and generate
      self.openPanelAtMenuPosition();
      self.autoGenerate();
    });

    // Abort button
    document.addEventListener("click", (e) => {
      const stop = e.target.closest("[data-ai-pp-stop]");
      if (!stop) return;
      if (self._abort) self._abort.abort();
    });

    // Outside click close
    document.addEventListener("click", (e) => {
      const clickedInsideMenu = self.menu && self.menu.contains(e.target);
      const clickedInsideBtn = self.btn && self.btn.contains(e.target);
      const clickedInsidePanel = self.panel && self.panel.contains(e.target);

      const clickedInsideQuick =
        self.quickPanel && self.quickPanel.contains(e.target);

      if (
        self.isQuickOpen() &&
        !clickedInsideQuick &&
        !clickedInsidePanel &&
        !clickedInsideMenu &&
        !clickedInsideBtn
      ) {
        self.closeQuick();
      }

      if (
        self.isPanelOpen() &&
        !clickedInsidePanel &&
        !clickedInsideMenu &&
        !clickedInsideBtn &&
        !clickedInsideQuick
      ) {
        self.closePanel();
      }

      if (
        self.isOpen() &&
        !clickedInsideMenu &&
        !clickedInsideBtn &&
        !clickedInsidePanel
      ) {
        self.close();
      }
    });

    // Escape close
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      if (self.isPanelOpen()) self.closePanel();
      if (self.isOpen()) self.close();
    });

    document.addEventListener("click", (e) => {
      const back = e.target.closest("[data-ai-pp-back]");
      const close = e.target.closest("[data-ai-pp-close]");

      if (back) {
        self.closePanel();
        self.open();
        return;
      }

      if (close) {
        self.closePanel();
        return;
      }
    });
  },

  isOpen() {
    return this.menu && !this.menu.classList.contains("is-hidden");
  },

  toggle() {
    if (this.isOpen()) this.close();
    else this.open();
  },

  open() {
    if (!this.menu || !this.btn) return;
    this.closeQuick();

    this.closePanel();
    this._updateToneUI();

    this.menu.classList.remove("is-hidden");
    this.btn.setAttribute("aria-expanded", "true");

    this.menu.style.visibility = "hidden";
    requestAnimationFrame(() => {
      this.positionMenu();
      this.menu.style.visibility = "visible";
    });

    window.addEventListener("resize", this.positionMenuBound, {
      passive: true,
    });
    window.addEventListener("scroll", this.positionMenuBound, {
      passive: true,
      capture: true,
    });
  },

  close() {
    this.closeQuick();
    this.closePanel();
    this.closeMenu();
  },

  closeMenu() {
    if (!this.menu || !this.btn) return;

    this.menu.classList.add("is-hidden");
    this.btn.setAttribute("aria-expanded", "false");
    this.closeAllSubmenus();

    window.removeEventListener("resize", this.positionMenuBound);
    window.removeEventListener("scroll", this.positionMenuBound, true);
  },

  positionMenuBound: null,

  // positionMenu() {
  //   const btn = this.btn,
  //     menu = this.menu;
  //   if (!btn || !menu) return;

  //   const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  //   const parent =
  //     menu.offsetParent ||
  //     document.getElementById("wysiwyg-editor") ||
  //     document.body;

  //   const btnRect = btn.getBoundingClientRect();
  //   const parentRect = parent.getBoundingClientRect();

  //   const menuW = menu.offsetWidth || 260;

  //   let left = btnRect.left - parentRect.left;
  //   const maxLeft = (parent.clientWidth || parentRect.width) - menuW - 8;
  //   left = clamp(left, 8, Math.max(8, maxLeft));

  //   menu.style.position = "absolute";
  //   menu.style.left = `calc(${left}px + 64px)`;

  //   // ✅ iframe + selected element (inside iframe)
  //   const iframe = Vvveb?.Builder?.iframe || this.iframe;
  //   const elInIframe =
  //     Vvveb?.WysiwygEditor?.element || Vvveb?.Builder?.selectedEl;

  //   const bottomSpace =
  //     iframe && elInIframe
  //       ? getElementBottomDistanceFromIframeBottom(elInIframe, iframe)
  //       : null;

  //   if (bottomSpace !== null && bottomSpace < 500) {
  //     menu.style.top = "auto";
  //     menu.style.bottom = "calc(100% + 18px)";

  //     menu.classList.add("is-flipped");
  //   } else {
  //     menu.style.bottom = "auto";
  //     const top = btnRect.bottom - parentRect.top + 10;
  //     menu.style.top = `${top}px`;

  //     menu.classList.remove("is-flipped");
  //   }

  //   this._lastMenuRect = menu.getBoundingClientRect();
  // },

  positionMenu() {
    const { btn, menu } = this;

    const editor = document.getElementById("wysiwyg-editor");
    if (!btn || !menu || !editor) return;

    const rect = editor.getBoundingClientRect();
    const space = {
      top: rect.top,
      bottom: window.innerHeight - rect.bottom,
      left: rect.left,
      right: window.innerWidth - rect.right
    };

    let placement = 'default';

    if (space.bottom > 500) {
      placement = 'bottom';
    } else if (space.top > 500) {
      placement = 'top-flip';
    } else if (space.right > 280) {
      placement = 'right-flip';
    } else if (space.left > 280) {
      placement = 'left-flip';
    }

    menu.dataset.placement = placement;

    this._lastMenuRect = menu.getBoundingClientRect();
    console.log(`Menu positioned: ${placement}`);
  },

  openSubmenu(key, anchorItem) {
    const sub = document.getElementById(`ai-submenu-${key}`);
    if (!sub) return;

    const isOpen = !sub.classList.contains("is-hidden");
    this.closeAllSubmenus();
    if (isOpen) return;

    // 1) show (but hidden for measuring)
    sub.classList.remove("is-hidden");
    sub.style.display = "flex";
    sub.style.visibility = "hidden";

    // 2) anchor wrapper (relative container)
    const wrap = anchorItem?.closest(".ai-menu-subwrap") || sub.parentElement;
    if (!wrap) {
      sub.style.visibility = "";
      return;
    }

    const gap = 10;

    // submenu width (now measurable)
    const subW = sub.offsetWidth || 260;

    // viewport space from wrapper
    const wrapRect = wrap.getBoundingClientRect();
    const spaceRight = window.innerWidth - wrapRect.right;
    const spaceLeft = wrapRect.left;

    // 3) reset first
    sub.style.left = "";
    sub.style.right = "";
    sub.style.top = "";
    sub.style.bottom = "";

    // 4) horizontal flip
    if (spaceRight >= subW + gap) {
      // open to RIGHT (default)
      sub.style.left = `calc(100% + ${gap}px)`;
      sub.style.right = "auto";
    } else if (spaceLeft >= subW + gap) {
      // open to LEFT
      sub.style.right = `calc(100% + ${gap}px)`;
      sub.style.left = "auto";
    } else {
      // fallback: overlay under menu item
      sub.style.left = "0";
    }

    // 5) vertical fit (optional but recommended)
    const subH = sub.offsetHeight;
    const spaceBottom = window.innerHeight - wrapRect.top;
    const spaceTop = wrapRect.bottom;

    // if submenu going out bottom, stick it to bottom of wrap
    //   if (spaceBottom < subH && spaceTop >= subH) {
    //     sub.style.top = "auto";
    //     sub.style.bottom = "0";
    //   } else {
    //     sub.style.top = "0";
    //     sub.style.bottom = "auto";
    //   }

    // 6) reveal
    sub.style.visibility = "";
  },

  closeAllSubmenus() {
    document.querySelectorAll("#ai-writer-menu .ai-submenu").forEach((s) => {
      s.classList.add("is-hidden");
      s.style.display = "";
      s.style.visibility = "";
    });
  },

  handleAction(action) {
    if (action === "transform" || action === "write") {
      const el = Vvveb?.WysiwygEditor?.element || null;

      this.state.systemHint =
        "Transform the selected text using the user's instruction. Follow the user's constraints strictly.";
      this.state.action = action;
      this.state.element = el;
      this.state.sourceText = el
        ? (el.innerText || el.textContent || "").trim()
        : "";

      if (this.ppActionLabel)
        this.ppActionLabel.textContent =
          action === "transform" ? "Transform" : "Write for me";
      if (this.ppToneLabel)
        this.ppToneLabel.textContent = this.state.tone || "default";

      this.closePanel();
      this.openQuickAtMenuPosition();
      return;
    }

    const el = Vvveb?.WysiwygEditor?.element || null;

    this.state.action = action;
    this.state.element = el;
    this._lastElement = el;

    const actionMap = {
      write: {
        label: "Write for me",
        hint: "Write fresh text for the selected element. Keep it relevant to the page context.",
      },
      rewrite: {
        label: "Rewrite",
        hint: "Rewrite the text to improve clarity and flow. Keep meaning the same.",
      },
      shorten: {
        label: "Shorten",
        hint: "Shorten the text. Keep key points.",
      },
      expand: {
        label: "Expand",
        hint: "Expand the text with more detail. Keep tone consistent.",
      },

      catchy: {
        label: "Make it catchy",
        hint: "Make it more catchy, punchy and marketing-friendly. Keep it natural, not spammy.",
      },
      grammar: {
        label: "Fix grammar",
        hint: "Fix grammar, spelling and punctuation. Keep wording as close as possible.",
      },
    };

    const meta = actionMap[action] || {
      label: action,
      hint: "Improve this text.",
    };

    if (this.ppActionLabel) this.ppActionLabel.textContent = meta.label;
    this.state.systemHint = meta.hint || "";
    if (this.ppToneLabel)
      this.ppToneLabel.textContent = this.state.tone || "default";

    const selectedText =
      el && (el.innerText || el.textContent)
        ? (el.innerText || el.textContent).trim()
        : "";
    this.state.sourceText = selectedText;

    if (this.ppInput) {
      this.ppInput.value = "Generating...";
    }

    this.state.generatedText = "";
    if (this.ppPreview) {
      this.ppPreview.textContent = "";
      this.ppPreview.classList.add("is-hidden");
    }

    this.openPanelAtMenuPosition();

    const autoActions = new Set([
      "write",
      "rewrite",
      "shorten",
      "expand",
      "catchy",
      "grammar",
    ]);
    if (autoActions.has(action)) {
      this.autoGenerate();
    } else {
      if (this.ppInput) {
        this.ppInput.value = "";
        this.ppInput.placeholder =
          "Eg: Convert this into a friendly tone, add a CTA, keep it under 20 words…";
        this.ppInput.focus();
      }

      if (this.ppPreview) {
        this.ppPreview.textContent = "";
        this.ppPreview.classList.add("is-hidden");
      }
    }
  },

  handleTone(tone) {
    this.state.tone = tone;
    this._updateToneUI();
    this.closeAllSubmenus();
    // label update (UI)
    const pretty =
      (tone || "default").charAt(0).toUpperCase() + (tone || "").slice(1);
    if (this.ppToneLabel) this.ppToneLabel.textContent = pretty;

    if (this.isPanelOpen() && this.ppOutput) {
      // this.autoGenerate();
    }

    if (
      this.isQuickOpen() &&
      (this.state.action === "transform" || this.state.action === "write")
    ) {
      const prompt = (this.quickInput?.value || "").trim();
      if (prompt) {
        // quick->full open + generate
        this.closeQuick();
        this.openPanelAtMenuPosition();
        // ppInput me prompt set
        if (this.ppInput) this.ppInput.value = prompt;
        this.autoGenerate();
      }
    }
  },

  isPanelOpen() {
    return this.panel && !this.panel.classList.contains("is-hidden");
  },

  openPanelAtMenuPosition() {
    this.closeQuick();
    if (!this.panel) return;

    this.panel.classList.remove("is-hidden");
    this.refreshTokenStatus();

    // ✅ position now
    this.positionPanel();

    // ✅ keep it movable (scroll/resize)
    window.addEventListener("resize", this.positionPanelBound, {
      passive: true,
    });
    window.addEventListener("scroll", this.positionPanelBound, {
      passive: true,
      capture: true,
    });
  },

  _getCanvasRect() {
    const iframe = Vvveb?.Builder?.iframe || this.iframe;
    if (!iframe) return null;
    return iframe.getBoundingClientRect();
  },

  _getParent() {
    return (
      this.panel?.offsetParent ||
      document.getElementById("wysiwyg-editor") ||
      document.body
    );
  },

  _measurePanel() {
    if (!this.panel) return { w: 520, h: 320 };

    const wasHidden = this.panel.classList.contains("is-hidden");
    const prevVis = this.panel.style.visibility;
    const prevDisp = this.panel.style.display;

    if (wasHidden) this.panel.classList.remove("is-hidden");
    this.panel.style.visibility = "hidden";
    this.panel.style.display = "block";

    const r = this.panel.getBoundingClientRect();
    const out = { w: r.width || 520, h: r.height || 320 };

    this.panel.style.visibility = prevVis || "";
    this.panel.style.display = prevDisp || "";

    return out;
  },
  positionPanel() {
    if (!this.panel || !this.btn) return;

    const PAD = 10;
    const GAP = 10;
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    const parent = this._getParent();
    const parentRect = parent.getBoundingClientRect();

    const canvasRect = this._getCanvasRect();
    if (!canvasRect) return;

    const btnRect = this.btn.getBoundingClientRect();
    const { w: panelW, h: panelH } = this._measurePanel();

    // ✅ same as menu: iframe + selected element bottom space
    const iframe = Vvveb?.Builder?.iframe || this.iframe;
    const elInIframe =
      Vvveb?.WysiwygEditor?.element || Vvveb?.Builder?.selectedEl;

    const bottomSpace =
      iframe && elInIframe
        ? getElementBottomDistanceFromIframeBottom(elInIframe, iframe)
        : null;

    // ✅ default: below button
    let left = btnRect.left - parentRect.left;
    let top = btnRect.bottom - parentRect.top + GAP;

    let bottom = "";

    // ✅ convert canvas bounds into parent coordinates
    const minLeft = canvasRect.left - parentRect.left + PAD;
    const maxLeft = canvasRect.right - parentRect.left - panelW - PAD;

    const minTop = canvasRect.top - parentRect.top + PAD;
    const maxTop = canvasRect.bottom - parentRect.top - panelH - PAD;

    // ✅ clamp inside canvas only
    left = clamp(left, minLeft, Math.max(minLeft, maxLeft));
    //   top  = `${clamp(top,  minTop,  Math.max(minTop,  maxTop))}px`;
    top = "55px";
    // ✅ if space is low → move panel ABOVE button
    if (bottomSpace !== null && bottomSpace < 500) {
      // top = (btnRect.top - parentRect.top) - panelH - GAP;
      top = "auto";
      bottom = "calc(100% + 12px)";
    }

    this.panel.style.position = "absolute";
    this.panel.style.left = `calc(${left}px - 180px)`;
    this.panel.style.top = `${top}`;
    this.panel.style.bottom = `${bottom}`;
  },

  closePanel() {
    if (!this.panel) return;

    this.panel.classList.add("is-hidden");
    this.state.generatedText = "";

    if (this.ppPreview) {
      this.ppPreview.textContent = "";
      this.ppPreview.classList.add("is-hidden");
    }

    window.removeEventListener("resize", this.positionPanelBound);
    window.removeEventListener("scroll", this.positionPanelBound, true);
  },

  setLoading(isLoading) {
    if (!this.panel) return;

    this.panel.classList.toggle("ai-loading", !!isLoading);

    const loader = document.getElementById("ai-pp-loader");
    const actions = document.getElementById("ai-pp-actions");
    const output = document.getElementById("ai-pp-output");

    if (loader) loader.classList.toggle("is-hidden", !isLoading);
    if (actions) actions.classList.toggle("is-hidden", !!isLoading);

    // output visible only when not loading
    if (output) output.style.display = isLoading ? "none" : "block";
  },

  async autoGenerate() {
    //   const el = this.state.element;
    const action = this.state.action;
    const tone = this.state.tone;

    const selectedText = this.state.sourceText || "";
    const typed = (this.ppInput?.value || "").trim();
    const userPrompt = action === "transform" ? typed : "";

    const hardPrompt = userPrompt
      ? `USER_INSTRUCTION (must follow exactly): ${userPrompt}\n` +
      `Rules: If user asks word/character limit, follow strictly. If user asks "exactly N words", output exactly N words.`
      : "";

    const finalHint =
      `${hardPrompt}\n` + `${this.state.systemHint || ""}`.trim();

    if (this.ppPreview) {
      this.ppPreview.classList.remove("is-hidden");
      this.ppPreview.textContent = "Generating...";
    }

    try {
      this.setLoading(true);

      const result = await window.AIWriterAPI.generate({
        action,
        tone,
        selectedText,
        userPrompt,
        hint: finalHint,
      });

      const textRaw = result?.text || "";

      const text = this._postProcessByPrompt(textRaw, userPrompt);
      const usedTokens =
        result?.usedTokens ||
        this.estimateTokens(inputForTokens) + this.estimateTokens(text);

      const inputForTokens = `${selectedText}\n${userPrompt}\n${finalHint || ""
        }`;

      try {
        const updated = await window.ZigrowTokenAPI.consume(usedTokens);
        this.__updateTokenUI(updated);
      } catch (error) {
        console.log("Token consume failed:", error);
      }

      this.state.generatedText = text;

      if (this.ppOutput) this.ppOutput.textContent = text;
      if (this.ppInput) this.ppInput.value = "";

      if (this.ppPreview) {
        this.ppPreview.textContent = "";
        this.ppPreview.classList.add("is-hidden");
      }
    } catch (err) {
      if (this.ppOutput) this.ppOutput.textContent = `❌ ${err.message || err}`;
    } finally {
      this.setLoading(false);
    }
  },
  estimateTokens(text) {
    const s = (text || "").toString().trim();
    if (!s) return 0;
    return Math.max(1, Math.ceil(s.length / 4));
  },

  applyGenerated(mode = "replace") {
    const el = this.state.element;
    const text = (this.state.generatedText || this.ppInput?.value || "").trim();

    if (!el || !text) return;

    const oldValue = el.innerHTML;

    if (mode === "replace") {
      el.innerText = text;
    } else if (mode === "below") {
      const p = el.ownerDocument.createElement("p");
      p.innerText = text;

      if (el.parentNode) {
        el.parentNode.insertBefore(p, el.nextSibling);
      }
    }

    try {
      Vvveb.Undo.addMutation({
        type: "characterData",
        target: el,
        oldValue,
        newValue: el.innerHTML,
      });
    } catch (e) { }
  },

  _getOrCreateTextNode(el) {
    if (!el) return null;

    for (const n of el.childNodes) {
      if (n.nodeType === 3) return n; // TEXT_NODE
    }

    const tn = el.ownerDocument.createTextNode("");
    el.appendChild(tn);
    return tn;
  },

  applyReplace() {
    const el = this.state.element;
    const text = (this.state.generatedText || "").trim();
    if (!el || !text) return;

    const oldValue = el.innerHTML;

    const withBr = text.replace(/\r\n/g, "\n").replace(/\n/g, "<br>");

    el.innerHTML = withBr;

    // Amit has commented this as the text editing is being record by the time
    // try {
    //   if (oldValue !== el.innerHTML) {
    //     Vvveb.Undo.addMutation({
    //       type: "characterData",
    //       target: el,
    //       oldValue: oldValue,
    //       newValue: el.innerHTML,
    //     });
    //   }
    // } catch (e) {}

    try {
      Vvveb.Builder.selectNode(el);
    } catch (e) { }

    this.closePanel();
  },

  applyInsertBelow() {
    const el = this.state.element;
    const text = (this.state.generatedText || "").trim();
    if (!el || !el.parentNode || !text) return;

    const doc = el.ownerDocument;
    const parent = el.parentNode;

    const node = doc.createElement("p");
    node.textContent = text;

    const next = el.nextSibling; // anchor before insert
    parent.insertBefore(node, next); // insert after el

    try {
      Vvveb.Undo.addMutation({
        type: "childList",
        target: parent,
        addedNodes: [node],
        removedNodes: [],
        previousSibling: el,
        nextSibling: next,
      });
    } catch (e) { }

    try {
      Vvveb.Builder.selectNode(node);
    } catch (e) { }

    this.closePanel();
  },

  isQuickOpen() {
    return this.quickPanel && !this.quickPanel.classList.contains("is-hidden");
  },

  openQuickAtMenuPosition() {
    if (!this.quickPanel || !this.menu) return;

    const parent =
      this.quickPanel.offsetParent ||
      document.getElementById("wysiwyg-editor") ||
      document.body;

    const parentRect = parent.getBoundingClientRect();
    const menuRect = this._lastMenuRect || this.menu.getBoundingClientRect();

    const left = menuRect.left - parentRect.left;
    const top = menuRect.top - parentRect.top;

    // ✅ default positioning
    this.quickPanel.style.position = "absolute";
    //   this.quickPanel.style.left = `${Math.max(8, left)}px`;
    this.quickPanel.style.left = `auto`;

    // ✅ iframe + selected element bottom space
    const iframe = Vvveb?.Builder?.iframe || this.iframe;
    const elInIframe =
      Vvveb?.WysiwygEditor?.element || Vvveb?.Builder?.selectedEl;

    const bottomSpace =
      iframe && elInIframe
        ? getElementBottomDistanceFromIframeBottom(elInIframe, iframe)
        : null;

    if (bottomSpace !== null && bottomSpace < 500) {
      // ✅ less space → open upward
      this.quickPanel.style.top = "auto";
      this.quickPanel.style.bottom = "calc(100% + 14px)";
    } else {
      // ✅ enough space → open downward
      this.quickPanel.style.bottom = "auto";
      // this.quickPanel.style.top = `calc(${Math.max(8, top)}px + 10px)`;
      this.quickPanel.style.top = `54px`;
    }

    this.quickPanel.classList.remove("is-hidden");

    if (this.quickInput) {
      this.quickInput.value = "";
      this._updateQuickSendUI();
      setTimeout(() => this.quickInput?.focus?.(), 0);
    }
  },

  closeQuick() {
    if (!this.quickPanel) return;
    this.quickPanel.classList.add("is-hidden");
    if (this.quickInput) this.quickInput.value = "";
    this._updateQuickSendUI();
  },

  _updateToneUI() {
    const tone = (this.state.tone || "default").toLowerCase();
    const map = {
      default: "Default",
      professional: "Professional",
      friendly: "Friendly",
      luxury: "Luxury",
      bold: "Bold",
      casual: "Casual",
      direct: "Direct",
    };

    const label = map[tone] || tone.charAt(0).toUpperCase() + tone.slice(1);
    if (this.toneChipValue) this.toneChipValue.textContent = label;
    if (this.ppToneLabel) this.ppToneLabel.textContent = label;
  },

  _postProcessByPrompt(text, userPrompt) {
    const t = (text || "").toString().trim();
    const p = (userPrompt || "").toString().toLowerCase();

    const m = p.match(/(\d+)\s*words?/);
    if (!m) return t;

    const n = parseInt(m[1], 10);
    if (!n || n < 1) return t;

    const words = t.replace(/\s+/g, " ").split(" ");

    // if user said "under/less than/maximum"
    const isMax = /under|less than|max(imum)?|at most|within/.test(p);

    // if user said "exactly"
    const isExact = /exactly|only|strictly/.test(p);

    if (isMax) {
      return words.slice(0, n).join(" ");
    }

    if (isExact) {
      return words.length >= n ? words.slice(0, n).join(" ") : t;
    }

    // default: trim to n (safe)
    return words.slice(0, n).join(" ");
  },

  __updateTokenUI(data) {
    if (!data) return;

    // ✅ support NEW api keys + old fallback
    const total = Number(data.total_tokens ?? data.total ?? 5000);

    // "used" means consumed so far
    const used = Number(data.consumed_tokens ?? data.used ?? 0);

    const remaining = Number(
      data.remaining_tokens ?? data.remaining ?? total - used
    );

    document.querySelectorAll(".zg-token-used").forEach((el) => {
      el.textContent = used;
    });
    document.querySelectorAll(".zg-token-total").forEach((el) => {
      el.textContent = total;
    });

    // Optional: current credit info
    const leftInCredit = data.tokens_left_in_current_credit;
    const usedInCredit = data.used_tokens_in_current_credit;

    // ✅ main line
    if (this.tokenCountEl) this.tokenCountEl.textContent = `${used} / ${total}`;

    //   if(this.tokenRemainingEl) {
    //     if (leftInCredit !== undefined && leftInCredit !== null) {
    //       this.tokenRemainingEl.textContent = `${Number(leftInCredit)}`;
    //     } else {
    //     }
    // }
    this.tokenRemainingEl.textContent = `${remaining}`;

    const perc =
      total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0;
    if (this.tokenBarFill) this.tokenBarFill.style.width = `${perc}%`;

    const warnVal =
      leftInCredit !== undefined && leftInCredit !== null
        ? Number(leftInCredit)
        : remaining;

    if (this.tokenRow) this.tokenRow.classList.toggle("is-low", warnVal < 200);
  },

  async refreshTokenStatus() {
    try {
      const data = await window.ZigrowTokenAPI.status();
      this.__updateTokenUI(data);
    } catch (error) {
      console.error("Failed to fetch token status", error);
    }
  },

  isAnythingOpen() {
    return this.isOpen() || this.isPanelOpen() || this.isQuickOpen();
  },

  copyGeneratedText(btn) {
    const text = (
      this.state.generatedText ||
      this.ppOutput?.textContent ||
      ""
    ).trim();
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        this._copyFeedback(btn);
      })
      .catch((err) => {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        this.document.execCommand("copy");
        document.body.removeChild(ta);
        this._copyFeedback(btn);
      });
  },

  _copyFeedback(btn) {
    if (!btn) return;
    btn.classList.add("is-copied-scale");

    const original = btn.dataset.originalText || btn.textContent;
    setTimeout(() => {
      // btn.textContent = original;
      btn.classList.remove("is-copied-scale");
    }, 2000);
  },

  _bindQuickInputState() {
    if (this._quickBound) return;
    this._quickBound = true;

    this.quickInput?.addEventListener("input", () => this._updateQuickSendUI());

    this.quickInput?.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.quickSendBtn?.click();
      }
    });
  },

  _updateQuickSendUI() {
    const val = (this.quickInput?.value || "").trim();
    const hasText = val.length > 0;

    if (this.quickSendBtn) {
      this.quickSendBtn.classList.toggle("is-active", hasText);
      // optional UX: disable when empty
      this.quickSendBtn.disabled = !hasText;
    }
  },
};
Vvveb.AIWriter.positionMenuBound = Vvveb.AIWriter.positionMenu.bind(
  Vvveb.AIWriter
);

document.addEventListener("DOMContentLoaded", async () => {
  Vvveb.AIWriter?.init?.();

  //for showing tokens globally at builder loads
  window.updateTokenUI = (data) => {
    Vvveb.AIWriter?.__updateTokenUI?.(data);
    const total = Number(data.total_tokens ?? data.total ?? 0);
    const used = Number(data.consumed_tokens ?? data.used ?? 0);
    const remaining = Number(
      data.remaining_tokens ?? data.remaining ?? total - used
    );

    const aiTokenUsed = document.getElementById("zg-token-used");
    const aiTokenTotal = document.getElementById("zg-token-total");
    const aiTokenRem = document.getElementById("zg-token-remaining");

    if (aiTokenUsed) aiTokenUsed.textContent = String(used);
    if (aiTokenTotal) aiTokenTotal.textContent = String(total);
    if (aiTokenRem) aiTokenRem.textContent = String(remaining);
  };

  try {
    await Vvveb.AIWriter?.refreshTokenStatus?.();
  } catch (error) {
    console.error(e);
  }

  setInterval(() => Vvveb.AIWriter?.refreshTokenStatus?.(), 60000);
});

// ============================
// AI Writer Controller - Jayanti Changes Ends Here
// ============================
// Custom Modification - Jayanti - 07-10-25
// == Global Style Controller ==

Vvveb.GlobalCustomVariable = {
  doc: null,
  panel: null,
  select: null,
  styleEl: null,
  pairSelect: null,
  selectedPalette: null,

  init(doc) {
    this.doc = doc || window.FrameDocument;

    // UI refs
    this.panel = document.getElementById("global-style-panel");
    this.pairSelect = document.getElementById("global-font-pair");

    // ----- Font pairs (Heading + Body) -----

    const fontPairs = [
      // 🩶 Minimal modern pairings
      {
        key: "dm_sans_inter",
        label: "DM Sans + Inter",
        heading: { name: "DM Sans", provider: "google" },
        body: { name: "Inter", provider: "google" },
      },
      {
        key: "josefin_nunito",
        label: "Josefin Sans + Nunito",
        heading: { name: "Josefin Sans", provider: "google" },
        body: { name: "Nunito", provider: "google" },
      },
      {
        key: "mulish_open",
        label: "Mulish + Open Sans",
        heading: { name: "Mulish", provider: "google" },
        body: { name: "Open Sans", provider: "google" },
      },

      // ✨ Elegant serif + sans combinations
      {
        key: "cormorant_nunito",
        label: "Cormorant Garamond + Nunito Sans",
        heading: { name: "Cormorant Garamond", provider: "google" },
        body: { name: "Nunito Sans", provider: "google" },
      },
      {
        key: "playfair_inter",
        label: "Playfair Display + Inter",
        heading: { name: "Playfair Display", provider: "google" },
        body: { name: "Inter", provider: "google" },
      },
      {
        key: "crimson_lato",
        label: "Crimson Text + Lato",
        heading: { name: "Crimson Text", provider: "google" },
        body: { name: "Lato", provider: "google" },
      },
      {
        key: "ebgaramond_poppins",
        label: "EB Garamond + Poppins",
        heading: { name: "EB Garamond", provider: "google" },
        body: { name: "Poppins", provider: "google" },
      },

      // 🌸 Soft geometric sans combos
      {
        key: "quicksand_raleway",
        label: "Quicksand + Raleway",
        heading: { name: "Quicksand", provider: "google" },
        body: { name: "Raleway", provider: "google" },
      },
      {
        key: "poppins_nunito",
        label: "Poppins + Nunito",
        heading: { name: "Poppins", provider: "google" },
        body: { name: "Nunito", provider: "google" },
      },
      {
        key: "manrope_work",
        label: "Manrope + Work Sans",
        heading: { name: "Manrope", provider: "google" },
        body: { name: "Work Sans", provider: "google" },
      },

      // 🌿 Humanist, calm, soft
      {
        key: "catamaran_sourcesans",
        label: "Catamaran + Source Sans 3",
        heading: { name: "Catamaran", provider: "google" },
        body: { name: "Source Sans 3", provider: "google" },
      },
      {
        key: "nunito_worksans",
        label: "Nunito + Work Sans",
        heading: { name: "Nunito", provider: "google" },
        body: { name: "Work Sans", provider: "google" },
      },
      {
        key: "barlow_inter",
        label: "Barlow + Inter",
        heading: { name: "Barlow", provider: "google" },
        body: { name: "Inter", provider: "google" },
      },

      // 🌼 Luxury serif + clean sans
      {
        key: "lora_montserrat",
        label: "Lora + Montserrat",
        heading: { name: "Lora", provider: "google" },
        body: { name: "Montserrat", provider: "google" },
      },
      {
        key: "merriweather_open",
        label: "Merriweather + Open Sans",
        heading: { name: "Merriweather", provider: "google" },
        body: { name: "Open Sans", provider: "google" },
      },
      {
        key: "abril_nunito",
        label: "Abril Fatface + Nunito Sans",
        heading: { name: "Abril Fatface", provider: "google" },
        body: { name: "Nunito Sans", provider: "google" },
      },
      {
        key: "dmserif_jost",
        label: "DM Serif Display + Jost",
        heading: { name: "DM Serif Display", provider: "google" },
        body: { name: "Jost", provider: "google" },
      },
      {
        key: "rosario_rubik",
        label: "Rosario + Rubik",
        heading: { name: "Rosario", provider: "google" },
        body: { name: "Rubik", provider: "google" },
      },
    ];

    // New: list instead of dropdown
    const listEl = document.getElementById("font-pair-list");
    if (listEl) {
      // 1) Render items (no default "active")
      listEl.innerHTML = fontPairs
        .map(
          (p) => `
      <li class="vvv-font-pair-item" data-key="${p.key}">
        <div>
          <div class="pair-names">${p.label}</div>
         <div class="pair-sub modern">
        <span class="chip chip-h" style="font-family:'${p.heading.name}', serif;">Heading</span>
        <span class="chip chip-b" style="font-family:'${p.body.name}', sans-serif;">Body</span>
      </div>
        </div>
      </li>
    `
        )
        .join("");

      // 2) Click handler (delegate)
      listEl.addEventListener("click", (e) => {
        const item = e.target.closest(".vvv-font-pair-item");
        if (!item) return;
        const key = item.dataset.key;
        const pair = fontPairs.find((p) => p.key === key);
        if (!pair) return;

        // try {
        //   if (pair.heading.provider)
        //     Vvveb.FontsManager.addFont(
        //       pair.heading.provider,
        //       pair.heading.name,
        //       document.body
        //     );
        //   if (pair.body.provider)
        //     Vvveb.FontsManager.addFont(
        //       pair.body.provider,
        //       pair.body.name,
        //       document.body
        //     );
        // } catch (e) {}

        try {
          const currentH = this._getVar("--vvv-font-h")
            .replace(/^['"]|['"]$/g, "")
            .trim();
          const currentB = this._getVar("--vvv-font-b")
            .replace(/^['"]|['"]$/g, "")
            .trim();

          const current = fontPairs.find(
            (p) =>
              currentH &&
              currentB &&
              currentH.replace(/\s+/g, "").toLowerCase() ===
              p.heading.name.replace(/\s+/g, "").toLowerCase() &&
              currentB.replace(/\s+/g, "").toLowerCase() ===
              p.body.name.replace(/\s+/g, "").toLowerCase()
          );

          if (current) {
            const currentItem = listEl.querySelector(
              `[data-key="${current.key}"]`
            );
            if (currentItem) currentItem.classList.add("active");

            this._ensureBodyClass();
            this._syncGlobalFontHead(current);
          }
        } catch (e) { }
        // Apply fonts
        this._applyFontPair(pair);

        // UI state (make this one active)
        listEl
          .querySelectorAll(".vvv-font-pair-item.active")
          .forEach((el) => el.classList.remove("active"));
        item.classList.add("active");

        // mark builder dirty
        if (Vvveb?.Builder?.setDirty) Vvveb.Builder.setDirty(true);
      });

      // 3) (Optional) If current var matches any pair, highlight but DON'T auto-apply
      try {
        const currentH = this._getVar("--vvv-font-h");
        const currentB = this._getVar("--vvv-font-b");
        const current = fontPairs.find(
          (p) =>
            currentH &&
            currentB &&
            currentH.replace(/\s+/g, "").toLowerCase() ===
            p.heading.name.replace(/\s+/g, "").toLowerCase() &&
            currentB.replace(/\s+/g, "").toLowerCase() ===
            p.body.name.replace(/\s+/g, "").toLowerCase()
        );
        if (current) {
          const currentItem = listEl.querySelector(
            `[data-key="${current.key}"]`
          );
        }
      } catch (e) { }
    }

    // Iframe side: style tag + body class
    // this._ensureStyleEl();
    // this._ensureBodyClass();

    // Dropdown of font family
    if (this.select) {
      // try reflect current var into dropdown
      const current = this._getVar("--vvv-font-family");
      if (current) {
        const opt = Array.from(this.select.options).find(
          (o) => (o.value || "").trim() === current.trim()
        );
        if (opt) this.select.value = opt.value;
      }
      this.select.addEventListener("change", (e) => {
        this._applyFont(e.target.value || "");
        this._ensureBodyClass();
        if (Vvveb?.Builder?.setDirty) Vvveb.Builder.setDirty(true);
      });
    }
  },

  _ensureBodyClass() {
    try {
      const b = this.doc?.body;
      if (b && !b.classList.contains("vvv-global-font-on")) {
        b.classList.add("vvv-global-font-on");
      }
    } catch (e) { }
  },

  _ensureStyleEl() {
    const head = this.doc?.head;
    if (!head) return;

    this.styleEl = this.doc.getElementById("vvv-global-style");
    if (!this.styleEl) {
      this.styleEl = this.doc.createElement("style");
      this.styleEl.id = "vvv-global-style";
      this.styleEl.setAttribute("data-vvv-global", "1");
      this.styleEl.textContent = `
        
      /* body.vvv-global-font-on{ font-family: var(--vvv-font-b) !important; } */
      body{ font-family: var(--vvv-font-b) !important; }
      h1,h2,h3,h4,h5,h6{ font-family: var(--vvv-font-h) !important; }
    `.trim();
      head.appendChild(this.styleEl);
    }
  },

  // _applyFontPair(pair) {
  //   if (!this.doc || !pair) return;

  //   // 0) old values capture (for undo)
  //   const root = this.doc.documentElement;
  //   const body = this.doc.body;
  //   const oldRootStyle = root.getAttribute("style") || "";
  //   const oldBodyClass = body.className;

  //   // 1) load webfonts (as you already do)
  //   try {
  //     if (pair.heading.provider)
  //       Vvveb.FontsManager.addFont(
  //         pair.heading.provider,
  //         pair.heading.name,
  //         body,
  //         // this.doc,
  //       );
  //     if (pair.body.provider)
  //       Vvveb.FontsManager.addFont(pair.body.provider, pair.body.name, body);
  //   } catch (e) {
  //     console.log("Error while pairing fonts ", e);
  //   }

  //   // 2) write CSS variables
  //   root.style.setProperty("--vvv-font-h", pair.heading.name);
  //   root.style.setProperty("--vvv-font-b", pair.body.name);

  //   // 3) make sure body class is present
  //   this._ensureBodyClass();

  //   // 4) push undo mutations (style on :root + class on body)
  //   if (Vvveb?.Undo?.addMutation) {
  //     Vvveb.Undo.addMutation({
  //       type: "attributes",
  //       target: root,
  //       attributeName: "style",
  //       oldValue: oldRootStyle,
  //       newValue: root.getAttribute("style") || "",
  //     });

  //     Vvveb.Undo.addMutation({
  //       type: "attributes",
  //       target: body,
  //       attributeName: "class",
  //       oldValue: oldBodyClass,
  //       newValue: body.className,
  //     });
  //   }
  // },

  // jayanti New updated code
  _applyFontPair(pair) {
    if (!this.doc || !pair) return;

    const root = this.doc.documentElement;
    const body = this.doc.body;
    const head = this.doc.head;

    const oldRootStyle = root.getAttribute("style") || "";
    const oldBodyClass = body.className;
    const oldHeadContent = head.innerHTML;

    // make sure body class exists
    this._ensureBodyClass();

    // Persist everything into iframe head
    this._syncGlobalFontHead(pair);

    // optional: still register fonts for editor/runtime tracking
    try {
      if (pair.heading.provider) {
        Vvveb.FontsManager.addFont(
          pair.heading.provider,
          pair.heading.name,
          body
        );
      }

      if (pair.body.provider) {
        Vvveb.FontsManager.addFont(pair.body.provider, pair.body.name, body);
      }
    } catch (e) {
      console.log("Error while pairing fonts ", e);
    }

    // if (Vvveb?.Undo?.addMutation) {
    //   Vvveb.Undo.addMutation({
    //     type: "attributes",
    //     target: root,
    //     attributeName: "style",
    //     oldValue: oldRootStyle,
    //     newValue: root.getAttribute("style") || "",
    //   });
    //   console.log("hi amit love you");

    //   Vvveb.Undo.addMutation({
    //     type: "attributes",
    // target: body,
    //     attributeName: "class",
    //     oldValue: oldBodyClass,
    //     newValue: body.className,
    //   });
    //   console.log("hi amit love you 2");
    // }

    const newHeadContent = head.innerHTML;

    if (Vvveb?.Undo?.addMutation && oldHeadContent != newHeadContent) {
      Vvveb.Undo.addMutation({
        type: "characterData",
        target: head,
        oldValue: oldHeadContent,
        newValue: newHeadContent,
      })
    }
  },
  _getVar(name) {
    try {
      const cs = this.doc?.defaultView?.getComputedStyle(
        this.doc.documentElement
      );
      return cs?.getPropertyValue(name)?.trim() || "";
    } catch (e) {
      return "";
    }
  },

  // Color pallattes functions starts from here-
  setPallette(palette) {
    this.selectedPalette = palette;
    console.log(this.selectedPalette);
  },

  // applyPalette() {
  //   if (!this.selectedPalette || this.selectedPalette.length < 3) {
  //     console.warn("No palette selected!");
  //     return;
  //   }

  //   const frameDoc = Vvveb.Builder?.iframe?.contentDocument || document;
  //   const root = frameDoc.documentElement;

  //   // 👉 capture old root style for undo
  //   const oldRootStyle = root.getAttribute("style") || "";

  //   const paletteArray = Array.isArray(this.selectedPalette)
  //     ? this.selectedPalette
  //     : Array.from(this.selectedPalette || []);

  //   const colors = paletteArray.map(
  //     (el) => window.getComputedStyle(el).backgroundColor
  //   );

  //   root.style.setProperty("--primary-colors", colors[0], "important");
  //   root.style.setProperty("--secondary-colors", colors[1], "important");
  //   root.style.setProperty("--territory-colors", colors[2], "important");

  //   // 👉 push undo mutation
  //   if (Vvveb?.Undo?.addMutation) {
  //     Vvveb.Undo.addMutation({
  //       type: "attributes",
  //       target: root,
  //       attributeName: "style",
  //       oldValue: oldRootStyle,
  //       newValue: root.getAttribute("style") || "",
  //     });
  //   }
  // },

  // Amit has added this to solve the three colors theme change
  applyPalette() {
    if (!this.selectedPalette || this.selectedPalette.length < 3) {
      console.warn("No palette selected!");
      return;
    }

    const frameDoc = Vvveb.Builder?.iframe?.contentDocument || document;
    const head = frameDoc.head || frameDoc.querySelector("head");
    if (!head) return;

    const paletteArray = Array.isArray(this.selectedPalette)
      ? this.selectedPalette
      : Array.from(this.selectedPalette || []);

    const colors = paletteArray.map(
      (el) => frameDoc.defaultView.getComputedStyle(el).backgroundColor
    );

    const STYLE_ID = "dynamic-palette-style";

    let styleTag = frameDoc.getElementById(STYLE_ID);

    let oldContent = styleTag ? styleTag.textContent : "";

    if (!styleTag) {
      styleTag = frameDoc.createElement("style");
      styleTag.id = STYLE_ID;
      head.appendChild(styleTag);
    }

    const newContent = `
      :root {
        --primary-colors: ${colors[0]} !important;
        --secondary-colors: ${colors[1]} !important;
        --territory-colors: ${colors[2]} !important;
      }
    `;

    styleTag.textContent = newContent;

    if (Vvveb?.Undo?.addMutation && oldContent != newContent) {
      Vvveb.Undo.addMutation({
        type: "characterData",
        target: styleTag,
        oldValue: oldContent,
        newValue: newContent,
      });
    }
  },
  // Apply Logo From Here

  _getFrameDocument() {
    const doc =
      Vvveb?.Builder?.iframe?.contentDocument ||
      window.FrameDocument ||
      document;
    return doc;
  },

  _findLogoTargets(doc) {
    const targets = new Set();
    doc
      .querySelectorAll("[data-logo='navbar'],[data-logo='footer']")
      .forEach((el) => targets.add(el));

    const nb = doc.querySelector(
      "header .navbar-brand, .navbar .navbar-brand, a.navbar-brand"
    );
    if (nb) targets.add(nb);

    // footer
    const fb = doc.querySelector(
      "footer [data-logo], footer .navbar-brand, footer a.navbar-brand, footer .brand, footer h1, footer h2, footer h3, footer h4, footer h5, footer h6"
    );
    if (fb) targets.add(fb.closest("a") || fb);

    return Array.from(targets);
  },

  _mutateLogo(container, mode, value, size = 48) {
    const doc = container?.ownerDocument || document;
    const cleanText = (value || "").trim();

    function removeAllExcept(keepTags = []) {
      const keep = keepTags.map((t) => t.toUpperCase());
      Array.from(container.childNodes).forEach((node) => {
        if (node.nodeType === 1) {
          if (!keep.includes(node.tagName)) node.remove();
        } else {
          node.remove();
        }
      });
    }

    if (mode === "image") {
      const src = (value || "").trim();
      let img = container.querySelector("img");

      // if no img and no src, still allow resizing? -> NO, just return
      if (!img && !src) return;

      if (!img && src) {
        removeAllExcept([]);
        img = doc.createElement("img");
        container.appendChild(img);
      }

      removeAllExcept(["img"]);

      img.classList.add("logo-img");
      img.alt = "Logo";
      if (src) img.src = src;

      const s = Number(size || 48);
      img.style.height = s + "px";
      img.style.width = "auto";
      img.style.display = "";
      return;
    }

    if (mode === "text") {
      let span = container.querySelector(".logo-text");

      // if span doesn't exist but container has plain text, convert it once
      if (!span && !cleanText) {
        // if there is existing text already, still allow resizing:
        const existing = (container.textContent || "").trim();
        if (!existing) return;
      }

      if (!span) {
        const existing = cleanText || (container.textContent || "").trim();
        removeAllExcept([]);
        span = doc.createElement("span");
        span.className = "logo-text";
        span.textContent = existing;
        container.appendChild(span);
      }

      if (cleanText) span.textContent = cleanText;

      const s = Number(size || 24);
      span.style.fontSize = s + "px";
      span.style.lineHeight = "1.1";
      return;
    }
  },

  applyLogo({ mode, value, size }) {
    const doc = this._getFrameDocument();
    const targets = this._findLogoTargets(doc);
    if (!targets.length) return;

    const getContainer = (el) => el.querySelector("h1,h2,h3,h4,h5,h6") || el;

    // 1) capture old innerHTMLs (per target container)
    const containers = targets.map(getContainer);
    const oldHTMLs = containers.map((c) => c.innerHTML);

    // 2) perform mutations
    containers.forEach((el) => this._mutateLogo(el, mode, value, size));

    // 3) push undo mutations (one per container)
    if (Vvveb?.Undo?.addMutation) {
      containers.forEach((container, i) => {
        Vvveb.Undo.addMutation({
          type: "characterData",
          target: container,
          oldValue: oldHTMLs[i],
          newValue: container.innerHTML,
        });
      });
    }

    // 4) mark dirty
    if (Vvveb?.Builder?.setDirty) Vvveb.Builder.setDirty(true);
  },

  getCurrentLogoImage() {
    const doc = this._getFrameDocument();
    const targets = this._findLogoTargets(doc);
    if (!targets?.length) return null;

    for (const t of targets) {
      const container = t.querySelector("h1,h2,h3,h4,h5,h6") || t;
      const img = container.querySelector("img");
      const raw = img?.getAttribute("src");
      if (raw) {
        let abs = raw;
        try {
          abs = new URL(raw, doc.baseURI).href;
        } catch (e) { }
        return { src: raw, absSrc: abs };
      }
    }
    return null;
  },

  getCurrentLogoTextStyle() {
    const doc = this._getFrameDocument();
    const targets = this._findLogoTargets(doc);

    for (const t of targets) {
      const container = t.querySelector("h1,h2,h3,h4,h5,h6") || t;

      // ✅ prefer our generated span
      const span = container.querySelector(".logo-text");
      if (span && span.textContent?.trim()) {
        const fs = doc.defaultView.getComputedStyle(span).fontSize;
        return {
          text: span.textContent.trim(),
          fontSize: parseInt(fs, 10) || 24,
        };
      }

      // ✅ fallback: if no span, use container text if it's mostly text
      // const txt = (container.textContent || "").trim();
      // if (txt) {
      //   const fs = doc.defaultView.getComputedStyle(container).fontSize;
      //   return {
      //     text: txt,
      //     fontSize: parseInt(fs, 10) || 24,
      //   };
      // }
    }
    return null;
  },

  _buildGoogleFontsHref(fonts = []) {
    const cleanFonts = [...new Set((fonts || []).filter(Boolean))];
    if (!cleanFonts.length) return "";

    const families = cleanFonts
      .map(
        (font) =>
          `family=${font.replace(/ /g, "+")}:ital,wght@0,100..900;1,100..900`
      )
      .join("&");

    return `https://fonts.googleapis.com/css2?${families}&display=swap`;
  },

  _syncGlobalFontHead(pair) {
    const doc = this.doc || window.FrameDocument;
    if (!doc || !doc.head || !pair) return;

    const head = doc.head;
    const root = doc.documentElement;

    const headingFont = pair?.heading?.name || "";
    const bodyFont = pair?.body?.name || "";

    // 1) Persist Google font link in iframe head
    const href = this._buildGoogleFontsHref([headingFont, bodyFont]);

    let linkEl = doc.getElementById("vvv-global-font-link");
    if (!linkEl) {
      linkEl = doc.createElement("link");
      linkEl.id = "vvv-global-font-link";
      linkEl.rel = "stylesheet";
      head.appendChild(linkEl);
    }
    linkEl.href = href;

    // 2) Persist global font CSS in iframe head
    let styleEl = doc.getElementById("vvv-global-style");
    if (!styleEl) {
      styleEl = doc.createElement("style");
      styleEl.id = "vvv-global-style";
      styleEl.setAttribute("data-vvv-global", "1");
      head.appendChild(styleEl);
    }

    styleEl.textContent = `
    :root {
      --vvv-font-h: '${headingFont}';
      --vvv-font-b: '${bodyFont}';
    }

    body,
    body p,
    body li,
    body a,
    body span,
    body button,
    body input,
    body textarea,
    body select {
      font-family: var(--vvv-font-b) !important;
    }

    body h1,
    body h2,
    body h3,
    body h4,
    body h5,
    body h6 {
      font-family: var(--vvv-font-h) !important;
    } 
  `.trim();

    // Optional: keep inline vars too for compatibility
    // root.style.setProperty("--vvv-font-h", `'${headingFont}'`);
    // root.style.setProperty("--vvv-font-b", `'${bodyFont}'`);
  },
};

Vvveb.GlobalCustomSteps = {
  panel: null,
  stepList: null,
  steps: {},
  inited: false,
  _logoBound: false,

  init() {
    if (this.inited) return;
    const $ = (id) => document.getElementById(id);

    this.panel = $("global-style-panel");
    this.stepList = $("global-step-1");

    // Register steps
    this.steps = {
      text: $("global-step-text"),
      logo: $("global-step-logo"),
      colors: $("global-step-colors"),
      animations: $("global-step-animation"),
    };

    // Open/Close the panel
    $("global-fab")?.addEventListener("click", () => this.open());

    document.addEventListener("click", (e) => {
      if (!e.target.closest("#global-style-panel, #global-fab")) {
        this.close();
      }
    });

    window.addEventListener("blur", () => {
      if (document.activeElement.tagName === "IFRAME") {
        this.close();
      }
    });

    $("open-global-style")?.addEventListener("click", () => this.open());
    $("global-style-close").addEventListener("click", () => this.close());

    // Back buttons
    // $("global-back-home").addEventListener("click", () => this.showList());

    ["global-back-text", "global-back-logo", "global-back-colors", "global-back-animation"].forEach(
      (id) => {
        const btn = $(id);
        if (btn) {
          btn.addEventListener("click", () => this.showList());
        }
      }
    );
    // Open specific steps
    $("open-global-text")?.addEventListener("click", () => {
      this.openStep("text");

      Vvveb.GlobalCustomVariable?.onOpenText?.();
    });
    $("open-global-logo")?.addEventListener("click", () => {
      this.openStep("logo");
      // (future) Vvveb.GlobalCustomVariable?.onOpenLogo?.();
    });
    $("open-global-colors")?.addEventListener("click", () => {
      this.openStep("colors");
    });

    $("open-global-animation")?.addEventListener("click", () => {
      this.openStep("animations");
    });

    this.hideAll();
    if (this.panel) this.panel.style.display = "none";

    this.inited = true;
  },

  hideAll() {
    Object.values(this.steps).forEach(
      (el) => el && (el.style.display = "none")
    );
  },

  showList() {
    this.hideAll();
    if (this.stepList) this.stepList.style.display = "block";
    // const back = document.getElementById("global-back-home");
    // if (back) back.style.display = "none";
    ["global-back-text", "global-back-logo", "global-back-colors"].forEach(
      (id) => {
        const btn = document.getElementById(id);
        if (btn) btn.style.display = "none";
      }
    );
  },

  openStep(key) {
    this.hideAll();
    if (this.stepList) this.stepList.style.display = "none";
    const el = this.steps[key];
    if (el) el.style.display = "block";

    // const back = document.getElementById("global-back-home");
    // if (back) back.style.display = "inline-block";

    const backBtnId = `global-back-${key}`;
    const backBtn = document.getElementById(backBtnId);
    if (backBtn) backBtn.style.display = "inline-block";
    if (key === "logo") {
      this._initLogoUI();
    }
  },

  open() {
    // 🔒 lazy init: if panel/steps not wired yet, wire now
    if (!this.panel) {
      const $ = (id) => document.getElementById(id);
      this.panel = $("global-style-panel");
      this.stepList = $("global-step-1");
      this.steps = {
        text: $("global-step-text"),
        logo: $("global-step-logo"),
        colors: $("global-step-colors"),
      };
    }

    // still not found? abort silently
    if (!this.panel) return;

    // now show list + slide in
    this.showList();
    this.panel.style.display = "block";
    requestAnimationFrame(() => this.panel.classList.add("is-open"));
    // this._bindOutside();
  },

  close() {
    if (!this.panel) return;
    this.panel.classList.remove("is-open");
    setTimeout(() => {
      this.panel.style.display = "none";
      // this._unbindOutside();
    }, 150);
  },

  // open logo UI steps
  _initLogoUI() {
    if (this._logoBound) return;
    this._logoBound = true;

    const $ = (id) => document.getElementById(id);

    const openBtn = $("open-logo-gallery");
    const clearBtn = $("clear-logo-image");
    const infoEl = $("logo-selected-info");

    // ✅ radios (declare BEFORE using)
    const srcImageRadio = $("logo-src-image");
    const srcTextRadio = $("logo-src-text");

    // ✅ correct wrappers
    const imgWrap = $("logo-image-panel");
    const textWrap = $("logo-text-panel");

    const imgEl = $("global-logo-img");
    const textEl = $("global-logo-text");
    const textPreview = $("global-logo-fallback");

    const sizeSlider = $("logo-size-slider");
    const sizeValue = $("logo-size-value");
    const textSizeSlider = $("logo-text-size-slider");
    const textSizeValue = $("logo-text-size-value");

    function setInfo(msg) {
      if (infoEl) infoEl.textContent = msg || "No image selected.";
    }

    const current = Vvveb.GlobalCustomVariable.getCurrentLogoImage?.();
    if (current?.absSrc && imgEl) {
      imgEl.src = current.absSrc;
      imgEl.dataset.src = current.src;
      setInfo((current.src || "").split("/").pop());
    }
    const curText = Vvveb.GlobalCustomVariable.getCurrentLogoTextStyle?.();
    if (curText) {
      if (textEl && !textEl.value) textEl.value = curText.text;

      if (textSizeSlider) textSizeSlider.value = String(curText.fontSize || 24);
      if (textSizeValue)
        textSizeValue.textContent = String(curText.fontSize || 24);
    }

    // ✅ decide initial mode based on what exists in iframe
    const hasImg = !!current?.absSrc;
    const hasText = !!curText?.text;

    if (hasImg && srcImageRadio) srcImageRadio.checked = true;
    if (hasImg && srcTextRadio) srcTextRadio.checked = false;

    if (!hasImg && hasText && srcTextRadio) srcTextRadio.checked = true;
    if (!hasImg && hasText && srcImageRadio) srcImageRadio.checked = false;

    function refreshLogoPreview() {
      const useImage = !!srcImageRadio?.checked;

      const preview = document.getElementById("global-logo-preview");

      if (textWrap) textWrap.style.display = useImage ? "none" : "block";
      if (imgWrap) imgWrap.style.display = useImage ? "block" : "none";

      if (useImage) {
        const size = sizeSlider ? sizeSlider.value : 48;
        const previewSrc =
          imgEl?.dataset?.src || imgEl?.src || current?.absSrc || "";

        preview?.classList.add("vvv-image-mode");
        preview?.classList.remove("vvv-text-mode");

        if (imgEl && previewSrc) {
          if (!imgEl.src) imgEl.src = previewSrc; // ✅ ensure shown

          imgEl.style.display = "inline-block";
          imgEl.style.maxHeight = size + "px";
          imgEl.style.width = "auto";
          if (textPreview) textPreview.style.display = "none";
        } else {
          if (imgEl) imgEl.style.display = "none";
          if (textPreview) textPreview.style.display = "none";
        }
      } else {
        const inputVal = (textEl?.value || "").trim();
        const currentText =
          Vvveb.GlobalCustomVariable.getCurrentLogoTextStyle?.()?.text || "";
        const showText = inputVal || currentText;

        preview?.classList.add("vvv-text-mode");
        preview?.classList.remove("vvv-image-mode");

        if (textPreview) {
          textPreview.textContent = showText || "Logo"; // ✅ last fallback
          const ts = Number(textSizeSlider?.value || 24);
          textPreview.style.fontSize = ts + "px";
          textPreview.style.lineHeight = "1.1";
          textPreview.style.display = "inline-block";
        }
        if (imgEl) imgEl.style.display = "none";
      }
    }

    this._logoRefresh = refreshLogoPreview;
    // ✅ Media Gallery
    openBtn?.addEventListener("click", () => {
      try {
        if (!window.Vvveb.MediaModal) {
          Vvveb.MediaModal = new MediaModal(true);
          Vvveb.MediaModal.mediaPath = window.mediaPath;
        }

        //Current changes : 13-2-26 start
        Vvveb.MediaModal.open(null, (imgData) => {
          const payload =
            typeof imgData === "string" ? { src: imgData } : imgData || {};
          const imgUrl = payload.src;
          //Current changes : 13-2-26 ends
          if (!imgUrl) return;

          if (imgEl) {
            imgEl.src = imgUrl;
            imgEl.dataset.src = imgUrl;
          }

          setInfo(imgUrl.split("/").pop() || imgUrl);

          // ✅ force image mode
          if (srcImageRadio) srcImageRadio.checked = true;

          refreshLogoPreview();

          Vvveb.GlobalCustomVariable.applyLogo({
            mode: "image",
            value: imgUrl,
          });
        });
      } catch (e) {
        setInfo("Media gallery not available");
      }
    });

    // ✅ Clear image -> stay in image mode but empty preview (or switch to text, your choice)
    clearBtn?.addEventListener("click", () => {
      if (imgEl) {
        imgEl.removeAttribute("src");
        delete imgEl.dataset.src;
      }
      setInfo("No image selected.");
      refreshLogoPreview();

      // if you want: fallback to text mode apply
      const val = (textEl?.value || "").trim();
      Vvveb.GlobalCustomVariable.applyLogo({ mode: "text", value: val });
    });

    // ✅ radio toggles apply instantly
    srcImageRadio?.addEventListener("change", () => {
      refreshLogoPreview();
      if (imgEl?.src) {
        Vvveb.GlobalCustomVariable.applyLogo({
          mode: "image",
          value: imgEl.src,
        });
      }
    });

    srcTextRadio?.addEventListener("change", () => {
      refreshLogoPreview();
      const val = (textEl?.value || "").trim();
      Vvveb.GlobalCustomVariable.applyLogo({ mode: "text", value: val });
    });

    sizeSlider?.addEventListener("input", () => {
      const size = Number(sizeSlider.value || 48);
      if (sizeValue) sizeValue.textContent = String(size);

      refreshLogoPreview();

      const src = imgEl?.dataset?.src || imgEl?.src || "";
      Vvveb.GlobalCustomVariable.applyLogo({
        mode: "image",
        value: src,
        size,
      });
    });

    textSizeSlider?.addEventListener("input", () => {
      const ts = Number(textSizeSlider.value || 24);
      if (textSizeValue) textSizeValue.textContent = String(ts);

      refreshLogoPreview();

      const val = (textEl?.value || "").trim();
      Vvveb.GlobalCustomVariable.applyLogo({
        mode: "text",
        value: val,
        size: ts,
      });
    });

    // ✅ text live update only if text mode
    textEl?.addEventListener("input", () => {
      refreshLogoPreview();
      if (srcTextRadio?.checked) {
        const val = (textEl?.value || "").trim();
        const ts = Number(textSizeSlider?.value || 24);
        Vvveb.GlobalCustomVariable.applyLogo({
          mode: "text",
          value: val,
          size: ts,
        });
      }
    });

    // ✅ first render
    refreshLogoPreview();
  },

  _setLogoMode(mode) {
    const imgRadio = document.getElementById("logo-src-image");
    const textRadio = document.getElementById("logo-src-text");

    if (mode === "text") {
      if (textRadio) textRadio.checked = true;
      if (imgRadio) imgRadio.checked = false;
    } else {
      if (imgRadio) imgRadio.checked = true;
      if (textRadio) textRadio.checked = false;
    }

    if (typeof this._logoRefresh === "function") {
      this._logoRefresh();
    }
  },

  openLogoStep(mode = "image") {
    this.open();
    this.openStep("logo");
    this._setLogoMode(mode);
  },

  // _bindOutside() {
  //     if (this._outsideBound) return;

  //     // shared handler (parent doc targets + iframe targets)
  //     this._outsideHandler = (e) => {
  //         if (!this.panel || !this.panel.classList.contains("is-open"))
  //             return;

  //         // parent document ke elements ke liye
  //         const clickInsideParent = this.panel.contains(e.target);

  //         // iframe ke andar koi bhi click hamesha "outside" hi hogi
  //         const isFromIframe =
  //             e.view &&
  //             e.view.document &&
  //             e.view.document ===
  //                 (window.FrameDocument ||
  //                     Vvveb?.Builder?.iframe?.contentDocument);

  //         // FAB par click ignore
  //         const onFab = e.target?.closest?.("#global-fab");

  //         if ((!clickInsideParent && !onFab) || isFromIframe) {
  //             this.close();
  //         }
  //     };

  //     this._escHandler = (e) => {
  //         if (
  //             e.key === "Escape" &&
  //             this.panel?.classList.contains("is-open")
  //         ) {
  //             this.close();
  //         }
  //     };

  //     // bind on parent + iframe docs (if present)
  //     const docs = [
  //         document,
  //         window.FrameDocument || null,
  //         Vvveb?.Builder?.iframe?.contentDocument || null,
  //     ].filter(Boolean);

  //     docs.forEach((docRef) => {
  //         docRef.addEventListener("pointerdown", this._outsideHandler, true);
  //         docRef.addEventListener("keydown", this._escHandler, true);
  //     });

  //     // panel ke andar ke clicks ko capture phase me roko
  //     this.panel.addEventListener(
  //         "pointerdown",
  //         (ev) => ev.stopPropagation(),
  //         true
  //     );

  //     this._outsideBound = true;
  // },

  // _unbindOutside() {
  //     if (!this._outsideBound) return;

  //     const docs = [
  //         document,
  //         window.FrameDocument || null,
  //         Vvveb?.Builder?.iframe?.contentDocument || null,
  //     ].filter(Boolean);

  //     docs.forEach((docRef) => {
  //         docRef.removeEventListener(
  //             "pointerdown",
  //             this._outsideHandler,
  //             true
  //         );
  //         docRef.removeEventListener("keydown", this._escHandler, true);
  //     });

  //     this._outsideBound = false;
  // },
};

Vvveb.GlobalCustomAnimation = {

  init() {
    const currentAnimation = this.getCurrentAnimation();

    document.querySelectorAll(".animation-item")
      .forEach(btn => {

        btn.classList.toggle(
          "selected",
          btn.dataset.animation === currentAnimation
        );

      });
  },

  apply(animationClass) {

    const iframeDoc =
      Vvveb.Builder.iframe.contentDocument;

    if (!iframeDoc) return;

    this.ensureAnimationScript(iframeDoc);

    const animations = [
      "z-fade-up-scroll",
      "z-slide-left-scroll",
      "z-slide-right-scroll",
      "z-zoom-in-scroll",
    ];

    iframeDoc.querySelectorAll(`
  h1,h2,h3,h4,h5,h6,
  p,
  img,
  i, label, input,
  span:not(.vvveb-add-btn-text):not(.vvveb-add-btn-plus),
  a,
  li,
  blockquote,
  small,
  button:not(.vvveb-add-link-btn):not(form button)
`).forEach(el => {

      if (
        el.closest("[data-vvveb-helpers]") ||
        el.closest(".vvveb-add-btn") ||
        el.closest(".vvveb-add-link-btn")
      ) {
        return;
      }

      animations.forEach(anim => {
        el.classList.remove(anim);
      });

      el.classList.remove("animate");
      void el.offsetWidth;
      el.classList.add(animationClass);

    });

    this.initAnimations(iframeDoc);
    this.init();

  },

  initAnimations(doc) {
    if (this.observer) {
      this.observer.disconnect();
    }

    doc.querySelectorAll(".animate")
      .forEach(el => {
        el.classList.remove("animate");
      });

    this.observer = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            this.observer.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.2
      }
    );

    doc.querySelectorAll('[class*="-scroll"]')
      .forEach(el => {
        this.observer.observe(el);
      });
  },

  ensureAnimationScript(doc) {

    if (doc.getElementById("vvv-animation-script")) {
      return;
    }

    const script = doc.createElement("script");
    script.id = "vvv-animation-script";

    script.textContent = `
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    document.querySelectorAll('[class*="-scroll"]')
      .forEach(el => {
        observer.observe(el);
      });
  `;

    doc.body.appendChild(script);
  },

  getCurrentAnimation() {
    const doc = Vvveb.Builder.iframe.contentDocument;
    const animations = [
      "z-fade-up-scroll",
      "z-slide-left-scroll",
      "z-slide-right-scroll",
      "z-zoom-in-scroll"
    ];

    for (const anim of animations) {
      const found = doc.querySelector("." + anim);
      if (found) {
        return anim;
      }
    }
    return null;
  },
};

document.addEventListener("click", (e) => {

  const btn = e.target.closest(".animation-item");

  if (!btn) return;

  const animation =
    btn.dataset.animation;

  const iframeDoc =
    Vvveb.Builder.iframe.contentDocument;

  const oldAnimation = iframeDoc.body.innerHTML;

  Vvveb.GlobalCustomAnimation.apply(animation);

  const newAnimation = iframeDoc.body.innerHTML;

  if (oldAnimation != newAnimation) {
    Vvveb.Undo.addMutation({
      type: "characterData",
      target: iframeDoc.body,
      oldValue: oldAnimation,
      newValue: newAnimation,
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  Vvveb.GlobalCustomAnimation.init();
});

document.addEventListener("DOMContentLoaded", () => {
  Vvveb.GlobalCustomSteps.init();
});

window.addEventListener("load", () => {
  try {
    Vvveb.GlobalCustomSteps.init();
  } catch (e) { }
});

// / ---- Hook for Global color palatte
document.querySelectorAll(".palette-card").forEach((card) => {
  card.addEventListener("click", () => {
    const colors = Array.from(card.querySelectorAll(".color-swatch"));

    Vvveb.GlobalCustomVariable.setPallette(colors);

    document
      .querySelectorAll(".palette-card")
      .forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    Vvveb.GlobalCustomVariable.applyPalette();
    if (Vvveb?.Builder?.setDirty) Vvveb.Builder.setDirty(true);
  });
});

// Amit's code for disable the undo and redo button

// Amit's code for disable the undo and redo button

// ---------- Inject Font Awesome CSS into iframe ----------//
(function () {
  function injectIconCss(href, id = "fa-cdn") {
    const doc = Vvveb?.Builder?.iframe?.contentDocument || window.FrameDocument;
    if (!doc?.head) return;
    let link =
      doc.head.querySelector(`#${id}[rel="stylesheet"]`) ||
      doc.head.querySelector(`link[href="${href}"]`);
    if (!link) {
      link = doc.createElement("link");
      link.rel = "stylesheet";
      link.id = id;
      link.href = href;
      doc.head.appendChild(link);
    }
  }
  window.addEventListener("vvveb.iframe.loaded", function () {
    injectIconCss(
      "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css",
      "fa-cdn"
    );
  });
})();

// ---------- Custom Icon Font Awesome Library ----------//
Vvveb.IconCustomLibrary = {
  modal: null,
  grid: null,
  search: null,
  selectedEl: null,
  activeStyle: "solid",
  _faList: null,
  _faVersion: "6.5.0",
  _page: 0,
  _pageSize: 180,
  _loadingEl: null,
  _loadMoreBtn: null,

  init() {
    this.modal = document.getElementById("icon-popup");
    this.grid = document.getElementById("icon-grid");
    this.search = document.getElementById("icon-search");
    this._loadingEl = document.getElementById("icon-loading");
    this._loadMoreBtn = document.getElementById("icon-load-more");
    this._packChip = document.getElementById("icon-pack-chip");
    this._countEl = document.getElementById("icon-count");
    if (!this.modal || !this.grid) return;

    // style tabs
    this.modal.querySelectorAll("#fa-style-tabs .segbtn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.modal
          .querySelectorAll("#fa-style-tabs .segbtn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeStyle = btn.dataset.style;
        this._page = 0;
        this.render(this.search?.value?.trim().toLowerCase() || "");
      });
    });

    // search
    // smart search: auto-switch styles based on results/intent
    this.search?.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      this._page = 0;

      if (this._faList) {
        const count = (style) =>
          this._faList.filter(
            (it) => it.style === style && (!q || it.search.includes(q))
          ).length;

        const cSolid = count("solid");
        const cRegular = count("regular");
        const cBrands = count("brands");

        // 1) brand intent? jump to brands if it has hits
        if (
          q &&
          this.activeStyle !== "brands" &&
          this._looksLikeBrand?.(q) &&
          cBrands > 0
        ) {
          this._activateStyleTab("brands");
        } else {
          // 2) otherwise: if current style has 0 hits, go where hits exist
          if (this.activeStyle === "solid" && cSolid === 0) {
            if (cBrands > 0) this._activateStyleTab("brands");
            else if (cRegular > 0) this._activateStyleTab("regular");
          } else if (this.activeStyle === "brands" && cBrands === 0) {
            // your specific ask: brands → regular if regular has icon
            if (cRegular > 0) this._activateStyleTab("regular");
            else if (cSolid > 0) this._activateStyleTab("solid");
          } else if (this.activeStyle === "regular" && cRegular === 0) {
            if (cSolid > 0) this._activateStyleTab("solid");
            else if (cBrands > 0) this._activateStyleTab("brands");
          }
        }
      }

      this.render(q);
    });

    // close
    const close = () => this.close();
    document.getElementById("icon-close-btn")?.addEventListener("click", close);
    document
      .getElementById("icon-close-btn-2")
      ?.addEventListener("click", close);

    // load more
    // this._loadMoreBtn?.addEventListener("click", () => {
    //     this._page++;
    //     this.render(
    //         this.search?.value?.trim().toLowerCase() || "",
    //         /*append*/ true
    //     );
    // });

    if (this._loadMoreBtn) {
      this._loadMoreBtn.style.display = "none";
    }

    // Infinite scroll (load more automatically)
    const scrollContainer = this.grid;

    if (scrollContainer && !scrollContainer.__iconInfiniteScrollBound) {
      scrollContainer.__iconInfiniteScrollBound = true;

      scrollContainer.addEventListener("scroll", () => {
        console.log("scrolling icon grid...");

        if (!this.modal || this.modal.style.display === "none") return;

        const el = scrollContainer;
        const nearBottom =
          el.scrollTop + el.clientHeight >= el.scrollHeight - 150;

        if (!nearBottom) return;

        // 🔎 abhi jitne icons load hue hain vs total check karo
        const q = this.search?.value?.trim().toLowerCase() || "";
        const qq = q.toLowerCase();

        const filtered = (this._faList || []).filter(
          (it) =>
            (this.activeStyle ? it.style === this.activeStyle : true) &&
            (!qq || it.search.includes(qq))
        );

        const alreadyLoaded = this.grid?.children?.length || 0;
        if (alreadyLoaded >= filtered.length) {
          // sab aa chuka, aur load mat karo
          return;
        }

        // next page load
        this._page++;
        this.render(q, /* append */ true);
      });
    }
  },

  async open(el) {
    this.selectedEl = el || Vvveb?.Builder?.selectedEl || null;
    if (!this.modal) this.init();
    if (!this.modal || !this.selectedEl) return;

    this.activeStyle = this._detectStyle(this.selectedEl); // solid/regular/brands
    // activate corresponding segmented tab
    this.modal
      .querySelectorAll("#fa-style-tabs .segbtn")
      .forEach((b) =>
        b.classList.toggle("active", b.dataset.style === this.activeStyle)
      );

    await this.ensureFALoaded();
    this._page = 0;
    this.search && (this.search.value = "");
    this.render("");
    this.modal.style.display = "inline-flex";
  },

  close() {
    if (this.modal) this.modal.style.display = "none";
    if (
      this.selectedEl &&
      window.Vvveb?.IconSettings &&
      window.Vvveb.IconSettings.target === this.selectedEl &&
      typeof window.Vvveb.IconSettings._updatePreview === "function"
    ) {
      window.Vvveb.IconSettings._updatePreview();
    }
    this.selectedEl = null;
  },

  async ensureFALoaded() {
    if (this._faList && Array.isArray(this._faList)) return;

    const cacheKey = `fa-icons-list@${this._faVersion}`;
    try {
      const c = localStorage.getItem(cacheKey);
      if (c) {
        this._faList = JSON.parse(c);
        return;
      }
    } catch { }

    // 👇 same-origin first, then safe mirrors, then CDNs
    const urls = [
      `${location.origin}/libs/fontawesome/icons-${this._faVersion}.json`,
      "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/metadata/icons.json",
      `https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@${this._faVersion}/metadata/icons.json`,
      `https://unpkg.com/@fortawesome/fontawesome-free@${this._faVersion}/metadata/icons.json`,
    ];

    let meta = null;
    this._toggleLoading(true);
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          cache: "force-cache",
          mode: "cors",
        });
        if (res.ok) {
          meta = await res.json();
          break;
        }
      } catch { }
    }
    this._toggleLoading(false);

    if (!meta) {
      console.warn("FA metadata could not be loaded (network/CORS).");
      // soft fallback so UI remains usable (no repeating alerts)
      this._faList = [
        {
          cls: "fa-solid fa-house",
          label: "Home",
          name: "house",
          style: "solid",
          search: "home house",
        },
        {
          cls: "fa-solid fa-user",
          label: "User",
          name: "user",
          style: "solid",
          search: "user person account",
        },
      ];
      return;
    }

    const list = [];
    for (const [name, m] of Object.entries(meta)) {
      const label = (m.label || name).trim();
      const terms = (m.search?.terms || []).join(" ");
      (m.styles || []).forEach((style) => {
        const family =
          style === "brands"
            ? "fa-brands"
            : style === "regular"
              ? "fa-regular"
              : "fa-solid";
        list.push({
          cls: `${family} fa-${name}`,
          label,
          name,
          style,
          search: `${label} ${name} ${terms}`.toLowerCase(),
        });
      });
    }
    this._faList = list.sort((a, b) => a.name.localeCompare(b.name));
    try {
      localStorage.setItem(cacheKey, JSON.stringify(this._faList));
    } catch { }
  },

  render(q, append = false) {
    if (!this._faList) return;
    const qq = (q || "").toLowerCase().trim();

    // filter + count
    const filtered = this._faList.filter(
      (it) =>
        (this.activeStyle ? it.style === this.activeStyle : true) &&
        (!qq || it.search.includes(qq))
    );
    this._updateHeader(filtered.length);

    // pagination
    const end = Math.min(filtered.length, (this._page + 1) * this._pageSize);
    const slice = filtered.slice(0, end);

    if (!append) this.grid.innerHTML = "";
    const html = slice
      .slice(append ? this.grid.children.length : 0)
      .map(
        (it) => `
    <button class="icon-item" role="listitem" data-cls="${it.cls}" title="${it.label}">
      <i class="${it.cls}" aria-hidden="true"></i>
      <small>${it.label}</small>
    </button>
  `
      )
      .join("");
    this.grid.insertAdjacentHTML("beforeend", html);

    // bind once
    this.grid.querySelectorAll(".icon-item").forEach((btn) => {
      if (btn.__bound) return;
      btn.__bound = true;
      btn.addEventListener("click", () =>
        this.apply(btn.getAttribute("data-cls"))
      );
    });

    // load more toggle
    this._loadMoreBtn.style.display =
      end < filtered.length ? "inline-block" : "none";
  },

  apply(newClasses) {
    const el = this.selectedEl || Vvveb?.Builder?.selectedEl;
    if (!el) return;

    const iconSettings = window.Vvveb?.IconSettings;
    if (iconSettings && iconSettings.target === el) {
      iconSettings.stageIconClass(newClasses);
      this.close();
      return;
    }


    const old = el.getAttribute("class") || "";
    const parts = old.split(/\s+/).filter(Boolean);

    // keep utility classes (spacing/visibility/sizes) but drop old icon families
    const keep = parts.filter(
      (c) =>
        /^(m|p)[trblxy]?-\d+$/.test(c) ||
        /^(me|ms|mx|my|mt|mb|ms|me)-\d+$/.test(c) ||
        /^text-\w+/.test(c) ||
        /^d-\w+/.test(c) ||
        /^float-\w+/.test(c) ||
        /^(fa|la)-(xs|sm|lg|\d+x)$/.test(c) // size utilities OK
    );

    el.setAttribute("class", [...keep, ...newClasses.split(/\s+/)].join(" "));

    // Vvveb?.Undo?.addMutation &&
    // Vvveb.Undo.addMutation({
    //   type: "attributes",
    //   target: el,
    //   attributeName: "class",
    //   oldValue: old,
    //   newValue: el.getAttribute("class"),
    // });

    Vvveb?.Builder?.setDirty?.(true);
    Vvveb?.Builder?.selectElement?.(el);
    this.close();
  },

  _detectStyle(el) {
    const cls = el.className || "";
    if (/\bfa-brands\b/.test(cls)) return "brands";
    if (/\bfa-regular\b/.test(cls)) return "regular";
    return "solid";
  },

  _updateHeader(total) {
    const styleLabel =
      this.activeStyle.charAt(0).toUpperCase() + this.activeStyle.slice(1);
    if (this._packChip) {
      this._packChip.innerHTML = `<i class="fa-brands fa-font-awesome" aria-hidden="true"></i>
      <span class="chip-text">Font Awesome • ${styleLabel}</span>`;
    }
    if (this._countEl)
      this._countEl.textContent = `${(total || 0).toLocaleString()} icons`;
  },

  _toggleLoading(on) {
    if (!this._loadingEl) return;
    this._loadingEl.style.display = on ? "flex" : "none";
  },

  _activateStyleTab(style) {
    this.activeStyle = style;
    const tabs = this.modal?.querySelectorAll("#fa-style-tabs .segbtn");
    tabs?.forEach((b) =>
      b.classList.toggle("active", b.dataset.style === style)
    );
  },

  _looksLikeBrand(q) {
    const brands = [
      "facebook",
      "instagram",
      "whatsapp",
      "linkedin",
      "twitter",
      "x",
      "youtube",
      "tiktok",
      "github",
      "gitlab",
      "slack",
      "dribbble",
      "behance",
      "medium",
      "telegram",
      "snapchat",
      "pinterest",
      "reddit",
      "spotify",
      "apple",
      "google",
      "microsoft",
      "amazon",
    ];
    return brands.some((b) => q.includes(b));
  },
};

Vvveb.IconSettings = {
  modal: null,
  target: null,
  _bound: false,

  stagedColor: null,
  stagedSize: null,
  _originalFontSize: null,
  _baseFontSize: null, // for size calculations
  _sizeTouched: false,

  // additional staged properties for other attributes if needed
  stagedIconClass: null,

  _originalClass: null,
  _originalStyle: null,

  linkRow: null,
  linkInput: null,
  linkEl: null,
  _originalHref: null,
  _originalTarget: null,
  _originalLinkInputValue: null,

  init() {
    if (this._bound) {
      return;
    }
    this.modal = document.getElementById("icon-settings-popup");
    if (!this.modal) return;

    this.colorInput = document.getElementById("icon-settings-color-input");
    this.colorSwatch = document.getElementById("icon-settings-color-swatch");
    this.sizeGroup = document.getElementById("icon-settings-size-group");
    this.chooseBtn = document.getElementById("icon-settings-choose-icon");
    this.previewEl = document.getElementById("icon-settings-preview");
    this.linkRow = document.getElementById("icon-settings-link-row");
    this.linkInput = document.getElementById("icon-settings-link-input");

    // To close the modal
    const cancel = () => this.cancel();

    document
      .getElementById("icon-settings-close-x")
      .addEventListener("click", cancel);

    document
      .getElementById("icon-settings-cancel")
      ?.addEventListener("click", cancel);

    document
      .querySelector(".vvv-icon-modal__backdrop[data-dismiss='icon-settings']")
      ?.addEventListener("click", () => {
        console.log("outsideclick");
        cancel();
      });

    // to close the modal whenever we click outside
    document.addEventListener("click", (e) => {
      // Modal open nahi ho to ignore
      if (!this.modal || this.modal.style.display !== "flex") return;

      if (this.modal.contains(e.target)) return;

      const iconLib = document.getElementById("icon-popup");
      if (iconLib && iconLib.contains(e.target)) {
        return;
      }

      // Otherwise → outside click → close modal
      this.cancel();
    });

    document
      .getElementById("icon-settings-apply")
      ?.addEventListener("click", () => {
        this.apply();
      });

    // choose icon - open icon library
    this.chooseBtn?.addEventListener("click", () => {
      if (!this.target) return;
      // this.close()
      window.Vvveb?.IconCustomLibrary?.open?.(this.target);
    });

    // Color
    this.colorInput?.addEventListener("input", (e) => {
      const color = e.target.value;
      this.stagedColor = color;
      if (this.colorSwatch) {
        this.colorSwatch.style.backgroundColor = color;
      }
      this._updatePreview();
    });

    // Color - Swatch color -> open native color input
    this.colorSwatch?.addEventListener("click", () => {
      this.colorInput?.click();
    });

    // Size Buttons
    this.sizeGroup?.addEventListener("click", (e) => {
      const btn = e.target.closest(".icon-size-btn");
      if (!btn) return;
      const size = btn.dataset.size;
      this.stagedSize = size;
      this._sizeTouched = true;

      this.sizeGroup
        .querySelectorAll(".icon-size-btn")
        .forEach((b) => b.classList.toggle("is-active", b === btn));
      this._updatePreview();
    });

    this._bound = true;
  },

  open(el) {
    this.init();
    this.target = el || Vvveb?.Builder?.selectedEl || null;
    if (!this.modal || !this.target) return;

    window.Vvveb?.Builder?.selectNode?.(this.target);
    const iconEl = this._getIconElement();
    if (!iconEl) return;

    // Save original style here for Undo
    this._originalClass = iconEl.getAttribute("class") || "";
    this._originalStyle = iconEl.getAttribute("style") || "";
    this._hasColorChange = false;
    this._originalFontSize = iconEl.style.fontSize || "";
    this._sizeTouched = false;

    // Add this line to save the original icon class for potential undo/restore
    this.stagedIconClass = iconEl.getAttribute("class") || "";

    const doc = iconEl.ownerDocument;
    const win = doc.defaultView || window;
    const computed = win.getComputedStyle(iconEl);
    const currentColor =
      iconEl.style.color ||
      this._getBaseComputedColor(iconEl) ||
      "rgb(0,0,0)";

    const hex = this._rgbToHex(currentColor);
    this.stagedColor = hex;

    this._baseFontSize = this._getPersistentBaseSize(iconEl); // for relative size calculations

    const detectSize = this._detectCurrentSize(iconEl);
    this.stagedSize = detectSize || "original";

    if (this.colorInput) this.colorInput.value = hex;
    if (this.colorSwatch) this.colorSwatch.style.background = hex;

    this.sizeGroup
      ?.querySelectorAll(".icon-size-btn")
      .forEach((b) =>
        b.classList.toggle("is-active", b.dataset.size === detectSize),
      );

    // Preview update with choose btn
    this._updatePreview();

    const linkEl =
      this.target.tagName === "A"
        ? this.target
        : this.target.closest("a");
    this.linkEl = linkEl || null;

    if (this.linkRow) {
      if (this.linkEl) {
        this.linkRow.style.display = "";
        const href = (this.linkEl.getAttribute("href") || "").trim();
        this._originalHref = href;
        this._originalTarget =
          this.linkEl.getAttribute("target") || null;

        const showValue =
          !href || href === "#" || href.startsWith("#") ? "" : href;
        this._originalLinkInputValue = showValue;

        if (this.linkInput) this.linkInput.value = showValue;
      } else {
        this.linkRow.style.display = "none";
        this._originalHref = null;
        this._originalTarget = null;
        this._originalLinkInputValue = "";
        if (this.linkInput) this.linkInput.value = "";
      }
    }

    this.modal.style.display = "flex";
  },

  close() {
    if (this.modal) this.modal.style.display = "none";
    if (this.previewEl) this.previewEl.innerHTML = "";

    this.target = null;
    this.stagedColor = null;
    this.stagedSize = null;
    this._originalFontSize = null;
    this._sizeTouched = false;
    this._baseFontSize = null;
    // Add stagedIconClass reset here to ensure it doesn't carry over to the next icon edit session
    this.stagedIconClass = null;
    this._originalClass = null;
    this._originalStyle = null;

    // 🔗 NEW:
    this.linkEl = null;
    this._originalHref = null;
    this._originalTarget = null;
    this._originalLinkInputValue = null;
    if (this.linkInput) this.linkInput.value = "";
  },

  apply() {
    if (!this.target) {
      this.close();
      return;
    }

    const el = this._getIconElement();
    if (!el) {
      this.close();
      return;
    }
    const undoTarget = this.linkEl || el.parentElement || el;
    const undoOldHtml = undoTarget ? undoTarget.parentElement.outerHTML : "";

    const oldClass = el.getAttribute("class");
    const oldStyle = el.getAttribute("style");
    const oldInnerHtml = el.parentElement.innerHTML;
    // console.log("oldInnerHtml: ", oldInnerHtml);

    if (this.stagedIconClass && this.stagedIconClass.trim()) {
      const parts = (oldClass || "").split(/\s+/).filter(Boolean);

      const keep = parts.filter(
        (c) =>
          /^(m|p)[trblxy]?-\d+$/.test(c) ||
          /^(me|ms|mx|my|mt|mb)-\d+$/.test(c) ||
          /^text-\w+/.test(c) ||
          /^d-\w+/.test(c) ||
          /^float-\w+/.test(c) ||
          /^(fa|la)-(xs|sm|lg|\d+x)$/.test(c)
      );

      el.setAttribute(
        "class",
        [...keep, ...this.stagedIconClass.split(/\s+/).filter(Boolean)].join(" ")
      );
    }

    if (this.stagedColor) {
      el.style.color = this.stagedColor;
    }

    const sizeClasses = [
      "fa-xs",
      "fa-sm",
      "fa-lg",
      "fa-1x",
      "fa-2x",
      "fa-3x",
      "fa-4x",
      "fa-5x",
      "fa-6x",
      "fa-7x",
      "fa-8x",
      "fa-9x",
      "fa-10x",
    ];

    let newClass = el.getAttribute("class") || "";

    if (this._sizeTouched) {
      const base = parseFloat(this._getPersistentBaseSize(el)) || 16;

      if (this.stagedSize === "original") {
        el.style.fontSize = `${Math.round(base)}px`;
      } else {
        el.style.fontSize = this._getRelativeFontSize(
          this.stagedSize,
          base,
        );
      }

      const parts = (el.getAttribute("class") || "")
        .split(/\s+/)
        .filter(Boolean)
        .filter((c) => !sizeClasses.includes(c));

      newClass = parts.join(" ");
      el.className = newClass;
    }

    const newStyle = el.getAttribute("style") || "";
    // console.log("Hey, Amit this 13937 and here is the element", el);

    // if (oldStyle !== newStyle && Vvveb?.Undo?.addMutation) {
    //   Vvveb.Undo.addMutation({
    //     type: "attributes",
    //     target: el,
    //     attributeName: "style",
    //     oldValue: oldStyle,
    //     newValue: newStyle,
    //   });
    // }
    // if (oldClass !== newClass && Vvveb?.Undo?.addMutation) {
    //   Vvveb.Undo.addMutation({
    //     type: "attributes",
    //     target: el,
    //     attributeName: "class",
    //     oldValue: oldClass,
    //     newValue: newClass,
    //   });
    // }
    const newInnerHtml = el.parentElement.innerHTML;
    // console.log("newInnerHtml: ", newInnerHtml);

    if (this.linkRow.style.display == "none" && Vvveb?.Undo?.addMutation && oldInnerHtml != newInnerHtml) {
      Vvveb.Undo.addMutation({
        type: "characterData",
        target: el.parentElement,
        oldValue: oldInnerHtml,
        newValue: newInnerHtml,
      });
    }

    // 🔗 NEW: apply link from input to <a>
    // 🔗 Apply social link (static https://)
    if (
      this.linkInput &&
      this.linkEl &&
      this.linkRow &&
      this.linkRow.style.display !== "none"
    ) {
      const rawInput = (this.linkInput.value || "").trim();
      const originalInput = (this._originalLinkInputValue || "").trim();

      if (rawInput !== originalInput) {
        const oldHref =
          this._originalHref ??
          this.linkEl.getAttribute("href") ??
          "";
        const oldTarget =
          this._originalTarget ?? this.linkEl.getAttribute("target");

        let href = (this.linkInput.value || "").trim();

        if (!href || /^#+$/.test(href)) {
          this.linkEl.removeAttribute("href");
          this.linkEl.removeAttribute("target");
        } else {
          if (
            !/^https?:\/\//i.test(href) &&
            !href.startsWith("/") &&
            !href.startsWith("mailto:") &&
            !href.startsWith("tel:")
          ) {
            href = "https://" + href;
          }

          this.linkEl.setAttribute("href", href);
          this.linkEl.setAttribute("target", "_blank");
        }

        if (href) {
          this.linkEl.setAttribute("href", href);
          this.linkEl.setAttribute("target", "_blank");
        } else {
          this.linkEl.removeAttribute("href");
          this.linkEl.removeAttribute("target");
        }

        const finalHref = this.linkEl.getAttribute("href") || "";
        const finalTarget = this.linkEl.getAttribute("target");

        // if (Vvveb?.Undo?.addMutation) {
        //     if (oldHref !== finalHref) {
        //         Vvveb.Undo.addMutation({
        //             type: "attributes",
        //             target: this.linkEl,
        //             attributeName: "href",
        //             oldValue: oldHref,
        //             newValue: finalHref,
        //         });
        //     }
        //     if (oldTarget !== finalTarget) {
        //         Vvveb.Undo.addMutation({
        //             type: "attributes",
        //             target: this.linkEl,
        //             attributeName: "target",
        //             oldValue: oldTarget,
        //             newValue: finalTarget,
        //         });
        //     }
        // }
      }

      const undoNewHtml = undoTarget ? undoTarget.parentElement.outerHTML : "";

      if (Vvveb?.Undo?.addMutation && undoOldHtml !== undoNewHtml) {
        Vvveb.Undo.addMutation({
          type: "characterData",
          target: undoTarget.parentElement,
          oldValue: undoOldHtml,
          newValue: undoNewHtml,
        });
      }
    }

    this.close();
  },

  cancel() {

    const iconEl = this._getIconElement();
    if (iconEl) {
      if (this._originalClass != null) {
        iconEl.setAttribute("class", this._originalClass);
      }
      if (this._originalStyle != null) {
        if (this._originalStyle) {
          iconEl.setAttribute("style", this._originalStyle);
        } else {
          iconEl.removeAttribute("style");
        }
      }
    }

    if (this.target) {
      if (this._originalClass != null) {
        this.target.setAttribute("class", this._originalClass);
      }
      if (this._originalStyle != null) {
        if (this._originalStyle) {
          this.target.setAttribute("style", this._originalStyle);
        } else {
          this.target.removeAttribute("style");
        }
      }
    }
    // 🔗 NEW: restore link href/target
    if (this.linkEl) {
      if (this._originalHref != null) {
        if (this._originalHref) {
          this.linkEl.setAttribute("href", this._originalHref);
        } else {
          this.linkEl.removeAttribute("href");
        }
      }
      if (this._originalTarget != null) {
        if (this._originalTarget) {
          this.linkEl.setAttribute("target", this._originalTarget);
        } else {
          this.linkEl.removeAttribute("target");
        }
      }
    }
    this.close();
  },

  stageIconClass(newClass) {
    if (!this.target) return;

    this.stagedIconClass = newClass || "";
    this._updatePreview();
  },
  _rgbToHex(rgb) {
    if (!rgb) return "#000000";

    if (rgb.startsWith("#")) return rgb;

    const m = rgb.replace(/\s+/g, "").match(/^rgba?\((\d+),(\d+),(\d+)/i);

    if (!m) return "#000000";
    const toHex = (v) => {
      const n = Math.max(0, Math.min(255, parseInt(v, 10) || 0));
      const h = n.toString(16);
      return h.length === 1 ? "0" + h : h;
    };
    return "#" + toHex(m[1]) + toHex(m[2]) + toHex(m[3]);
  },

  _getBaseComputedColor(el) {
    if (!el) return "rgb(0,0,0)";

    const doc = el.ownerDocument;
    const win = doc.defaultView || window;

    const wrapper = el.closest("a") || el;

    const parent = wrapper.parentNode;
    if (!parent) {
      return win.getComputedStyle(el).color || "rgb(0,0,0)";
    }

    const cloneWrap = wrapper.cloneNode(true);

    cloneWrap.style.position = "fixed";
    cloneWrap.style.left = "-99999px";
    cloneWrap.style.top = "-99999px";
    cloneWrap.style.pointerEvents = "none";
    cloneWrap.style.opacity = "0";

    parent.insertBefore(cloneWrap, wrapper.nextSibling);

    const iconClone = cloneWrap.matches("i")
      ? cloneWrap
      : cloneWrap.querySelector("i") || cloneWrap;

    const color = win.getComputedStyle(iconClone).color || "rgb(0,0,0)";

    // cleanup
    parent.removeChild(cloneWrap);

    return color;
  },

  _getRelativeFontSize(sizeKey) {
    const base = parseFloat(this._baseFontSize) || 16;

    const scaleMap = {
      smaller: 0.5,
      original: 1,
      larger: 1.5,
    };

    const scale = scaleMap[sizeKey] || 1;
    return `${Math.round(base * scale)}px`;
  },

  _detectCurrentSize(iconEl) {
    if (!iconEl) return "original";

    const doc = iconEl.ownerDocument;
    const win = doc.defaultView || window;

    const current = parseFloat(win.getComputedStyle(iconEl).fontSize);
    const base = this._getPersistentBaseSize(iconEl);

    const smaller = base * 0.5;
    const original = base;
    const larger = base * 1.5;

    const near = (a, b, tolerance = 1) => Math.abs(a - b) <= tolerance;

    if (near(current, smaller)) return "smaller";
    if (near(current, larger)) return "larger";
    return "original";
  },
  _getIconElement() {
    if (!this.target) return null;
    return this.target.matches("i")
      ? this.target
      : this.target.querySelector("i");
  },

  _getPersistentBaseSize(iconEl) {
    if (!iconEl) return 16;

    const saved = parseFloat(
      iconEl.getAttribute("data-vvveb-icon-base-size"),
    );
    if (!Number.isNaN(saved) && saved > 0) {
      return saved;
    }

    const doc = iconEl.ownerDocument;
    const win = doc.defaultView || window;
    const computed = win.getComputedStyle(iconEl);
    const base = parseFloat(computed.fontSize) || 16;

    iconEl.setAttribute("data-vvveb-icon-base-size", String(base));
    return base;
  },
  _updatePreview() {
    if (!this.previewEl || !this.target) return;

    this.previewEl.innerHTML = "";

    const source = this.target.matches("i")
      ? this.target
      : this.target.querySelector("i");

    let iconEl;

    if (source) {
      const cls = this.stagedIconClass || source.className || "";

      const isFA = /\bfa-\w+/.test(cls) || /\bfa[srb]?\b/.test(cls);

      if (isFA) {
        iconEl = source.cloneNode(true);
        iconEl.className = cls;
      } else {
        iconEl = document.createElement("i");
        iconEl.className = "fa-solid fa-circle-question";
      }
    } else {
      iconEl = document.createElement("i");
      iconEl.className = "fa-solid fa-circle-question";
    }

    // cleanup
    iconEl.removeAttribute("id");
    iconEl.removeAttribute("data-dbl-action");
    iconEl.style.pointerEvents = "none";
    iconEl.style.margin = "0";

    if (this.stagedColor) {
      iconEl.style.color = this.stagedColor;
    }

    if (this.stagedSize) {
      const base = parseFloat(this._baseFontSize) || 16;

      if (this.stagedSize === "original") {
        iconEl.style.fontSize = `${Math.round(base)}px`;
      } else {
        iconEl.style.fontSize = this._getRelativeFontSize(
          this.stagedSize,
        );
      }
    }

    const sizeClasses = [
      "fa-xs",
      "fa-sm",
      "fa-lg",
      "fa-1x",
      "fa-2x",
      "fa-3x",
      "fa-4x",
      "fa-5x",
      "fa-6x",
      "fa-7x",
      "fa-8x",
      "fa-9x",
      "fa-10x",
    ];

    if (iconEl.className) {
      iconEl.className = iconEl.className
        .split(/\s+/)
        .filter(Boolean)
        .filter((c) => !sizeClasses.includes(c))
        .join(" ");
    }

    this.previewEl.appendChild(iconEl);
  },
};

// Aos Animation in Sections 
// (function () {
//   const sectionAnimations = {
//     hero: "fade-up-big",
//     about: ["fade-left", "fade-right"],
//     services: "fade-up",
//     service: "fade-up",
//     portfolio: "zoom-in",
//     team: "fade-up-small",
//     pricing: "zoom-in",
//     contact: "fade-up",
//     faq: "fade-right",
//     reviews: "fade-up",
//     testimonial: "fade-up",
//     product: "fade-up",
//     logos: "fade-in-slow",
//     cta: "zoom-in-big",
//     default: ["fade-up", "fade-down"],
//   };

// function aosWatchdogStart() {
//     return;
// }

// function hookAosObserver(doc) {
//     return;
// }

//   function getBaseType(rawType) {
//     const t = (rawType || "").toLowerCase();
//     if (t.includes("hero")) return "hero";
//     if (t.includes("cta")) return "cta";
//     if (t.includes("about")) return "about";
//     if (t.includes("service")) return "services";
//     if (t.includes("pricing")) return "pricing";
//     if (t.includes("faq")) return "faq";
//     if (t.includes("review") || t.includes("testimonial")) return "reviews";
//     if (t.includes("portfolio")) return "portfolio";
//     if (t.includes("team")) return "team";
//     if (t.includes("product")) return "product";
//     if (t.includes("logo")) return "logos";
//     return "default";
//   }

//   function pickAnimation(type, index) {
//     const anim = sectionAnimations[type] || sectionAnimations.default;
//     return Array.isArray(anim) ? anim[index % anim.length] : anim;
//   }

//   function resetAosClasses(doc) {
//     try {
//       const nodes = doc.querySelectorAll(".aos-init, .aos-animate");
//       nodes.forEach((el) => el.classList.remove("aos-init", "aos-animate"));
//     } catch (e) {}
//   }


//   function clearAosRuntimeState(el) {
//   if (!el || el.nodeType !== 1) return;

//   el.classList.remove("aos-init", "aos-animate");

//   if (el.style) {
//     el.style.opacity = "";
//     el.style.visibility = "";
//     el.style.transform = "";
//     el.style.transition = "";
//   }
// }
//  function injectAOS(doc) {
//     return;
// }

//   function injectAosBuilderSafeCSS(doc) {
//     if (!doc || !doc.head) return;
//     if (doc.getElementById("aos-builder-safe-style")) return;

//     doc.documentElement.classList.add("vvveb-builder");

//     const style = doc.createElement("style");
//     style.id = "aos-builder-safe-style";
//     style.textContent = `
//       /* Builder mode: never hide anything */
//       html.vvveb-builder [data-aos]{
//         opacity: 1 !important;
//         visibility: visible !important;
//         transform: none !important;
//         transition: none !important;
//       }
//     `;
//     doc.head.appendChild(style);
//   }

// function applyAosToDoc(doc, source = "manual") {
//     if (!doc) return;

//     const win = doc.defaultView || window;

//     let sections;
//     try {
//         sections = doc.querySelectorAll("[data-section^='zigrow']");
//     } catch (e) {
//         return;
//     }

//     sections.forEach((section, secIndex) => {
//         const rawType = section.getAttribute("data-section") || "default";
//         const type = getBaseType(rawType);
//         let anim = pickAnimation(type, secIndex);

//         if ((win.innerWidth || 9999) < 576) {
//             if (anim === "zoom-in-big" || anim === "fade-up-big") {
//                 anim = "fade-up";
//             }
//         }

//         section.setAttribute("data-aos", anim);
//         section.removeAttribute("data-aos-delay");
//         section.classList.remove("aos-init", "aos-animate");
//         section.style.opacity = "1";
//         section.style.transform = "none";
//         section.style.visibility = "visible";

//         const heavySel =
//             ".col, .col-12, .col-sm-6, .col-md-4, .col-md-6, .col-lg-4, .col-lg-6," +
//             " .row > div, .card, .item, .service-card, .feature-box, .team-card," +
//             " .pricing-card, .faq-item, .testimonial-card, .portfolio-card";

//         section.querySelectorAll(heavySel).forEach((child, i) => {
//             child.setAttribute("data-aos", anim);
//             child.setAttribute(
//                 "data-aos-delay",
//                 String(Math.min(i * 70, 600))
//             );
//             child.classList.remove("aos-init", "aos-animate");
//             child.style.opacity = "1";
//             child.style.transform = "none";
//             child.style.visibility = "visible";
//         });

//         section.querySelectorAll("h1,h2,h3,h4,h5,h6,p,img,button,a,li").forEach((el, i) => {
//             el.setAttribute("data-aos", anim);
//             el.setAttribute(
//                 "data-aos-delay",
//                 String(Math.min(i * 25, 400))
//             );
//             el.classList.remove("aos-init", "aos-animate");
//             el.style.opacity = "1";
//             el.style.transform = "none";
//             el.style.visibility = "visible";
//         });
//     });

//     doc.querySelectorAll("[data-aos]").forEach((el) => {
//         el.classList.remove("aos-init", "aos-animate");
//         el.style.opacity = "1";
//         el.style.transform = "none";
//         el.style.visibility = "visible";
//     });
// }

//   function hookAosReapply() {
//     const fb = window.Vvveb?.Builder?.frameBody;
//     const doc = window.Vvveb?.Builder?.iframe?.contentDocument;
//     if (!fb || !doc) return;

//     if (fb.__aosBound) return;
//     fb.__aosBound = true;

//     let t;
//     const rerun = (e) => {
//       clearTimeout(t);
//       t = setTimeout(() => {
//         applyAosToDoc(doc, `event:${e?.type}`);
//       }, 80);
//     };

//     fb.addEventListener("vvveb.undo.add", rerun);
//     fb.addEventListener("vvveb.undo.restore", rerun);

//     applyAosToDoc(doc, "hookAosReapply-initial");
//   }

//   function initAosInIframe() {
//     function bindIframeLoadHook() {
//       const iframe = window.Vvveb?.Builder?.iframe;
//       if (!iframe || iframe.__aosLoadHook) return;
//       iframe.__aosLoadHook = true;

//       iframe.addEventListener("load", () => {
//     const doc = iframe.contentDocument;
// if (!doc) return;
// injectAosBuilderSafeCSS(doc);
// applyAosToDoc(doc, "iframe.load");
//       });
//     }

//     const iframe = window.Vvveb?.Builder?.iframe || null;
//     const doc = iframe?.contentDocument || window.FrameDocument || null;
//     if (!doc) return;

// bindIframeLoadHook();
// injectAosBuilderSafeCSS(doc);
// applyAosToDoc(doc, "init");
// hookAosReapply();
//   }

//   window.addEventListener("Vvveb.iframe.loaded", () => initAosInIframe());
//   window.addEventListener("vvveb.iframe.loaded", () => initAosInIframe());

//   setTimeout(() => {
//     initAosInIframe();
//   }, 0);
// })();

Vvveb.SectionPadding = {
  init: function (doc) {
    if (!doc || !doc.body) return;
    this.doc = doc;
    this.win = doc.defaultView || doc.parentWindow;
    this.pxToNum = (px) => (px ? parseFloat(px.replace("px", "")) : 0);

    this.injectStyles();
    this.applyToExisting();
    this.setupObserver();
  },

  injectStyles: function () {
    if (this.doc.getElementById("vvveb-section-padding-style")) return;
    const style = this.doc.createElement("style");
    style.id = "vvveb-section-padding-style";
    style.textContent = `
          section.section-hovered-for-edit { position: relative !important; }
          section.section-hovered-for-edit::before, section.section-hovered-for-edit::after {
              content: "↕ Drag Padding" !important;
              position: absolute !important; left: 0 !important; width: 100% !important;
              display: flex !important; align-items: center !important; justify-content: center !important;
              color: white !important; font-size: 11px !important; font-family: sans-serif !important;
              pointer-events: none !important; z-index: 9999 !important;
              background: repeating-linear-gradient(45deg, rgba(46, 5, 158, 0.4), rgba(46, 5, 158, 0.4) 10px, rgba(255, 255, 255, 0.1) 10px, rgba(255, 255, 255, 0.1) 20px) !important;
              border: 1px dashed #2e059e !important;
          }
          /* Limit handle height to 20px so it doesn't cover the whole Hero section */
          section.section-hovered-for-edit::before { height: 20px !important; top: 0 !important; }
          section.section-hovered-for-edit::after { height: 20px !important; bottom: 0 !important; }
      `;
    this.doc.head.appendChild(style);
  },

  setupInteractions: function (section) {
    if (section.dataset.paddingInited) return;
    section.dataset.paddingInited = "true";
    const self = this;

    section.addEventListener("mouseenter", () =>
      section.classList.add("section-hovered-for-edit")
    );
    section.addEventListener("mouseleave", () =>
      section.classList.remove("section-hovered-for-edit")
    );

    section.addEventListener("pointerdown", function (e) {
      if (!section.classList.contains("section-hovered-for-edit")) return;
      const rect = section.getBoundingClientRect();
      const relY = e.clientY - rect.top;

      // Only trigger if clicking the very top or very bottom (20px tolerance)
      let type =
        relY <= 20 ? "top" : relY >= rect.height - 20 ? "bottom" : null;
      if (!type) return;

      e.preventDefault();
      const startY = e.clientY;
      const cs = self.win.getComputedStyle(section);
      const prop = type === "top" ? "paddingTop" : "paddingBottom";
      const startPad = self.pxToNum(cs[prop]);
      const oldStyle = section.getAttribute("style");

      const onMove = (mEv) => {
        const delta = mEv.clientY - startY;
        // Bottom increases as you drag down (delta is positive)
        // Top increases as you drag down (delta is positive)
        const newValue = Math.max(0, startPad + delta);
        section.style[prop] = newValue + "px";
      };

      const onUp = () => {
        self.win.removeEventListener("pointermove", onMove);
        self.win.removeEventListener("pointerup", onUp);
        if (Vvveb.Undo)

          Vvveb.Undo.addMutation({
            type: "attributes",
            target: section,
            attributeName: "style",
            oldValue: oldStyle,
          });
      };
      self.win.addEventListener("pointermove", onMove);
      self.win.addEventListener("pointerup", onUp);
    });
  },

  applyToExisting: function () {
    this.doc
      .querySelectorAll("section")
      .forEach((s) => this.setupInteractions(s));
  },

  setupObserver: function () {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.tagName === "SECTION") this.setupInteractions(node);
            node
              .querySelectorAll("section")
              .forEach((s) => this.setupInteractions(s));
          }
        })
      );
    });
    observer.observe(this.doc.body, { childList: true, subtree: true });
  },
};

//--------------- Canvas Interacttions with tooltip + double click actions -----------------//
const CanvasInteractions = {
  config: {
    tipOffsetY: 14,
    tipHideDelay: 1600, // ms
    clickTapDelay: 180, // ms: single vs double click separation
    tipClass: "ci-tip",
  },

  init(doc) {
    if (!doc || doc.__ciBound__) return;
    doc.__ciBound__ = true;
    this.doc = doc;
    this.rootDoc = window.document;
    this._clickTimer = null;
    this._tipHideTimer = null;
    this._actions = new Map(); // selector -> { tip, onDblClick }

    this._injectCss();
    this._bindEvents();
  },

  // ---------- Public API ----------
  register({ selector, tip, onDblClick, resolveTarget }) {
    this._actions.set(selector, { tip, onDblClick, resolveTarget });
  },

  // ---------- Internals ----------
  _injectCss() {
    const rootDoc = this.rootDoc || window.document;
    const { config } = this;
    if (rootDoc.getElementById("ci-tip-css")) return;
    const css = `
      .${config.tipClass}{
        position:absolute; z-index:2147483647;
        background:rgba(25,25,28,.96); color:#fff;
        font:12px/1.3 system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,'Helvetica Neue',Arial;
        padding:8px 10px; border-radius:10px; box-shadow:0 8px 28px rgba(0,0,0,.25);
        pointer-events:none; white-space:nowrap;
        transform:translate(-50%,10px) scale(.98);
        opacity:0; transition:opacity .12s ease, transform .12s ease;
      }
      .${config.tipClass}.show{
        opacity:1; transform:translate(-50%,0) scale(1);
      }
      .${config.tipClass}::before{
        content:""; position:absolute; left:50%; top:-4px;
        transform:translateX(-50%) rotate(45deg);
        width:10px; height:10px; background:rgba(25,25,28,.96); border-radius:2px;
        filter:drop-shadow(0 -1px 0 rgba(0,0,0,.06));
      }

      /* when tooltip is above the element */
      .${config.tipClass}--top{
        transform:translate(-50%,-10px) scale(.98);
      }
      .${config.tipClass}--top.show{
        transform:translate(-50%,0) scale(1);
      }
      .${config.tipClass}--top::before{
        top:auto;
        bottom:-4px;
        filter:drop-shadow(0 1px 0 rgba(0,0,0,.06));
      }
    `;

    const style = rootDoc.createElement("style");
    style.id = "ci-tip-css";
    style.textContent = css;
    rootDoc.head.appendChild(style);
  },

  _bindEvents() {
    const { doc } = this;

    // Delegate click (for tooltip). Delay so dblclick can cancel it.
    doc.addEventListener(
      "click",
      (e) => {
        if (Vvveb.Builder.isPreview == false) {
          const match = this._matchTarget(e.target);
          if (!match) return;
          if (
            e.target.closest(
              "[data-vvveb-helpers], .vvveb-add-link-helper, .vvveb-add-btn-text, .vvveb-add-btn-plus, .swiper-pagination-bullet"
            )
          )
            return;

          const { element, conf } = match;

          // selection sync (optional)
          window.Vvveb?.Builder?.selectNode?.(element);

          clearTimeout(this._clickTimer);
          this._clickTimer = setTimeout(() => {
            this._showTip(
              element,
              conf.tip ||
              element.getAttribute("data-tip") ||
              "Double click to edit"
            );
          }, this.config.clickTapDelay);
        }
      },
      true
    );

    // Delegate dblclick (run action)
    doc.addEventListener(
      "dblclick",
      (e) => {
        if (Vvveb.Builder.isPreview == false) {
          const match = this._matchTarget(e.target);
          if (!match) return;

          const { element, conf } = match;

          // cancel pending single-click tooltip
          clearTimeout(this._clickTimer);
          this._clickTimer = null;

          // also hide any visible tooltip immediately on double click
          this._hideTip();

          // selection sync (optional)
          window.Vvveb?.Builder?.selectNode?.(element);

          // resolve action: priority => conf.onDblClick > data-dbl-action map
          const actionName = element.getAttribute("data-dbl-action");
          if (typeof conf.onDblClick === "function") {
            conf.onDblClick(element, e);
          } else if (actionName && this._builtinActions[actionName]) {
            this._builtinActions[actionName].call(this, element, e);
          }
          e.preventDefault();
        }
      },
      true
    );

    // Hide tip on scroll/resize/any next click bubble
    doc.addEventListener("scroll", () => this._hideTip(), true);
    doc.defaultView.addEventListener("resize", () => this._hideTip());
    doc.addEventListener(
      "click",
      () => {
        if (!this._tipHideTimer) this._hideTip();
      },
      false
    );
  },

  _matchTarget(target) {
    // 1) explicit selector registrations
    for (const [selector, conf] of this._actions.entries()) {
      let el = target.closest(selector);
      if (!el) continue;

      // optional resolver: allow action to choose *actual* target
      if (typeof conf.resolveTarget === "function") {
        el = conf.resolveTarget(el, target);
        if (!el) continue; // resolver ne bola "is click ko ignore karo"
      }

      return { element: el, conf };
    }

    // 2) fallback: data attributes allow ad-hoc usage without register()
    const el = target.closest("[data-tip], [data-dbl-action]");
    if (el) return { element: el, conf: {} };

    return null;
  },

  _showTip(el, text) {
    if (Vvveb.Builder.isPreview == false) {
      const canvasDoc = this.doc;
      const rootDoc = this.rootDoc || window.document;
      const { config } = this;

      this._hideTip();

      if (!el || !canvasDoc || !rootDoc) return;

      const r = el.getBoundingClientRect();
      const iframeEl = window.Vvveb?.Builder?.iframe;
      const iframeRect = iframeEl?.getBoundingClientRect
        ? iframeEl.getBoundingClientRect()
        : { left: 0, top: 0 };

      const win = rootDoc.defaultView || window;

      let left = iframeRect.left + r.left + r.width / 2;
      const maxLeft = win.innerWidth - 12;
      const minLeft = 12;
      left = Math.min(Math.max(left, minLeft), maxLeft);

      const tip = rootDoc.createElement("div");
      tip.className = config.tipClass;
      tip.setAttribute("role", "tooltip");
      tip.textContent = text;
      tip.style.left = left + "px";
      rootDoc.body.appendChild(tip);

      const tipRect = tip.getBoundingClientRect();
      const tipHeight = tipRect.height;
      const viewportTop = 0;
      const viewportBottom = win.innerHeight;

      let top = iframeRect.top + r.bottom + config.tipOffsetY;
      let placeAbove = false;

      if (top + tipHeight + 8 > viewportBottom) {
        const aboveTop = iframeRect.top + r.top - tipHeight - config.tipOffsetY;
        if (aboveTop >= viewportTop + 8) {
          placeAbove = true;
          top = aboveTop;
        }
      }

      if (placeAbove) {
        tip.classList.add(config.tipClass + "--top");
      }

      tip.style.top = top + "px";

      win.requestAnimationFrame(() => tip.classList.add("show"));

      this._tipHideTimer = setTimeout(() => this._hideTip(), config.tipHideDelay);
    }
  },

  _hideTip() {
    const rootDoc = this.rootDoc || window.document;
    const tip = rootDoc?.querySelector?.(`.${this.config.tipClass}`);
    if (tip) tip.remove();
    clearTimeout(this._tipHideTimer);
    this._tipHideTimer = null;
  },

  // Built-in action shortcuts (use via data-dbl-action="...")
  _builtinActions: {
    "icon-library"(el) {
      window.Vvveb?.IconCustomLibrary?.open?.(el);
    },
    "image-library"(el) {
      window.Vvveb?.ImagePicker?.open?.(el);
    },
    "text-editor"(el) {
      window.Vvveb?.TextEditor?.open?.(el);
    },
  },
};

// hook with Vvveb iframe
window.addEventListener("vvveb.iframe.loaded", function () {
  const doc = Vvveb?.Builder?.iframe?.contentDocument;
  CanvasInteractions.init(doc);

  // --- Your registrations (examples) ---

  //   7) Logo
  CanvasInteractions.register({
    selector: "[data-logo]",
    tip: "Double tap to edit logo",
    resolveTarget(matchEl, originalTarget) {
      let el = originalTarget;
      const doc = originalTarget.ownerDocument;
      while (el && el !== doc && el !== doc.documentElement) {
        if (el.hasAttribute && el.hasAttribute("data-logo")) {
          return el;
        }

        el = el.parentElement;
      }

      return null;
    },

    onDblClick(el, e) {
      Vvveb.GlobalCustomSteps.init();
      const clicked = e?.target;
      const clickedImg = clicked?.closest?.("img");
      const mode = clickedImg && el.contains(clickedImg) ? "image" : "text";
      Vvveb.GlobalCustomSteps.openLogoStep(mode);
    },
  });

  // 1) Icons: <i> elements -> open IconCustomLibrary
  CanvasInteractions.register({
    selector: "i",
    tip: "Double click to change icon",
    // onDblClick: (el) => Vvveb?.IconCustomLibrary?.open?.(el),
    onDblClick: (el) => Vvveb?.IconSettings?.open?.(el),
  });

  // 2) Images: <img> -> open image picker
  CanvasInteractions.register({
    selector: "img",
    tip: "Double click to replace image",
    onDblClick: (imgEl) => {
      try {
        if (!Vvveb.MediaModal) {
          Vvveb.MediaModal = new MediaModal(true);
          Vvveb.MediaModal.mediaPath = window.mediaPath;
        }

        Vvveb.Builder?.selectNode?.(imgEl);
        const oldSrc = imgEl.getAttribute("src") || "";
        //Current changes : 13-2-26 start

        Vvveb.MediaModal.open(null, function (imgData) {
          const payload =
            typeof imgData === "string" ? { src: imgData } : imgData || {};
          if (!imgEl || imgEl.tagName !== "IMG" || !payload.src) return;

          const hadTitle = imgEl.hasAttribute("title");
          const oldTitle = imgEl.getAttribute("title");
          const hadDesc = imgEl.hasAttribute("data-media-description");
          const oldDesc = imgEl.getAttribute("data-media-description");

          const currentSrc = imgEl.getAttribute("src") || ""; // Amit has added this
          if (currentSrc !== payload.src) {
            imgEl.setAttribute("src", payload.src);

            console.log("Called attributes on 10533");

            Vvveb?.Undo?.addMutation?.({
              type: "attributes",
              target: imgEl,
              attributeName: "src",
              oldValue: oldSrc,
              newValue: payload.src,
            });
          }

          if (payload.alt !== undefined)
            imgEl.setAttribute("alt", payload.alt || "");
          if (hadTitle) {
            imgEl.setAttribute("title", oldTitle || "");
          } else {
            imgEl.removeAttribute("title");
          }
          if (hadDesc) {
            imgEl.setAttribute("data-media-description", oldDesc || "");
          } else {
            imgEl.removeAttribute("data-media-description");
          }

          //Current changes : 13-2-26 ends
          Vvveb.Builder?.selectNode?.(imgEl);
        });
      } catch (error) {
        console.error("Media gallery not available", error);
      }
    },
  });

  // 3) Buttons -> open Link editor on button
  CanvasInteractions.register({
    selector: "a[data-btn]",
    tip: "Double click to edit button",
    onDblClick: (el) => {
      try {
        console.log("[BTN DblClick] opening LinkEditor for:", el);
        Vvveb?.LinkEditor?.open?.(el);
      } catch (err) {
        console.error("[BTN DblClick] LinkEditor open failed:", err);
      }
    },
  });
  //   4) Links -> open link editor
  CanvasInteractions.register({
    selector: ".nav-link:not([data-btn]) .nav-link, nav a",
    tip: "Double click to edit link",
    onDblClick: (el) => Vvveb?.LinkEditor?.open?.(el),
  });

  //   3) Headings & paragraphs -> open text editor
  CanvasInteractions.register({
    selector:
      "h1,h2,h3,h4,h5,h6,p,span:not(.vvveb-add-btn-text):not(.vvveb-add-btn-plus),a:not([data-btn]), li:not(nav li, .navbar li, .nav li), blockquote, small, button:not(.vvveb-add-link-btn):not(form button)",
    tip: "Double click to edit text",
    // onDblClick: (el) => Vvveb?.WysiwygEditor?.edit?.(el),
    onDblClick: (el, event) => {
      if (
        el &&
        el.closest(
          "[data-vvveb-helpers], .vvveb-add-link-helper, .vvveb-add-btn-text, .vvveb-add-btn-plus"
        )
      ) {
        return; // do nothing for builder helpers
      }
      // Capture the original event
      // We stop the event immediately to prevent the browser's native action
      event.stopPropagation();
      event.preventDefault();

      // --- The Zero-Flash Tweak (Must be done first) ---
      // Temporarily apply the no-select style inline on the element
      const oldUserSelect = el.style.userSelect;
      el.style.userSelect = "none";
      el.style.webkitUserSelect = "none";

      // Store coordinates and the element
      if (Vvveb?.WysiwygEditor) {
        Vvveb.WysiwygEditor._lastDblClickCoords = {
          x: event.clientX,
          y: event.clientY,
          iframe: Vvveb.Builder.iframe,
          oldUserSelect: oldUserSelect, // Pass the original style for restoration
        };

        // Manually run the editing setup
        Vvveb.WysiwygEditor.edit(el);
      }
    },
  });

  //   4) Links -> open link editor
  // CanvasInteractions.register({
  //   selector: ".nav-link,a",
  //   tip: "Double click to edit link",
  //   onDblClick: (el) => Vvveb?.LinkEditor?.open?.(el),
  // });

  // 5) Map -> open map editor
  CanvasInteractions.register({
    selector:
      "[data-component-maps], iframe[src*='maps.google.'], .map, .google-map",
    tip: "Double click to edit map",
    onDblClick: (el) => {
      try {
        const mapEl = el.closest?.("[data-component-maps]") || el;
        Vvveb.Builder?.selectNode?.(mapEl);

        const addr = mapEl.getAttribute("data-address") || "";
        const type = mapEl.getAttribute("data-maptype") || "roadmap";
        const zoom = mapEl.getAttribute("data-zoom") || "14";

        document.getElementById("popup-map-address").value = addr;
        document.getElementById("popup-map-type").value = type;
        document.getElementById("popup-map-zoom").value = zoom;

        document.getElementById("map-popup").style.display = "block";
      } catch (error) {
        console.error("Map editor not available", error);
      }
    },
  });
});

// Custom Modification - Jayanti Changes - Select Actions Rules
// selector -> action-key list
// action-key: drag, parent, up, down, clone, delete, edit-code, save-reusable, open-props, edit-link, edit-image, edit-section, edit-map, edit-container

window.SelectActionsRules = new Map([
  // Links
  ["a", "up down clone delete"],

  // Icons / Images
  ["i", "delete"],
  ["img", "delete"],

  // Plain textish nodes
  [
    "h1,h2,h3,h4,h5,h6,p,span,label,small,blockquote,li",
    "up down clone delete",
  ],

  // Sections & containers
  ["section", " up down clone delete"],
  ["div", "up down clone delete"],
  ["button", ""],
]);

// Button id map (action-key -> anchor#id)
const ACTION_BUTTON_IDS = {
  //   drag:           "drag-btn",
  parent: "parent-btn",
  up: "up-btn",
  down: "down-btn",
  //   "edit-code":    "edit-code-btn",
  "save-reusable": "save-reusable-btn",
  clone: "clone-btn",
  delete: "delete-btn",
  //   "open-props":   "open-props-btn",
  "edit-link": "edit-link-btn",
  "edit-image": "edit-image-btn",
  "edit-section": "edit-section-btn",
  "edit-map": "edit-map-btn",
  "edit-container": "edit-container-btn",
};

window.applySelectActions = function (node) {
  const bar = document.getElementById("select-actions");
  if (!bar || !node) return;

  bar.querySelectorAll("a[id$='-btn']").forEach((a) => {
    a.style.display = "none";
  });

  let list = (node.getAttribute && node.getAttribute("data-actions")) || "";

  if (!list) {
    for (const [selector, actions] of window.SelectActionsRules.entries()) {
      if (node.matches(selector)) {
        list = actions;
        break;
      }
    }
  }

  if (!list) list = "drag up down clone delete edit-code open-props";

  const wanted = new Set(list.split(/[\s,]+/).filter(Boolean));
  wanted.forEach((key) => {
    const id = ACTION_BUTTON_IDS[key];
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.style.display = "inline-block";
  });
};

(function () {
  const STORAGE_KEY = "vvveb.insert.gridcols";

  function applyCols(cols) {
    // ❗ sirf insert-modal ke andar koi blocks-host target karo
    const host = document.querySelector("#insert-modal #blocks-host");
    if (!host) return;
    host.classList.remove("cols-3", "cols-4");
    host.classList.add("cols-" + (cols === "4" ? "4" : "3"));
  }

  function setButtonState(wrapper, cols) {
    wrapper.querySelectorAll(".grid-btn").forEach((btn) => {
      const isActive = btn.dataset.cols === String(cols);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }

  function initToggle() {
    const wrap = document.querySelector("#insert-modal .insert-grid-toggle");
    if (!wrap) return;

    // agar already bind ho chuka hai to dubara click listener mat lagao
    if (wrap._gridBound) {
      const saved =
        (function () {
          try {
            return localStorage.getItem(STORAGE_KEY);
          } catch (e) {
            return null;
          }
        })() || "3";

      applyCols(saved);
      setButtonState(wrap, saved);
      return;
    }

    const saved =
      (function () {
        try {
          return localStorage.getItem(STORAGE_KEY);
        } catch (e) {
          return null;
        }
      })() || "3";

    // first time apply
    applyCols(saved);
    setButtonState(wrap, saved);

    wrap.addEventListener("click", function (e) {
      const btn = e.target.closest(".grid-btn");
      if (!btn) return;

      const cols = btn.dataset.cols === "4" ? "4" : "3";

      applyCols(cols);
      setButtonState(wrap, cols);

      try {
        localStorage.setItem(STORAGE_KEY, cols);
      } catch (e) { }
    });

    wrap._gridBound = true;
  }

  // 🟢 yahi main difference hai second wali file se:
  // DOM already load ho chuka ho to turant initToggle()
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initToggle);
  } else {
    initToggle();
  }

  // jab bhi blocks panel ready event aaye, state sync kar lo
  document.addEventListener("vvveb.insertpanel.blocksReady", initToggle);
})();

const TextLiveTracker = {
  observer: null,
  activeElement: null,
  oldContent: "",
  timer: null,

  start: function (element) {
    this.activeElement = element;
    this.oldContent = element.innerHTML.replace(/\u00A0/g, "").trim();

    this.observer = new MutationObserver(() => {
      this.record();
    });

    this.observer.observe(element, {
      characterData: true,
      childList: true,
      subtree: true,
      attributes: true,
    });
  },

  record: function () {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const newContent = this.activeElement.innerHTML
        .replace(/\u00A0/g, "")
        .trim();

      if (this.oldContent !== newContent) {
        Vvveb.Undo.addMutation({
          type: "characterData",
          target: this.activeElement,
          oldValue: this.oldContent,
          newValue: newContent,
        });

        this.oldContent = newContent;
      }
    }, 300);
  },

  stop: function () {
    if (this.observer) this.observer.disconnect();
    clearTimeout(this.timer);
    this.observer = null;
    this.activeElement = null;
  },
};

document.addEventListener('DOMContentLoaded', function (e) {
  const mobileBtn = document.getElementById('mobile-builder-modal__sidebar');
  const sidebar = document.querySelector('.builder-modal__sidebar');
  const contentArea = document.querySelector('.builder-modal__content');

  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('show-mobile');
    });

    const categories = sidebar.querySelectorAll('li');
    categories.forEach(cat => {
      cat.addEventListener('click', () => {
        sidebar.classList.remove('show-mobile');
      });
    });

    if (contentArea) {
      contentArea.addEventListener('click', () => {
        sidebar.classList.remove('show-mobile');
      });
    }

    document.querySelector('.builder-modal__header').addEventListener('click', function (e) {
      if (e.target.closest('#mobile-builder-modal__sidebar')) return;
      sidebar.classList.remove('is-active');
    });
  }
});

document.addEventListener('DOMContentLoaded', function (e) {
  const mobileBtn = document.getElementById('media-modal-sidebar');
  const sidebar = document.querySelector('.builder-modal__sidebar');
  const contentArea = document.querySelector('.builder-modal__content');

  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('show-mobile');
    });

    const categories = sidebar.querySelectorAll('li');
    categories.forEach(cat => {
      cat.addEventListener('click', () => {
        sidebar.classList.remove('show-mobile');
      });
    });

    if (contentArea) {
      contentArea.addEventListener('click', () => {
        sidebar.classList.remove('show-mobile');
      });
    }

    document.querySelector('.builder-modal__header').addEventListener('click', function (e) {
      if (e.target.closest('#mobile-builder-modal__sidebar')) return;
      sidebar.classList.remove('is-active');
    });
  }
});