function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

let mediaScanUrl = "/user/media-list"; // Laravel API endpoint
let mediaAiScanUrl = "/user/media-ai-list"; // AI Gallery endpoint

class MediaModal {
  constructor(modal = true) {
    this.isInit = false;
    this.isModal = modal;

    this.modalHtml = `
 <div class="modal fade modal-full mymediagallery-modal" id="MediaModal" tabindex="-1" role="dialog" aria-labelledby="MediaModalLabel" aria-hidden="true">
   <div class="modal-dialog modal-xl" role="document">
     <div class="modal-content" style="height: 90vh;">
       <div class="modal-header" style="display: flex; gap: 6px; margin: 8px;">
         <div class="d-flex" style="width: fit-content;">
           <h5 class="modal-title fw-normal my-auto media-gallery-title" id="MediaModalLabel">Media Gallery</h5>
           <div class="media-mobile-builder-modal__sidebar d-lg-none d-flex" style="padding: 16px;height: fit-content;margin-block: auto; cursor: pointer;" id="mobile-builder-modal__sidebar" onclick="document.getElementById('media-modal-sidebar').classList.toggle('active-sidebar')">
             <i class="fa-solid fa-sliders"></i>
           </div>
         </div>
         <div class="sort-by">
           <label for="sort" class="sort-label">Sort by</label>

           <div class="select-wrap">
             <select id="sort" name="sort">
               <option value="newest" selected>Newest</option>
               <option value="oldest">Oldest</option>
               <option value="a-z">A–Z</option>
               <option value="z-a">Z–A</option>
             </select>
           </div>
         </div>
         <button type="button" class="btn-close my-media-gallery-close-btn zg-close d-inline-flex" data-bs-dismiss="modal" aria-label="Close" style="width: fit-content;">
           <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2">
             <line x1="18" y1="6" x2="6" y2="18" />
             <line x1="6" y1="6" x2="18" y2="18" />
           </svg>

         </button>
       </div>
       <div class="modal-body-content d-flex flex-row flex-grow-1 overflow-hidden position-relative">
         <!-- left nav -->
         <div class="side show-mobile" role="navigation" aria-label="Media categories" id="media-modal-sidebar">
           <button class="nav-item media-modal-nav-item" data-tab="ai">AI Images</button>
           <button class="nav-item media-modal-nav-item" data-tab="stock">Stock Images</button>
           <button class="nav-item media-modal-nav-item active" data-tab="uploads">My Uploads</button>
         </div>
         <div class="right-div-mygallery overflow-auto">
           <div class="filemanager" style="height: 100%;">
             <div class="top-right d-flex justify-content-between">
               <!-- Upload button moved to right side of top bar (shows only on Uploads tab) -->
               <button class="upload-top-btn upload-file-btn-mediagallery me-2 zg-btn-primary" data-bs-toggle="collapse" data-bs-target=".upload-collapse" aria-expanded="false">
                 <i class="la la-upload la-lg"></i>
                 Upload file
               </button>
               <div class="">
                 <div class="breadcrumbs"></div>
               </div>
               <div class="">
                 <div class="search">
                   <input type="search" id="media-search-input" placeholder="Find a file.." />
                 </div>
               </div>
             </div>

             <div class="top-panel">

               <div class="upload-collapse collapse" style="display:none">

                 <button id="upload-close" type="button" class="btn btn-sm btn-light" aria-label="Close" data-bs-toggle="collapse" data-bs-target=".upload-collapse" aria-expanded="true">
                   <span aria-hidden="true"><i class="la la-times la-lg"></i></span>
                 </button>

                 <h3>Drop or choose files to upload</h3>

                 <input type="file" multiple class="">
                 <div class="status"></div>
               </div>
             </div>

             <!-- AI Gallery panel -->
             <div class="display-panel" data-tab="ai" style="display:none">
               <!-- Add AI tab search bar UI -->
               <div class="p-3 sticky-top top-0 bg-white pt-0 border-bottom ai-search-wrapper">
                 <div class="input-group" style="position:relative;">
                   <input type="text" id="ai-search-input" class="form-control" placeholder="Search AI images (e.g. doctor, clinic, kids)..." style="padding-right:34px;" />
                   <!-- Clear icon (overlay) placed inside the input; visually minimal -->
                   <button class="clear-ai-search-btn" type="button" aria-label="Clear search" style="">
                     ×
                   </button>
                 </div>
               </div>
               <ul class="data files" id="ai-media-files"></ul> <!-- 👈 grid container for AI images -->

               <div class="nothingfound ai-nothingfound" style="display: none;">
                 <div></div>
                 <p>No AI images</p>
               </div>
             </div>

             <!-- Stock panel -->
             <!-- STOCK TAB -->
             <div class="display-panel" data-tab="stock" style="display:none">

               <!-- Search Bar -->
               <div class="p-3 sticky-top top-0 bg-white pt-0 border-bottom stock-search-wrapper">
                 <div class="input-group" style="position:relative;">
                   <input type="text" id="stock-search-input" class="form-control" placeholder="Search free stock photos (e.g. doctor, clinic, kids)..." style="padding-right:34px;" />
                   <!-- Clear icon (overlay) placed inside the input; visually minimal -->
                   <button class="clear-stock-search-btn" type="button" aria-label="Clear search" style="">
                     ×
                   </button>
                 </div>
               </div>

               <!-- Results List -->
               <ul class="data" id="stock-media-files"></ul>

               <!-- Empty State -->
               <div class="nothingfound stock-nothingfound" style="display: none;">
                 <div></div>
                 <p>No stock images</p>
               </div>
             </div>

             <div class="display-panel" data-tab="uploads">

               <!-- Uploads search bar (matches Stock UI) -->
               <div class="p-3 sticky-top top-0 bg-white pt-0 border-bottom upload-search-wrapper">
                 <div class="input-group" style="position:relative;">
                   <input type="text" id="upload-search-input" class="form-control" placeholder="Search your uploads (e.g. banner, logo, hero)..." style="padding-right:34px;" />
                   <!-- Clear icon (overlay) placed inside the input; visually minimal -->
                   <button class="clear-upload-search-btn" type="button" aria-label="Clear search" style="">
                     ×
                   </button>
                 </div>
               </div>

               <ul class="data" id="media-files"></ul>

               <div class="nothingfound">
                 <div></div>
                 <p>No uploads found</p>
               </div>
             </div>
           </div>
         </div>
       </div>
       <div class="modal-footer modal-footer-mymedia-gallery justify-content-between">
         <div class="align-right">
           <!-- <button type="button" class="btn btn-secondary cancel-footer-btn btn-icon me-1" -->
           <button type="button" class="cancel-footer-btn me-3 zg-btn-cancel" data-bs-dismiss="modal">
             <i class="la la-times"></i>
             <span>Cancel</span>
           </button>
           <!-- <button type="button" class="btn btn-primary add-selected-footer-btn btn-icon save-btn"> -->
           <button type="button" class="add-selected-footer-btn save-btn zg-btn-primary">
             <i class="la la-check"></i>
             <span>Add selected</span>
           </button>
         </div>
       </div>
     </div>
   </div>
 </div>
 `;

    // --- Image Details (Title/Alt/Description) modal ---
    const metaHtml = `
<div class="modal fade " id="MediaMetaModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <form class="modal-content rename-file-mymediagallery" id="media-meta-form">
      <div class="modal-header">
        <h5 class="modal-title">Image details</h5>
        <button type="button" class="btn-close zg-close" data-bs-dismiss="modal">
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>

        </button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input type="text" class="form-control" id="meta-title">
        </div>
        <div class="mb-3">
          <label class="form-label">Alt text</label>
          <input type="text" class="form-control" id="meta-alt" placeholder="Describe the image for accessibility/SEO">
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea class="form-control" rows="3" id="meta-description"></textarea>
        </div>
        <div id="meta-error" class="invalid-feedback d-block" style="display:none"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="zg-btn-cancel" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="zg-btn-primary">Save</button>
      </div>
    </form>
  </div>
</div>`;

    // Amit has added this
    const imageViewHtml = `
<div class="modal fade" id="MediaImageViewModal" tabindex="-1" aria-hidden="true" style="height: 100%;">
    <div class="modal-dialog modal-dialog-centered main-body">
        <div class="modal-body">
            <div class="image-div">
                <img src="" alt="Image Preview" id="media-image-view-img">
            </div>
        </div>
        <div class="modal-footer">
            <div class="text-and-close-btn">
                <div class="text-part">
                  <p><span id="media-view-powered">Unsplash</span></p>
                  <p><span>Photo by </span><span id="media-view-author">Unsplash</span></p>
                </div>
                <div class="close-btn">
                    <button id="media-image-view-close-btn" class="zg-btn-cancel" type="button" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>`;

    // inside addModalHtml(), after appending the main Media modal:
    const renameHtml = `
<div class="modal fade" id="MediaRenameModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <form class="modal-content rename-file-mymediagallery" id="media-rename-form">
      <div class="modal-header">
        <h5 class="modal-title">Rename file</h5>
        <button type="button" class="btn-close zg-close" data-bs-dismiss="modal" aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>

        </button>
      </div>

      <div class="modal-body">
        <div class="mb-2 small text-muted">Current name</div>
        <div id="media-rename-current" class="form-control-plaintext fw-semibold"></div>

        <div class="mt-3 mb-2 small text-muted">New name</div>
        <div class="input-group">
          <input type="text" class="form-control" id="media-rename-input" placeholder="Add New File Name">
          <span class="input-group-text" id="media-rename-ext">.png</span>
        </div>

        <div id="media-rename-error" class="invalid-feedback d-block" style="display:none"></div>
      </div>

      <div class="modal-footer">
        <button type="button" class="zg-btn-cancel" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="zg-btn-primary">
           Update
        </button>
      </div>
    </form>
  </div>
</div>`;

    const confirmHtml = `
<div class="modal fade" id="MediaConfirmModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content rename-file-mymediagallery">
      <div class="modal-header">
        <h5 class="modal-title">Confirm delete</h5>
        <button type="button" class="btn-close zg-close" data-bs-dismiss="modal">
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>

        </button>
      </div>
      <div class="modal-body">
        <div class="d-flex align-items-start modal-body-main-div">
          <!-- <i class="la la-exclamation-triangle la-2x text-warning"></i> -->
          <i class="fa-solid fa-trash"></i>
          <div class="modal-body-main-div-text-part">
            <p class="fw-semibold mb-1">Delete this file?</p>
            <p class="text-muted small">This action cannot be undone.</p>
            <p class="mt-2 small" id="media-confirm-filename"></p>
          </div>
        </div>
        <div id="media-confirm-error" class="invalid-feedback d-block" style="display:none"></div>
      </div>
      <div class="modal-footer py-2">
        <button type="button" class="zg-btn-cancel" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="zg-btn-primary" id="media-confirm-delete">Delete</button>
      </div>
    </div>
  </div>
</div>`;
    document.body.appendChild(generateElements(confirmHtml)[0]);

    // Amit has added this
    document.body.appendChild(generateElements(imageViewHtml)[0]);

    // cache
    this.confirmModal = document.getElementById("MediaConfirmModal");
    this.confirmNameEl = document.getElementById("media-confirm-filename");
    this.confirmErrEl = document.getElementById("media-confirm-error");
    this.confirmBtnDel = document.getElementById("media-confirm-delete");

    // Cache elements for the image viewer modal
    this.imageViewModal = document.getElementById("MediaImageViewModal");
    this.imageViewImg = document.getElementById("media-image-view-img");
    this.imageViewPowered = document.getElementById("media-view-powered");
    this.imageViewAuthor = document.getElementById("media-view-author");
    this.imageViewCloseBtn = document.getElementById(
      "media-image-view-close-btn"
    );

    // Ensure the image-view modal closes cleanly: explicitly hide via Bootstrap
    // and clear the img src after the modal fully hides to avoid abrupt flashes.
    if (this.imageViewCloseBtn) {
      this.imageViewCloseBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const m = bootstrap.Modal.getOrCreateInstance(this.imageViewModal);
        if (m) m.hide();
      });
    }

    if (this.imageViewModal) {
      this.imageViewModal.addEventListener("hidden.bs.modal", () => {
        try {
          // remove src to stop any pending loads and avoid layout jumps
          if (this.imageViewImg) {
            this.imageViewImg.src = "";
            this.imageViewImg.alt = "";
          }
          // clear attribution lines to avoid stale content next open
          if (this.imageViewPowered) this.imageViewPowered.textContent = "";
          if (this.imageViewAuthor) this.imageViewAuthor.textContent = "";
        } catch (err) {
          // swallow errors; nothing critical here
        }
      });
    }

    // helper to open the confirm dialog
    this._confirmCtx = null;
    this.openConfirm = (li) => {
      const url = li.querySelector('input[type="hidden"]').value;
      const name = (
        li.querySelector(".info .name")?.textContent || url.split("/").pop()
      ).trim();
      this._confirmCtx = { li, url, name };
      this.confirmNameEl.textContent = name;
      this.confirmErrEl.style.display = "none";
      this.confirmErrEl.textContent = "";
      bootstrap.Modal.getOrCreateInstance(this.confirmModal).show();
    };

    // bind delete confirmation button once
    this.confirmBtnDel.addEventListener("click", () => this.confirmedDelete());

    document.body.appendChild(generateElements(renameHtml)[0]);

    // cache elements
    this.renameModal = document.getElementById("MediaRenameModal");
    this.renameForm = document.getElementById("media-rename-form");
    this.renameCurrentEl = document.getElementById("media-rename-current");
    this.renameInputEl = document.getElementById("media-rename-input");
    this.renameExtEl = document.getElementById("media-rename-ext");
    this.renameErrorEl = document.getElementById("media-rename-error");
    this.renameSubmitBtn = this.renameForm.querySelector(
      'button[type="submit"]'
    );

    // submit handler
    this.renameForm.addEventListener("submit", (e) => {
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }
      this.submitRename();
    });

    document.body.appendChild(generateElements(metaHtml)[0]);

    // cache refs & wire submit (still inside addModalHtml)
    this.metaModal = document.getElementById("MediaMetaModal");
    this.metaForm = document.getElementById("media-meta-form");
    this.metaSaveBtn = this.metaForm?.querySelector(
      'button[type="submit"], .save-btn'
    );
    this.metaErrorEl = document.getElementById("media-meta-error"); // if you show errors
    this.metaTitleEl = document.getElementById("meta-title");
    this.metaAltEl = document.getElementById("meta-alt");
    this.metaDescEl = document.getElementById("meta-description");
    this.metaErrorEl = document.getElementById("meta-error");

    this.metaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitMeta(); // your method that POSTs /user/media-meta
    });

    (this.response = []), (this.currentPath = "");
    this.breadcrumbsUrls = [];
    this.filemanager = null;
    this.breadcrumbs = null;
    this.fileList = null;
    this.mediaPath = mediaPath;
    this.type = "single";
    this.container = document.getElementById("MediaModal");
  }

  getResponse(response) {
    return this.response;
  }

  setResponse(response) {
    this.response = response;
    (this.currentPath = ""), (this.breadcrumbsUrls = []);
  }

  startMetaLoading(label = "Saving…") {
    if (!this.metaSaveBtn) return;
    this._metaBtnHtml = this._metaBtnHtml || this.metaSaveBtn.innerHTML;
    this.metaSaveBtn.disabled = true;
    this.metaSaveBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>' +
      label;
  }

  stopMetaLoading() {
    if (!this.metaSaveBtn) return;
    this.metaSaveBtn.disabled = false;
    if (this._metaBtnHtml) this.metaSaveBtn.innerHTML = this._metaBtnHtml;
  }

  // put these inside class MediaModal { ... }
  startSaveLoading(label = "Adding…") {
    if (!this.saveBtn) return;
    this._saveBtnHtml = this._saveBtnHtml || this.saveBtn.innerHTML; // remember original
    this.saveBtn.disabled = true;
    this.saveBtn.classList.add("loading");
    this.saveBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm align-middle me-2" role="status" aria-hidden="true"></span>' +
      label;
  }

  stopSaveLoading() {
    if (!this.saveBtn) return;
    this.saveBtn.classList.remove("loading");
    if (this._saveBtnHtml) this.saveBtn.innerHTML = this._saveBtnHtml;
    // final enabled/disabled will be handled by updateSaveButtonState()
  }

  startRenameLoading(label = "Updating…") {
    if (!this.renameSubmitBtn) return;
    this._renameBtnHtml = this._renameBtnHtml || this.renameSubmitBtn.innerHTML;
    this.renameSubmitBtn.disabled = true;
    this.renameSubmitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>' +
      label;
  }

  stopRenameLoading() {
    if (!this.renameSubmitBtn) return;
    this.renameSubmitBtn.disabled = false;
    if (this._renameBtnHtml)
      this.renameSubmitBtn.innerHTML = this._renameBtnHtml;
  }

  // Generic button loader (works for <button> or <label> acting like a button)
  startBtnLoading(btn, label = "Uploading…") {
    if (!btn) return;
    btn._origHTML ??= btn.innerHTML;
    btn._wasLabel = btn.tagName === "LABEL"; // can't disable labels reliably
    if (btn._wasLabel) {
      btn.setAttribute("aria-disabled", "true");
      btn.classList.add("disabled");
      btn.style.pointerEvents = "none";
    } else {
      btn.disabled = true;
      btn.classList.add("disabled");
    }
    btn.classList.add("loading");
    btn.innerHTML =
      '<span class="spinner-border spinner-border-sm align-middle me-2" role="status" aria-hidden="true"></span>' +
      label;
  }

  stopBtnLoading(btn) {
    if (!btn) return;
    btn.classList.remove("loading");
    if (btn._wasLabel) {
      btn.removeAttribute("aria-disabled");
      btn.classList.remove("disabled");
      btn.style.pointerEvents = "";
    } else {
      btn.disabled = false;
      btn.classList.remove("disabled");
    }
    if (btn._origHTML) btn.innerHTML = btn._origHTML;
  }

  // keep near your class utilities
  // put this with your other helpers inside the class
  setIconLoading(btn, loading = true) {
    if (!btn) return;

    if (loading) {
      if (btn.dataset.loading) return; // already loading
      const w = btn.offsetWidth; // lock width to prevent layout jump
      if (w) btn.style.width = w + "px";
      btn.dataset.origHtml = btn.innerHTML;
      btn.dataset.loading = "1";
      btn.setAttribute("aria-busy", "true");
      btn.classList.add("disabled");
      btn.innerHTML = `
      <span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span>
    `;
    } else {
      if (!btn.dataset.loading) return;
      btn.innerHTML = btn.dataset.origHtml || "";
      btn.classList.remove("disabled");
      btn.removeAttribute("aria-busy");
      btn.style.width = ""; // release width lock
      delete btn.dataset.origHtml;
      delete btn.dataset.loading;
    }
  }

  addModalHtml() {
    if (this.isModal) document.body.append(generateElements(this.modalHtml)[0]);
    this.container = document.getElementById("MediaModal");
    const btn = this.container.querySelector(".save-btn");
    if (!btn) return; // if template not loaded for some reason

    this.saveBtn = btn;
    this.saveBtn.addEventListener("click", () => this.save());
    this.container
      .querySelector(".save-btn")
      .addEventListener("click", () => this.save());
    this.saveBtn.disabled = true;
    this.saveBtn.classList.add("disabled");
    this.container.addEventListener("hidden.bs.modal", () => {
      this.stopSaveLoading();
      this.updateSaveButtonState(); // re-sync enabled/disabled
    });
  }

  // hideEmptyNotice() {
  //   // Hide the empty-state tile only for the current panel
  //   let panel = null;

  //   if (this.fileList) {
  //     panel = this.fileList.closest(".display-panel");
  //   }

  //   // Fallback to uploads panel if anything is weird
  //   if (!panel) {
  //     panel = this.container.querySelector(
  //       ".display-panel[data-tab='uploads']"
  //     );
  //   }

  //   const nothing = panel ? panel.querySelector(".nothingfound") : null;
  //   if (nothing) {
  //     nothing.style.display = "none";
  //   }
  // }

  hideEmptyNotice() {
    let panel = this.fileList
      ? this.fileList.closest(".display-panel")
      : this.container.querySelector(".display-panel[data-tab='uploads']");

    const nothing = panel ? panel.querySelector(".nothingfound") : null;
    if (nothing) {
      nothing.style.display = "none";
    }
  }

  updateSaveButtonState() {
    if (!this.container || !this.saveBtn) return;
    // if we are in loading state, keep it disabled regardless of selection
    if (this.saveBtn.classList.contains("loading")) {
      this.saveBtn.disabled = true;
      this.saveBtn.classList.add("disabled");
      return;
    }
    const anyChecked = !!this.container.querySelector(
      ".filemanager input[name='file[]']:checked"
    );
    this.saveBtn.disabled = !anyChecked;
    this.saveBtn.classList.toggle("disabled", !anyChecked);
  }

  showUploadLoading() {
    this.container.querySelector(".upload-collapse .status").innerHTML = `
		<div class="spinner-border" style="width: 5rem; height: 5rem;margin: 5rem auto; display:block" role="status">
		  <span class="visually-hidden">Loading...</span>
		</div>`;
  }

  hideUploadLoading() {
    this.container.querySelector(".upload-collapse .status").innerHTML = "";
  }

  save() {
    // prevent accidental double-clicks or no-selection
    if (!this.saveBtn || this.saveBtn.disabled) return;

    this.startSaveLoading("Adding…");

    try {
      const checkedEl = this.container.querySelector(
        ".files input[name='file[]']:checked"
      );
      if (!checkedEl) return;

      // ✅ Always rely on the hidden absolute URL (kept fresh on rename)
      const li = checkedEl.closest("li.files");
      const hidden = li?.querySelector('input[name="filename[]"]');
      let src = hidden?.value || ""; // absolute URL after rename
      if (!src) {
        // fallback (old behavior), but this will rarely be used now
        let file = checkedEl.value;
        src = file.indexOf("//") === -1 ? this.mediaPath + file : file;
      }

      if (this.targetThumb) {
        document.querySelector(this.targetThumb)?.setAttribute("src", src);
      }

      //Current changes : 13-2-26 start
      if (this.callback) {

        const payload = {
          src,
          title: li?.dataset?.title || "",
          alt: li?.dataset?.alt || "",
          description:
            li?.dataset?.description || li?.dataset?.desc || "",
        };
        this.callback(payload);
      }

      //Current changes : 13-2-26 ends

      if (this.targetInput) {
        const input = document.querySelector(this.targetInput);
        if (input) {
          input.value = src;
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }

      const modal = bootstrap.Modal.getOrCreateInstance(this.container);
      if (this.isModal) modal.hide();
    } finally {
      this.stopSaveLoading();
      this.updateSaveButtonState();
    }
  }

  init() {
    if (!this.isInit) {
      if (this.isModal) this.addModalHtml();
      let self = this;

      this.initGallery();
      this.isInit = true;

      this.container
        .querySelector(".filemanager input[type=file]")
        .addEventListener("change", this.onUpload);
      this.container
        .querySelector(".filemanager")
        .addEventListener("change", (e) => {
          if (e.target && e.target.matches("input[name='file[]']")) {
            this.updateSaveButtonState();
          }
        });

      // when modal opens fresh, ensure correct state
      this.updateSaveButtonState();

      this.container
        .querySelector(".filemanager")
        .addEventListener("click", (e) => {
          let el = e.target.closest(".btn-delete");
          if (el) {
            this.deleteFile(el);
            return;
          }

          el = e.target.closest(".btn-rename");
          if (el) {
            this.renameFile(el);
            return;
          }

          // NEW: open meta modal
          el = e.target.closest(".btn-meta");
          if (el) {
            const li = el.closest("li.files");
            if (!li) return;

            // 🔵 start spinner on the same icon/button
            this.setIconLoading(el, true);
            // store context so we can restore later (and during submit)
            this._metaCtx = { li, btn: el };

            // open meta dialog as you already do
            this.showMetaDialog(li);

            // 🔁 when modal is shown, restore icon
            const modalEl =
              this.metaModal || document.getElementById("MediaMetaModal");
            if (modalEl) {
              const onShown = () => {
                this.setIconLoading(el, false);
                modalEl.removeEventListener("shown.bs.modal", onShown);
              };
              modalEl.addEventListener("shown.bs.modal", onShown);
            } else {
              // fallback in case modal ref not found
              setTimeout(() => this.setIconLoading(el, false), 600);
            }
            return;
          }

          // NEW: copy PDF link
          el = e.target.closest(".btn-copy");
          if (el) {
            const url =
              el.dataset.url ||
              el.closest("li.files")?.querySelector('input[type="hidden"]')
                ?.value;
            if (!url) return;

            // infer type by extension
            const ext = (
              url.split("?")[0].split("#")[0].split(".").pop() || ""
            ).toLowerCase();
            const isPdf = ext === "pdf";
            const isVideo = [
              "mp4",
              "webm",
              "ogg",
              "mov",
              "m4v",
              "avi",
              "mkv",
            ].includes(ext);
            const isImage = [
              "jpg",
              "jpeg",
              "png",
              "gif",
              "svg",
              "webp",
              "avif",
            ].includes(ext);

            const label = isPdf
              ? "PDF link copied."
              : isVideo
                ? "Video link copied."
                : isImage
                  ? "Image link copied."
                  : "Link copied.";

            const copy = () => displayToast("bg-success", "Copied", label);

            (navigator.clipboard?.writeText(url) || Promise.reject())
              .then(copy)
              .catch(() => {
                const ta = document.createElement("textarea");
                ta.value = url;
                document.body.appendChild(ta);
                ta.select();
                try {
                  document.execCommand("copy");
                  copy();
                } catch {
                  displayToast("bg-danger", "Error", "Could not copy link.");
                }
                document.body.removeChild(ta);
              });

            return;
          }
        });

      // Amit has added this
      // --- Inside class MediaModal { ... } init() method ---
      // --- Locate this block: ---

      this.container
        .querySelector(".filemanager")
        .addEventListener("click", (e) => {
          let el = e.target.closest(".btn-delete");
          if (el) {
            this.deleteFile(el);
            return;
          }

          el = e.target.closest(".btn-rename");
          if (el) {
            this.renameFile(el);
            return;
          }

          // NEW: open meta modal
          el = e.target.closest(".btn-meta");
          if (el) {
            // ... (existing meta logic) ...
            return;
          }

          // 🟢 NEW: open image view modal
          el = e.target.closest(".view-photo-action");
          if (el) {
            const li = el.closest("li.files");
            if (!li) return;

            // ℹ️ No loading spinner needed here as it's a quick preview
            this.showImageViewDialog(li);
            return;
          }

          // NEW: copy PDF link
          el = e.target.closest(".btn-copy");
          if (el) {
            // ... (existing copy logic) ...
            return;
          }
        });
      // ... (continue with the rest of the init method) ...

      const event = new CustomEvent("mediaModal:init", {
        detail: {
          type: this.type,
          targetInput: this.targetInput,
          targetThumb: this.targetThumb,
          callback: this.callback,
        },
      });
      window.dispatchEvent(event);
    }
  }

  open(element, callback) {
    if (element instanceof Element) {
      this.targetInput = element.dataset.targetInput;
      this.targetThumb = element.dataset.targetThumb;
      if (element.dataset.type) {
        this.type = element.dataset.type;
      }
    } else if (element) {
      this.targetInput = element.targetInput;
      this.targetThumb = element.targetThumb;
      if (element.type) {
        this.type = element.type;
      }
    }

    this.callback = callback;
    this.init();

    let modal = bootstrap.Modal.getOrCreateInstance(this.container);
    if (this.isModal) modal.show();
    this.updateSaveButtonState();
  }

  initGallery() {
    (this.filemanager = this.container.querySelector(".filemanager")),
      (this.breadcrumbs = this.container.querySelector(".breadcrumbs")),
      (this.fileList = this.filemanager.querySelector("#media-files"));

    this.uploadsFileList = this.filemanager.querySelector("#media-files");
    this.aiFileList = this.filemanager.querySelector("#ai-media-files");
    this.stockFileList = this.filemanager.querySelector("#stock-media-files");
    let _this = this;

    // ✅ Block image context menu inside media gallery
    this.filemanager.addEventListener("contextmenu", (e) => {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });

    // ✅ Block drag of images inside media gallery
    this.filemanager.addEventListener("dragstart", (e) => {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });

    // Create a floating, fixed-position overlay that visually highlights
    // the entire My Uploads area. We position it each frame while dragging
    // so it remains visible even when the internal list is scrolled.
    // Ensure a single global overlay element is used across instances.
    if (!this._mediaUploadOverlay) {
      let existing = document.getElementById("media-upload-overlay");
      if (existing) {
        this._mediaUploadOverlay = existing;
      } else {
        const ov = document.createElement("div");
        ov.id = "media-upload-overlay";
        // Let CSS handle most styling; only set essential fallbacks here.
        ov.style.display = "none";
        ov.innerHTML = `
  <div class="media-upload-overlay-content">
    <img 
      src="http://127.0.0.1:8000/media/cloud-upload_8591640.svg" 
      class="media-upload-overlay-svg"
      alt="Upload Icon"
    />

    <div class="media-upload-overlay-title">Drop items to upload</div>

  </div>
`;
        document.body.appendChild(ov);
        this._mediaUploadOverlay = ov;
      }

      // Define helpers that position/show/hide the single overlay element.
      this._showUploadOverlay = function () {
        if (!this._mediaUploadOverlay) return;
        const modalEl = this.container || document.getElementById("MediaModal");
        const panelEl = modalEl
          ? modalEl.querySelector('.display-panel[data-tab="uploads"]')
          : null;
        if (!panelEl) return;
        const rect = panelEl.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return;
        const ov = this._mediaUploadOverlay;
        ov.style.left = rect.left + "px";
        ov.style.top = rect.top + "px";
        ov.style.width = rect.width + "px";
        ov.style.height = rect.height + "px";
        ov.style.display = "block";
      };

      this._hideUploadOverlay = function () {
        if (!this._mediaUploadOverlay) return;
        this._mediaUploadOverlay.style.display = "none";
      };

      // Install global listeners once to avoid duplicates across instances.
      if (!window._mediaUploadOverlayGlobalInit) {
        window._mediaUploadOverlayGlobalInit = true;
        document.addEventListener("drop", () => {
          try {
            this._hideUploadOverlay();
          } catch (e) { }
        });
        document.addEventListener("dragend", () => {
          try {
            this._hideUploadOverlay();
          } catch (e) { }
        });

        const scheduleOverlayUpdate = () => {
          try {
            if (
              document.getElementById("media-upload-overlay")?.style.display ===
              "block"
            ) {
              // Find the modal instance that owns the overlay and update its position.
              // We'll call any visible MediaModal's show helper if available.
              const modal = document.getElementById("MediaModal");
              if (modal && window.Vvveb && Vvveb.MediaModal) {
                try {
                  Vvveb.MediaModal._globalOverlayUpdater?.();
                } catch (e) { }
              }
            }
          } catch (e) { }
        };

        window.addEventListener("scroll", scheduleOverlayUpdate, true);
        window.addEventListener("resize", scheduleOverlayUpdate);
        window.addEventListener("wheel", scheduleOverlayUpdate, {
          passive: true,
        });
      }
    }
    // Expose a global updater so window-level listeners can ask the
    // active MediaModal instance to reposition the overlay.
    try {
      if (!window.Vvveb) window.Vvveb = {};
      window.Vvveb.MediaModal = window.Vvveb.MediaModal || {};
      window.Vvveb.MediaModal._globalOverlayUpdater = () => {
        try {
          if (this._showUploadOverlay) this._showUploadOverlay();
        } catch (e) { }
      };
    } catch (e) {
      /* ignore */
    }

    // Observe class changes on the uploads panel so any code-path that
    // toggles `.upload-dragover` (even without calling our helpers)
    // will show/hide the overlay consistently.
    try {
      const modalEl = this.container || document.getElementById("MediaModal");
      const panelEl = modalEl
        ? modalEl.querySelector('.display-panel[data-tab="uploads"]')
        : null;
      if (panelEl && !this._mediaUploadOverlayObserver) {
        const mo = new MutationObserver((mutations) => {
          for (const m of mutations) {
            if (m.attributeName === "class") {
              const has = panelEl.classList.contains("upload-dragover");
              try {
                if (has) _this._showUploadOverlay();
                else _this._hideUploadOverlay();
              } catch (e) { }
            }
          }
        });
        mo.observe(panelEl, { attributes: true, attributeFilter: ["class"] });
        this._mediaUploadOverlayObserver = mo;
      }
    } catch (e) {
      /* ignore observer failures */
    }

    // Make the whole "My Uploads" panel accept drag & drop
    try {
      const uploadsPanel = this.container.querySelector(
        '.display-panel[data-tab="uploads"]'
      );

      // ✅ Guard: sirf ek hi baar attach karo per modal instance
      if (uploadsPanel && !this._uploadDragDropBound) {
        this._uploadDragDropBound = true;

        const prevent = (e) => {
          e.preventDefault();
          e.stopPropagation();
        };

        // Use a counter to avoid flicker when drag events fire for child nodes.
        uploadsPanel._dragCounter = 0;

        const dropTargets = [
          uploadsPanel,
          this.filemanager,
          uploadsPanel.querySelector("#media-files"),
        ].filter(Boolean);

        const onDragEnter = (e) => {
          prevent(e);
          uploadsPanel._dragCounter = (uploadsPanel._dragCounter || 0) + 1;
          uploadsPanel.classList.add("upload-dragover");
        };

        const onDragOver = (e) => {
          prevent(e);
          if (!uploadsPanel.classList.contains("upload-dragover")) {
            uploadsPanel.classList.add("upload-dragover");
          }
        };

        const onDragLeave = (e) => {
          prevent(e);
          uploadsPanel._dragCounter = Math.max(
            0,
            (uploadsPanel._dragCounter || 1) - 1
          );
          if (uploadsPanel._dragCounter === 0) {
            uploadsPanel.classList.remove("upload-dragover");
          }
        };

        const onDrop = (e) => {
          prevent(e);
          uploadsPanel._dragCounter = 0;
          uploadsPanel.classList.remove("upload-dragover");

          const files =
            e.dataTransfer && e.dataTransfer.files
              ? e.dataTransfer.files
              : null;

          if (files && files.length) {
            try {
              this.onUpload(e);
            } catch (err) {
              console.error("Drop handler error", err);
            }
          }
        };

        dropTargets.forEach((t) => {
          t.addEventListener("dragenter", onDragEnter, false);
          t.addEventListener("dragover", onDragOver, false);
          t.addEventListener("dragleave", onDragLeave, false);
          t.addEventListener("drop", onDrop, false);
        });

        // Safety: clear state if a drag ends unexpectedly
        window.addEventListener("dragend", () => {
          if (uploadsPanel._dragCounter && uploadsPanel._dragCounter > 0) {
            uploadsPanel._dragCounter = 0;
            uploadsPanel.classList.remove("upload-dragover");
          }
        });

        // Document-level dragover handler (keep as-is, but yahan bhi global guard chaaho to laga sakte ho)
        let _lastDragPos = null;
        let _rafId = null;

        const docDragOverHandler = (ev) => {
          _lastDragPos = { x: ev.clientX, y: ev.clientY };
          if (_rafId) return;
          _rafId = requestAnimationFrame(() => {
            _rafId = null;
            if (!_lastDragPos) return;
            try {
              const rect = uploadsPanel.getBoundingClientRect();
              const style = window.getComputedStyle(uploadsPanel);
              const visible =
                rect.width > 0 &&
                rect.height > 0 &&
                style.display !== "none" &&
                style.visibility !== "hidden" &&
                uploadsPanel.offsetParent !== null;

              let isOver = false;
              if (visible && _lastDragPos) {
                const x = _lastDragPos.x;
                const y = _lastDragPos.y;
                isOver =
                  x >= rect.left &&
                  x <= rect.right &&
                  y >= rect.top &&
                  y <= rect.bottom;
              }

              if (isOver) {
                uploadsPanel._dragCounter = Math.max(
                  1,
                  uploadsPanel._dragCounter || 1
                );
                uploadsPanel.classList.add("upload-dragover");
                try {
                  _this._showUploadOverlay();
                } catch (e) { }
              } else {
                uploadsPanel._dragCounter = 0;
                uploadsPanel.classList.remove("upload-dragover");
                try {
                  _this._hideUploadOverlay();
                } catch (e) { }
              }
            } catch (err) {
              // ignore failures
            }
          });
        };

        document.addEventListener("dragover", docDragOverHandler, {
          passive: true,
        });

        document.addEventListener(
          "drop",
          (ev) => {
            uploadsPanel._dragCounter = 0;
            uploadsPanel.classList.remove("upload-dragover");
          },
          false
        );
      }
    } catch (e) {
      // defensive - avoid breaking init if DOM structure differs
      console.warn("Unable to attach upload drop listeners", e);
    }

    // Inject minimal styles for upload progress UI (only once)
    try {
      if (!document.getElementById("media-upload-progress-style")) {
        const s = document.createElement("style");
        s.id = "media-upload-progress-style";
        s.innerHTML = `
        .temporary-upload { position: relative; opacity: 0.98; }
        .temporary-upload .upload-overlay { position: absolute; inset: 0; display:flex;align-items:center;justify-content:center; background: rgba(255,255,255,0.85); backdrop-filter: blur(2px); }
        .temporary-upload .upload-progress { width: 80%; max-width: 420px; }
        .temporary-upload .upload-progress .bar { height: 8px; background: rgba(0,0,0,0.08); border-radius: 6px; overflow: hidden; }
        .temporary-upload .upload-progress .fill { height: 8px; background: linear-gradient(90deg,#0d6efd,#6610f2); width: 0%; transition: width 160ms linear; }
        .temporary-upload .upload-progress .label { margin-top:8px; font-size:12px; color:#333; text-align:center; }
        .temporary-upload .upload-error { color:#c00; font-size:13px; padding:8px 12px; }

        /* Styling for the fixed overlay element used during drag-over */
        #media-upload-overlay {
          pointer-events: none;
          position: fixed;
          z-index: 1065;
          background: rgba(46, 117, 255, 0.12);
          border: 2px dashed rgba(46, 117, 255, 0.28);
          border-radius: 6px;
          box-shadow: 0 6px 20px rgba(2,44,89,0.06);
          display: none;
        }
        #media-upload-overlay > div { color: rgba(2,44,89,0.95); background: rgba(255,255,255,0.92); padding: 8px 14px; border-radius:6px; font-weight:600; font-size:15px; pointer-events:none; text-align:center; }
        `;
        document.head.appendChild(s);
      }
    } catch (e) {
      // ignore styling failures
    }

    if (typeof this.hasInitialStockLoaded === "undefined") {
      this.hasInitialStockLoaded = false;
    }
    // Stock tab pagination state
    if (typeof this.stockPage === "undefined") {
      this.stockPage = 1;
      this.stockQuery = "";
      this.stockPerPage = 30;
      this.stockLoading = false;
      this.stockHasMore = true;
      this.stockObserver = null;
      this.stockSentinel = null;
      this.stockAccumulatedFiles = [];
    }
    // Custom modification - comment out for media change - 27.7.25

    // Start by fetching the file data from scan.php with an AJAX request
    if (!this.response.length) {
      // Custom modification - new added code 10.7.25
      fetch(mediaScanUrl, { credentials: "include" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response);
          }
          return response.json();
        })
        .then((data) => {
          // Patch: Convert Laravel's flat array to the expected object format
          // data.files = [url1, url2, ...]
          _this.response = [
            {
              folders: [],
              files: data.files.map((url, index) => ({
                name: url.split("/").pop(),
                type: "file",
                path: url, // use absolute path
                size: data.sizes && data.sizes[url] ? data.sizes[url] : 1,
                meta: data.meta && data.meta[url] ? data.meta[url] : undefined,
                // include server-provided times if available (ISO string)
                created_at:
                  (data.times && data.times[url]) ||
                  (data.meta &&
                    data.meta[url] &&
                    (data.meta[url].created_at || data.meta[url].createdAt)) ||
                  undefined,
                // 🔹 store original index so sort "newest/oldest" can fall back to this
                _idx: index,
              })),
            },
          ];

          _this.currentPath = "";
          _this.breadcrumbsUrls = [];

          // Initial sort by newest
          _this.sortFiles("newest");

          window.dispatchEvent(new HashChangeEvent("hashchange"));
          // Initialize uploads pagination immediately after initial render so
          // the sentinel/observer are present without requiring a tab toggle.
          try {
            _this.loadUploadsGallery && _this.loadUploadsGallery();
          } catch (e) { }
        })

        .catch((error) => {
          console.log(error.statusText);
          displayToast("bg-danger", "Error", "Error loading media!");
        });
    } else {
      this.goto("");
      // If response was already present, ensure uploads pagination initializes
      try {
        this.loadUploadsGallery && this.loadUploadsGallery();
      } catch (e) { }
    }
    // This event listener monitors changes on the URL. We use it to
    // capture back/forward navigation in the browser.

    window.addEventListener("hashchange", function () {
      _this.goto(window.location.hash);

      // We are triggering the event. This will execute
      // this function on page load, so that we show the correct folder:
    });

    // Event listener for Sort By filter on My Uploads tab
    const sortSelect = this.container.querySelector("#sort");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        const sortBy = sortSelect.value;
        this.sortFiles(sortBy);
        // Re-render current view without changing breadcrumbs
        const data = this.searchByPath(this.currentPath);
        this.render(data);
      });
    }

    // Upload button: when on the 'uploads' tab, open file chooser directly
    // Use capture-phase listeners on all matching upload buttons so we can
    // intercept the click before Bootstrap's collapse handler runs.
    // include upload buttons anywhere in the modal (top-bar or filemanager)
    const uploadBtns = this.container.querySelectorAll(
      "[data-bs-target='.upload-collapse']"
    );
    // Prefer the visible upload input inside the collapse; fall back to hidden #fileInput
    const collapseFileInput = this.container.querySelector(
      ".filemanager .upload-collapse input[type=file]"
    );
    const hiddenFileInput = this.container.querySelector("#fileInput");
    const uploadFileInput = collapseFileInput || hiddenFileInput;

    // Exclude any buttons that live inside the collapse itself (e.g., the close button)
    const filteredUploadBtns = Array.from(uploadBtns).filter(
      (b) => !b.closest(".upload-collapse")
    );
    if (filteredUploadBtns.length && uploadFileInput) {
      filteredUploadBtns.forEach((btn) => {
        // Use capture:true so this runs before Bootstrap's listeners
        btn.addEventListener(
          "click",
          (e) => {
            // Determine currently active nav/tab
            const activeNav = this.container.querySelector(
              ".media-modal-nav-item.active"
            );
            const currentTab = activeNav ? activeNav.dataset.tab : "uploads";

            if (currentTab === "uploads") {
              // Prevent the collapse toggle and open file chooser directly
              e.preventDefault();
              e.stopImmediatePropagation();

              // Temporarily remove Bootstrap data attributes so the collapse
              // doesn't toggle (some Bootstrap handlers may still run otherwise).
              const origToggle = btn.getAttribute("data-bs-toggle");
              const origTarget = btn.getAttribute("data-bs-target");
              if (origToggle !== null) btn.removeAttribute("data-bs-toggle");
              if (origTarget !== null) btn.removeAttribute("data-bs-target");

              // Trigger the file input click
              try {
                uploadFileInput.click();
              } catch (err) {
                // fallback: if programmatic click is blocked, restore attributes and allow normal click
                if (origToggle !== null)
                  btn.setAttribute("data-bs-toggle", origToggle);
                if (origTarget !== null)
                  btn.setAttribute("data-bs-target", origTarget);
                return;
              }

              // Restore attributes shortly after (allowing file dialog to open)
              setTimeout(() => {
                if (origToggle !== null)
                  btn.setAttribute("data-bs-toggle", origToggle);
                if (origTarget !== null)
                  btn.setAttribute("data-bs-target", origTarget);
              }, 300);
            }
            // otherwise, allow Bootstrap's collapse to work as before
          },
          { capture: true }
        );
      });
    }
    // Hiding and showing the search box
    let search = this.filemanager.querySelector("input[type=search]");

    this.filemanager
      .querySelector(".search")
      .addEventListener("click", function () {
        let _search = this;

        _search.querySelectorAll("span").forEach(function (el, i) {
          el.style.display = "none";
        });
        search.style.display = "block";
        search.focus();
      });

    // Listening for keyboard input on the search field.
    // We are using the "input" event which detects cut and paste
    // in addition to keyboard input.

    search.addEventListener("input", function (e) {
      let folders = [];
      let files = [];

      let value = this.value.trim();

      // Mirror into upload search input if present so both inputs stay in sync
      try {
        const uploadSearchEl = _this.container.querySelector(
          "#upload-search-input"
        );
        if (uploadSearchEl && uploadSearchEl.value !== value) {
          uploadSearchEl.value = value;
        }
      } catch (err) {
        // ignore
      }

      if (value.length) {
        _this.filemanager.classList.add("searching");

        // Update the hash on every key stroke
        window.location.hash = "search=" + value.trim();
      } else {
        _this.filemanager.classList.remove("searching");
        window.location.hash = encodeURIComponent(_this.currentPath);
      }
    });

    // NEW
    search.addEventListener("keyup", function (e) {
      if (e.key === "Escape") {
        this.value = "";
        this.blur(); // will invoke the focusout handler below
      }
    });

    // NEW
    search.addEventListener("focusout", function () {
      if (!this.value.trim().length) {
        window.location.hash = encodeURIComponent(_this.currentPath);
        this.style.display = "none";
        this.parentNode
          .querySelectorAll("span")
          .forEach((el) => (el.style.display = ""));
      }
    });

    // 🔹 NEW: Stock search input wiring — dynamic, debounced, with clear button
    const stockSearchInput = this.container.querySelector(
      "#stock-search-input"
    );
    const stockClearBtn = this.container.querySelector(
      ".clear-stock-search-btn"
    );

    if (stockSearchInput) {
      // Debounce helper local to this scope
      const debounce = function (fn, delay) {
        let t;
        return function () {
          const args = arguments;
          clearTimeout(t);
          t = setTimeout(function () {
            fn.apply(null, args);
          }, delay);
        };
      };

      const doStockSearch = function (q) {
        const query = (q || stockSearchInput.value || "").trim();
        if (query.length) {
          _this.searchStockImages(query, 1);
        } else {
          // Reset to default featured set when input is empty
          _this.searchStockImages("featured", 1);
        }
      };

      const debouncedStockSearch = debounce(function () {
        doStockSearch();
      }, 250);

      // Input handler: show/hide clear button and run debounced search
      stockSearchInput.addEventListener("input", function (e) {
        if (stockClearBtn) {
          stockClearBtn.style.display = this.value.trim() ? "block" : "none";
          stockClearBtn.style.zIndex = "2000";
          stockClearBtn.style.pointerEvents = "auto";
          stockClearBtn.style.color = "#212529";
          stockClearBtn.style.opacity = "1";
        }
        debouncedStockSearch();
      });

      // Keep Enter working as before (immediate search)
      stockSearchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          doStockSearch();
        }
      });

      // Focus: ensure clear button is visible when there's content
      stockSearchInput.addEventListener("focus", function () {
        if (stockClearBtn && this.value.trim()) {
          stockClearBtn.style.display = "block";
          stockClearBtn.style.zIndex = "2000";
          stockClearBtn.style.pointerEvents = "auto";
          stockClearBtn.style.color = "#212529";
          stockClearBtn.style.opacity = "1";
        }
      });

      // Wire clear button
      if (stockClearBtn) {
        stockClearBtn.style.display = stockSearchInput.value.trim()
          ? "block"
          : "none";
        stockClearBtn.addEventListener("click", function (e) {
          e.preventDefault();
          stockSearchInput.value = "";
          stockSearchInput.focus();
          // Reset to default featured set
          _this.searchStockImages("featured", 1);
          stockClearBtn.style.display = "none";
        });
      }
    }

    // 🔹 NEW: Uploads tab search input + button wiring (client-side filter)
    const uploadSearchInput = this.container.querySelector(
      "#upload-search-input"
    );
    const uploadClearBtn = this.container.querySelector(
      ".clear-upload-search-btn"
    );

    if (uploadSearchInput) {
      const handleUploadSearch = function () {
        const q = uploadSearchInput.value.trim();
        const topSearch = _this.filemanager.querySelector("input[type=search]");

        // Keep the top search visually in sync but do NOT re-dispatch
        // its input event (that flow used the URL/hash). We only want
        // a local, client-side filter here.
        if (topSearch && topSearch.value !== q) topSearch.value = q;

        // Perform local filter
        const ql = q.toLowerCase();
        if (!ql.length) {
          const data = _this.searchByPath(_this.currentPath);
          _this.render(data);
          return;
        }
        const files = (_this.response?.[0]?.files || []).filter((f) => {
          const name = String(f?.name || "").toLowerCase();
          const metaTitle = String(f?.meta?.title || "").toLowerCase();
          const metaAlt = String(f?.meta?.alt || "").toLowerCase();
          return (
            name.includes(ql) || metaTitle.includes(ql) || metaAlt.includes(ql)
          );
        });
        _this.render({ folders: [], files });
      };

      // Wire the clear button: clears input and resets results
      if (uploadClearBtn) {
        // initial visibility (use explicit block so it renders reliably)
        uploadClearBtn.style.display = uploadSearchInput.value.trim()
          ? "block"
          : "none";
        uploadClearBtn.addEventListener("click", function (e) {
          e.preventDefault();
          uploadSearchInput.value = "";
          uploadSearchInput.focus();
          // trigger the same handler which will reset to full view when empty
          handleUploadSearch();
          uploadClearBtn.style.display = "none";
        });
      }

      // Use the shared debounce helper defined elsewhere and create
      // a debounced wrapper for the local handler.
      const debouncedUploadSearch = debounce(function () {
        handleUploadSearch();
      }, 200);

      // Show/hide clear button immediately on input and call debounced search
      uploadSearchInput.addEventListener("input", function (e) {
        if (uploadClearBtn) {
          // Use a definite display value so browsers render it reliably
          uploadClearBtn.style.display = this.value.trim() ? "block" : "none";
          // ensure the clear button sits above the input and accepts clicks
          uploadClearBtn.style.zIndex = "2000";
          uploadClearBtn.style.pointerEvents = "auto";
          uploadClearBtn.style.color = "#212529";
          uploadClearBtn.style.opacity = "1";
        }
        // call debounced search
        debouncedUploadSearch();
      });

      // Some browsers/skins can draw focus outlines or composition layers above
      // absolutely positioned inline elements; ensure the clear icon is visible
      // when the input receives focus and has content.
      uploadSearchInput.addEventListener("focus", function () {
        if (uploadClearBtn && this.value.trim()) {
          uploadClearBtn.style.display = "block";
          uploadClearBtn.style.zIndex = "2000";
          uploadClearBtn.style.pointerEvents = "auto";
          uploadClearBtn.style.color = "#212529";
          uploadClearBtn.style.opacity = "1";
        }
      });
    }

    // 🔹 NEW: AI tab search input wiring — dynamic, debounced, with clear button
    const aiSearchInput = this.container.querySelector("#ai-search-input");
    const aiClearBtn = this.container.querySelector(".clear-ai-search-btn");

    if (aiSearchInput) {
      const debounce = function (fn, delay) {
        let t;
        return function () {
          const args = arguments;
          clearTimeout(t);
          t = setTimeout(function () {
            fn.apply(null, args);
          }, delay);
        };
      };

      const doAiSearch = function (q) {
        const query = (q || aiSearchInput.value || "").trim().toLowerCase();
        // If we don't have the aiFiles loaded yet, show a lightweight loading
        // placeholder so the user knows we're waiting for the server, instead
        // of silently doing nothing.
        if (!Array.isArray(_this.aiFiles)) {
          try {
            const list = _this.aiFileList;
            if (list)
              list.innerHTML = `<li class="p-3 text-muted small">Loading AI images...</li>`;
          } catch (e) { }
          return;
        }
        if (!query.length) {
          // render full aiFiles
          const prev = _this.fileList;
          _this.fileList = _this.aiFileList;
          _this.render({ folders: [], files: _this.aiFiles });
          _this.fileList = prev;
          return;
        }
        const filtered = _this.aiFiles.filter((f) => {
          const name = String(f && f.name ? f.name : "").toLowerCase();
          const metaTitle = String(
            f && f.meta && f.meta.title ? f.meta.title : ""
          ).toLowerCase();
          const metaAlt = String(
            f && f.meta && f.meta.alt ? f.meta.alt : ""
          ).toLowerCase();

          // ⭐ NEW: tags text build karo
          let tagsText = "";
          if (f && f.meta && typeof f.meta.tags !== "undefined") {
            if (Array.isArray(f.meta.tags)) {
              tagsText = f.meta.tags.join(" ").toLowerCase();
            } else {
              tagsText = String(f.meta.tags).toLowerCase();
            }
          }

          return (
            name.includes(query) ||
            metaTitle.includes(query) ||
            metaAlt.includes(query) ||
            tagsText.includes(query) // 👈 yaha se tag based search enable ho jayega
          );
        });
        const prev = _this.fileList;
        _this.fileList = _this.aiFileList;
        _this.render({ folders: [], files: filtered });
        _this.fileList = prev;
      };

      const debouncedAiSearch = debounce(function () {
        doAiSearch();
      }, 200);

      aiSearchInput.addEventListener("input", function () {
        if (aiClearBtn) {
          aiClearBtn.style.display = this.value.trim() ? "block" : "none";
          aiClearBtn.style.zIndex = "2000";
          aiClearBtn.style.pointerEvents = "auto";
          aiClearBtn.style.color = "#212529";
          aiClearBtn.style.opacity = "1";
        }
        debouncedAiSearch();
      });

      aiSearchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          doAiSearch();
        }
      });

      aiSearchInput.addEventListener("focus", function () {
        if (aiClearBtn && this.value.trim()) {
          aiClearBtn.style.display = "block";
          aiClearBtn.style.zIndex = "2000";
          aiClearBtn.style.pointerEvents = "auto";
          aiClearBtn.style.color = "#212529";
          aiClearBtn.style.opacity = "1";
        }
      });

      if (aiClearBtn) {
        aiClearBtn.style.display = aiSearchInput.value.trim()
          ? "block"
          : "none";
        aiClearBtn.addEventListener("click", function (e) {
          e.preventDefault();
          aiSearchInput.value = "";
          aiSearchInput.focus();
          doAiSearch("");
          aiClearBtn.style.display = "none";
        });
      }
    }

    // Clicking on folders

    // NEW
    this.fileList.addEventListener("click", function (e) {
      let el = e.target.closest("li.folders");
      if (el) {
        e.preventDefault();
        let nextDir = el.querySelector("a").getAttribute("href");

        if (_this.filemanager.classList.contains("searching")) {
          _this.breadcrumbsUrls = _this.generateBreadcrumbs(nextDir);
          _this.filemanager.classList.remove("searching");

          const search = _this.filemanager.querySelector("input[type=search]");
          search.value = "";
          search.style.display = "none";
          _this.filemanager
            .querySelectorAll("span")
            .forEach((n) => (n.style.display = ""));
        } else {
          _this.breadcrumbsUrls.push(nextDir);
        }

        window.location.hash = encodeURIComponent(nextDir);
        _this.currentPath = nextDir;
      }
    });

    // Clicking on this.breadcrumbs

    this.breadcrumbs.addEventListener("click", function (e) {
      let el = e.target.closest("a");
      if (el) {
        e.preventDefault();

        let index = [...el.parentNode.children].indexOf(el),
          nextDir = _this.breadcrumbsUrls[index];
        nextDir = el.getAttribute("href");

        _this.breadcrumbsUrls.length = Number(index);

        window.location.hash = encodeURIComponent(nextDir);
      }
    });

    // 👇 Auto-load a default set of stock images once
    if (this.stockFileList && !this.hasInitialStockLoaded) {
      this.hasInitialStockLoaded = true;
      this.searchStockImages("featured"); // or "business", "office", etc.
    }
  }

  searchStockImages(query, page = 1) {
    const _this = this;
    if (!query) return;

    // increment a request id so we can ignore out-of-order/stale responses
    this.stockRequestId = (this.stockRequestId || 0) + 1;
    const requestId = this.stockRequestId;

    // store query/page state
    this.stockQuery = query;
    this.stockPage = page;

    // reset when starting a fresh search (page 1)
    if (page === 1) {
      this.stockHasMore = true;
      if (this.stockFileList) {
        this.stockFileList.innerHTML = `
        <li class="loading-item p-3 d-flex align-items-center">
          <div class="spinner-border spinner-border-sm me-2" role="status"></div>
          <span>Searching stock photos...</span>
        </li>
      `;
      }
    } else {
      // show a small loading indicator at the end for subsequent pages
      if (this.stockFileList) {
        // remove any existing bottom loader
        const existing = this.stockFileList.querySelector(
          ".stock-loading-more"
        );
        if (!existing) {
          const li = document.createElement("li");
          // Use flex utilities to center the loader horizontally and vertically
          li.className =
            "stock-loading-more p-3 text-center small d-flex justify-content-center align-items-center";
          li.style.width = "100%";
          li.innerHTML =
            '<div class="spinner-border spinner-border-sm me-2" role="status"></div> <span>Loading more…</span>';
          // Prefer inserting the loader immediately before the sentinel (so it appears
          // visually above the invisible sentinel element). If the sentinel doesn't
          // exist yet, fall back to appending to the end.
          if (
            this.stockSentinel &&
            this.stockSentinel.parentNode === this.stockFileList
          ) {
            this.stockFileList.insertBefore(li, this.stockSentinel);
          } else {
            this.stockFileList.appendChild(li);
          }
        }
      }
    }

    // avoid duplicate loads for the SAME active request; allow new requests to proceed
    if (this.stockLoading && page !== 1) return;
    this.stockLoading = true;

    const url = `/media/stock/search?query=${encodeURIComponent(
      query
    )}&page=${encodeURIComponent(page)}&per_page=${encodeURIComponent(
      this.stockPerPage
    )}`;

    fetch(url, {
      method: "GET",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      credentials: "same-origin",
    })
      .then((res) => {
        // if a newer search was started, ignore this response
        if (this.stockRequestId !== requestId) {
          // throw to jump to finally and let the newer request own the UI
          throw new Error("stale-request");
        }
        if (!res.ok) throw new Error("Failed to fetch stock images");
        return res.json();
      })
      .then((json) => {
        if (this.stockRequestId !== requestId) return;
        const results = Array.isArray(json.results) ? json.results : [];

        // determine if there are more pages
        if (json.total_pages != null) {
          this.stockHasMore = page < json.total_pages;
        } else {
          // fallback: if fewer results than per_page, assume no more
          this.stockHasMore = results.length >= this.stockPerPage;
        }

        // If this is the first page, reset accumulated; otherwise keep accumulating
        if (page === 1) {
          this.stockAccumulatedFiles = [];
        }

        // render: renderStockImages will update the accumulated array and re-render the whole grid
        this.renderStockImages(json, page > 1);

        // set up sentinel observer once (lazy) — use the sentinel created by renderStockImages
        if (!this.stockObserver) {
          try {
            const panel = this.container.querySelector(
              '.display-panel[data-tab="stock"]'
            );
            // renderStockImages ensures this.stockSentinel exists and is appended
            if (
              panel &&
              this.stockSentinel &&
              this.stockSentinel.parentNode === this.stockFileList
            ) {
              this.stockObserver = new IntersectionObserver(
                (entries) => {
                  for (const entry of entries) {
                    if (entry.isIntersecting) {
                      // load next page when sentinel visible
                      if (_this.stockHasMore && !_this.stockLoading) {
                        _this.searchStockImages(
                          _this.stockQuery,
                          _this.stockPage + 1
                        );
                      }
                    }
                  }
                },
                { root: panel, rootMargin: "200px" }
              );

              this.stockObserver.observe(this.stockSentinel);
            }
          } catch (err) {
            console.warn("Stock observer init failed", err);
          }
        }
      })
      .catch((err) => {
        // ignore our synthetic stale-request errors silently
        if (err && err.message === "stale-request") return;
        console.error("Error fetching stock images", err);
        if (this.stockFileList && page === 1) {
          this.stockFileList.innerHTML = `
          <li class="text-danger p-3">Failed to load stock images. Please try again.</li>
        `;
        }
      })
      .finally(() => {
        // only remove loading state for the request that started it
        if (this.stockRequestId !== requestId) return;
        // remove inline loading-more indicator if present
        const existing =
          this.stockFileList &&
          this.stockFileList.querySelector(".stock-loading-more");
        if (existing && existing.parentNode)
          existing.parentNode.removeChild(existing);
        this.stockLoading = false;
      });
  }

  renderStockImages(data, append = false) {
    if (!this.stockFileList) return;

    const results = Array.isArray(data.results) ? data.results : [];

    // Map Unsplash items to your existing "file" structure
    const files = results.map((item, index) => {
      const base = (item.alt || item.description || `stock-image-${index + 1}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const fileName = (base || `stock-image-${index + 1}`) + ".jpg";

      return {
        type: "file",
        name: fileName,
        path: item.full,
        size: 1,
        meta: {
          source: "unsplash",
          thumb: item.thumb,
          unsplash_id: item.id,
          alt: item.alt || "",
          author: item.author || "",
          author_link: item.author_link || "",
        },
      };
    });

    // Maintain an accumulated array and re-render the entire grid so CSS/layout
    // path used by `render()` runs and produces consistent rows.
    if (!append) {
      this.stockAccumulatedFiles = files.slice();
    } else {
      this.stockAccumulatedFiles = this.stockAccumulatedFiles.concat(files);
    }

    // Temporarily set fileList -> stockFileList and call render() which replaces children
    const previousFileList = this.fileList;
    this.fileList = this.stockFileList;

    this.render({ folders: [], files: this.stockAccumulatedFiles });

    // Ensure sentinel is at the end (observer watches it)
    if (this.stockSentinel) {
      if (this.stockSentinel.parentNode !== this.stockFileList) {
        this.stockFileList.appendChild(this.stockSentinel);
      }
    } else {
      // create a sentinel if none exists
      this.stockSentinel = document.createElement("li");
      this.stockSentinel.className =
        "stock-scroll-sentinel p-2 text-center small";
      this.stockFileList.appendChild(this.stockSentinel);
    }

    // If an IntersectionObserver already exists, ensure it observes the (possibly new) sentinel.
    // This avoids the case where the sentinel DOM node was removed/recreated and
    // the observer never re-attaches, which breaks infinite scroll.
    if (this.stockObserver && this.stockSentinel) {
      try {
        this.stockObserver.observe(this.stockSentinel);
      } catch (e) {
        // ignore; observer may have been disconnected elsewhere
      }
    }

    // Optional: show stock-specific 'nothing found'
    const stockNothing = this.container.querySelector(".stock-nothingfound");
    if (stockNothing) {
      // if appending, we don't want to flip the empty state incorrectly; check total list size
      const anyFiles =
        this.stockFileList.querySelectorAll("li.files").length > 0;
      stockNothing.style.display = anyFiles ? "none" : "";
    }

    // Restore original fileList for My Uploads / AI Gallery
    this.fileList = previousFileList;

    // If we've exhausted results, optionally remove sentinel/observer
    if (!this.stockHasMore && this.stockSentinel) {
      try {
        if (this.stockObserver && this.stockSentinel) {
          this.stockObserver.unobserve(this.stockSentinel);
        }
      } catch (e) { }
      if (this.stockSentinel && this.stockSentinel.parentNode) {
        this.stockSentinel.parentNode.removeChild(this.stockSentinel);
      }
      this.stockSentinel = null;
    }
  }

  addStockImageToMedia(item) {
    // Normalize Unsplash item → your internal "file" shape
    const fileObj = {
      type: "file",
      name: (item.id || "stock-image") + ".jpg",
      path: item.full, // full-size URL used when inserting
      url: item.full, // if your addFile uses 'url', we set both
      thumb: item.thumb, // for preview in gallery if needed
      size: 1, // Unknown, set dummy size or adjust if needed
      meta: {
        source: "unsplash",
        unsplash_id: item.id,
        alt: item.alt || "",
        author: item.author || "",
        author_link: item.author_link || "",
      },
    };

    // Use your existing addFile() logic to:
    // - Add it to #media-files (My Uploads list)
    // - Update selection state
    if (typeof this.addFile === "function") {
      this.addFile(fileObj);
    } else {
      console.warn(
        "addFile() is not defined on Media, cannot add stock image."
      );
    }

    // Optional: switch back to "My Uploads" tab after selection
    if (typeof this.switchTab === "function") {
      this.switchTab("uploads");
    }
  }

  // --- Load AI Gallery files from backend and render them into AI tab ---
  loadAiGallery() {
    const modal = document.getElementById("MediaModal");
    if (!modal) return;

    const aiList = modal.querySelector("#ai-media-files");
    if (!aiList) return;

    // Avoid re-loading on every tab click
    if (this.aiLoaded) return;

    // Optionally show some "loading" state
    aiList.innerHTML = `<li class="p-3 text-muted small">Loading AI images...</li>`;

    fetch(mediaAiScanUrl, { credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load AI gallery");
        }
        return response.json();
      })
      .then((data) => {
        // Clear placeholder
        aiList.innerHTML = "";

        // Build an internal files array and render via render() so filtering is easy
        // Accept multiple response shapes: array of strings, array of objects, or
        // an object with `files`/`results`/`data` arrays. Normalize into
        // { name, type, path, size, meta, _idx } objects.
        let items = [];
        if (Array.isArray(data)) items = data;
        else if (Array.isArray(data.files)) items = data.files;
        else if (Array.isArray(data.results)) items = data.results;
        else if (data && Array.isArray(data.data)) items = data.data;
        else items = [];

        const files = items
          .map((it, idx) => {
            if (!it) return null;
            // string item -> treat as URL
            if (typeof it === "string") {
              const url = it;
              return {
                name: url.split("/").pop(),
                type: "file",
                path: url,
                size: (data.sizes && data.sizes[url]) || 1,
                meta: (data.meta && data.meta[url]) || undefined,
                _idx: idx,
              };
            }

            // object item -> look for common fields
            if (typeof it === "object") {
              const url = it.url || it.path || it.src || it.image || "";
              const name =
                it.name ||
                it.title ||
                (url ? url.split("/").pop() : `ai-${idx}`);
              const size = it.size || (data.sizes && data.sizes[url]) || 1;
              const meta =
                it.meta || (data.meta && data.meta[url]) || undefined;
              return {
                name,
                type: "file",
                path: url,
                size,
                meta,
                _idx: idx,
              };
            }

            return null;
          })
          .filter(Boolean);

        // Store AI files for future filtering/search
        this.aiFiles = files.slice();

        // Debug: expose a hint in console so we can confirm load in devtools
        try {
          console.debug &&
            console.debug("MediaModal: loaded AI files", this.aiFiles.length);
        } catch (e) { }

        // If no files found, show a clear empty state message
        if (!this.aiFiles.length) {
          aiList.innerHTML = `<li class="p-3 text-muted small">No AI images found.</li>`;
          this.aiLoaded = true; // mark as done to avoid refetch loops
          return;
        }

        // Mark as loaded so we don't reload repeatedly (set only after successful fetch)
        this.aiLoaded = true;

        // Client-side pagination: show PAGE_SIZE at a time and use a sentinel +
        // stock-style loader to auto-load more when the user scrolls.
        const PAGE_SIZE = this.aiPageSize || 30;
        this.aiPageSize = PAGE_SIZE;
        this.aiPage = 0;
        this.aiAccumulatedFiles = [];
        this.aiLoading = false;

        const panel = modal.querySelector('.display-panel[data-tab="ai"]');

        // helper to remove any inline loading indicator
        const removeAiInlineLoader = () => {
          const existing = aiList.querySelector(".stock-loading-more");
          if (existing && existing.parentNode)
            existing.parentNode.removeChild(existing);
        };

        // append a page (0-based)
        this.appendAiPage = (page) => {
          const start = page * PAGE_SIZE;
          const chunk = this.aiFiles.slice(start, start + PAGE_SIZE);

          if (page === 0) {
            this.aiAccumulatedFiles = chunk.slice();
          } else {
            this.aiAccumulatedFiles = this.aiAccumulatedFiles.concat(chunk);
          }

          // render accumulated items using existing render() so layout remains consistent
          const previousFileList = this.fileList;
          this.fileList = aiList;
          this.render({ folders: [], files: this.aiAccumulatedFiles });
          this.fileList = previousFileList;

          // clean any inline loader
          removeAiInlineLoader();

          const total = this.aiFiles.length;
          const newEnd = Math.min((page + 1) * PAGE_SIZE, total);

          // ensure sentinel exists at the end (observer will watch it)
          if (this.aiSentinel) {
            if (this.aiSentinel.parentNode !== this.aiFileList) {
              this.aiFileList.appendChild(this.aiSentinel);
            }
          } else {
            this.aiSentinel = document.createElement("li");
            this.aiSentinel.className =
              "ai-scroll-sentinel p-2 text-center small";
            this.aiFileList.appendChild(this.aiSentinel);
          }

          // if we've loaded all, remove sentinel/observer
          if (newEnd >= total) {
            try {
              if (this.aiObserver && this.aiSentinel)
                this.aiObserver.unobserve(this.aiSentinel);
            } catch (e) { }
            if (this.aiSentinel && this.aiSentinel.parentNode)
              this.aiSentinel.parentNode.removeChild(this.aiSentinel);
            this.aiSentinel = null;
            if (this.aiObserver) this.aiObserver = null;
            return;
          }

          // lazily create an IntersectionObserver to auto-load next page
          if (!this.aiObserver) {
            try {
              this.aiObserver = new IntersectionObserver(
                (entries) => {
                  for (const entry of entries) {
                    if (entry.isIntersecting) {
                      if (!this.aiLoading) {
                        // show inline loader like stock tab
                        if (!aiList.querySelector(".stock-loading-more")) {
                          const li = document.createElement("li");
                          li.className =
                            "stock-loading-more p-3 text-center small d-flex justify-content-center align-items-center";
                          li.style.width = "100%";
                          li.innerHTML =
                            '<div class="spinner-border spinner-border-sm me-2" role="status"></div> <span>Loading more…</span>';
                          if (
                            this.aiSentinel &&
                            this.aiSentinel.parentNode === aiList
                          ) {
                            aiList.insertBefore(li, this.aiSentinel);
                          } else {
                            aiList.appendChild(li);
                          }
                        }

                        this.aiLoading = true;
                        // small timeout to allow spinner paint and keep loader visible briefly
                        const delay = this.aiLoadDelay ?? 600; // ms; default 600ms
                        setTimeout(() => {
                          this.aiPage = this.aiPage + 1;
                          this.appendAiPage(this.aiPage);
                          this.aiLoading = false;
                        }, delay);
                      }
                    }
                  }
                },
                { root: panel, rootMargin: "200px" }
              );

              if (this.aiSentinel) this.aiObserver.observe(this.aiSentinel);
            } catch (err) {
              console.warn("AI observer init failed", err);
            }
          } else {
            // ensure observer is watching sentinel
            try {
              if (this.aiSentinel) this.aiObserver.observe(this.aiSentinel);
            } catch (e) { }
          }
        };

        // render first page
        this.appendAiPage(0);

        // If the user already typed into the AI search field before images finished loading,
        // trigger the input handler so the existing debounced search runs against loaded files.
        try {
          const aiSearchInput = modal.querySelector("#ai-search-input");
          if (
            aiSearchInput &&
            aiSearchInput.value &&
            aiSearchInput.value.trim()
          ) {
            aiSearchInput.dispatchEvent(new Event("input", { bubbles: true }));
          }
        } catch (ex) {
          // non-fatal; ignore
        }
      })
      .catch((err) => {
        console.error(err);
        aiList.innerHTML = `<li class="p-3 text-danger small">Error loading AI images.</li>`;
      });
  }

  // --- Client-side pagination for My Uploads (mirrors AI Gallery behavior) ---
  loadUploadsGallery() {
    const modal = document.getElementById("MediaModal");
    if (!modal) return;

    const uploadsList = modal.querySelector("#media-files");
    if (!uploadsList) return;

    // Avoid re-initializing
    if (this.uploadsLoaded) return;

    // Ensure we have the response array populated by the initial fetch.
    if (!this.response || !this.response.length || !this.response[0].files) {
      this._uploadsInitTries = (this._uploadsInitTries || 0) + 1;
      // Show a lightweight inline loading indicator while we wait for
      // the server response so the panel doesn't flash its empty state.
      try {
        if (
          uploadsList &&
          !uploadsList.querySelector(".stock-loading-more") &&
          this._uploadsInitTries <= 10
        ) {
          uploadsList.innerHTML = `\n            <li class="stock-loading-more p-3 text-center small d-flex justify-content-center align-items-center">\n              <div class="spinner-border spinner-border-sm me-2" role="status"></div> <span>Loading uploads…</span>\n            </li>`;
        }
      } catch (e) {
        // ignore render failures
      }

      if (this._uploadsInitTries <= 10) {
        setTimeout(() => {
          try {
            this.loadUploadsGallery();
          } catch (e) { }
        }, 200);
      } else {
        // after several retries, show a clear empty state
        uploadsList.innerHTML = `<li class="p-3 text-muted small">No uploads available.</li>`;
      }
      return;
    }

    // Normalize source array and keep reference to list element
    const files = (this.response[0].files || []).slice();
    this.uploadsFiles = files;
    this.uploadsFileList = uploadsList;

    if (!this.uploadsFiles.length) {
      // uploadsList.innerHTML = `<li class="p-3 text-muted small">No uploads found.</li>`;
      this.uploadsLoaded = true;
      return;
    }

    this.uploadsLoaded = true;

    const PAGE_SIZE = this.uploadsPageSize || 30;
    this.uploadsPageSize = PAGE_SIZE;
    this.uploadsPage = 0;
    this.uploadsAccumulatedFiles = [];
    this.uploadsLoading = false;

    const panel = modal.querySelector('.display-panel[data-tab="uploads"]');

    const removeUploadsInlineLoader = () => {
      const existing = uploadsList.querySelector(".stock-loading-more");
      if (existing && existing.parentNode)
        existing.parentNode.removeChild(existing);
    };

    this.appendUploadsPage = (page) => {
      const start = page * PAGE_SIZE;
      const chunk = this.uploadsFiles.slice(start, start + PAGE_SIZE);

      if (page === 0) {
        this.uploadsAccumulatedFiles = chunk.slice();
      } else {
        this.uploadsAccumulatedFiles =
          this.uploadsAccumulatedFiles.concat(chunk);
      }

      // render accumulated items using existing render() so layout remains consistent
      const previousFileList = this.fileList;
      this.fileList = uploadsList;
      this.render({ folders: [], files: this.uploadsAccumulatedFiles });
      this.fileList = previousFileList;

      // clean any inline loader
      removeUploadsInlineLoader();

      const total = this.uploadsFiles.length;
      const newEnd = Math.min((page + 1) * PAGE_SIZE, total);

      // ensure sentinel exists at the end (observer will watch it)
      if (this.uploadsSentinel) {
        if (this.uploadsSentinel.parentNode !== this.uploadsFileList) {
          this.uploadsFileList.appendChild(this.uploadsSentinel);
        }
      } else {
        this.uploadsSentinel = document.createElement("li");
        this.uploadsSentinel.className =
          "uploads-scroll-sentinel p-2 text-center small";
        this.uploadsFileList.appendChild(this.uploadsSentinel);
      }

      // if we've loaded all, remove sentinel/observer
      if (newEnd >= total) {
        try {
          if (this.uploadsObserver && this.uploadsSentinel)
            this.uploadsObserver.unobserve(this.uploadsSentinel);
        } catch (e) { }
        if (this.uploadsSentinel && this.uploadsSentinel.parentNode)
          this.uploadsSentinel.parentNode.removeChild(this.uploadsSentinel);
        this.uploadsSentinel = null;
        if (this.uploadsObserver) this.uploadsObserver = null;
        return;
      }

      // lazily create an IntersectionObserver to auto-load next page
      if (!this.uploadsObserver) {
        try {
          this.uploadsObserver = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  if (!this.uploadsLoading) {
                    // show inline loader like stock tab
                    if (!uploadsList.querySelector(".stock-loading-more")) {
                      const li = document.createElement("li");
                      li.className =
                        "stock-loading-more p-3 text-center small d-flex justify-content-center align-items-center";
                      li.style.width = "100%";
                      li.innerHTML =
                        '<div class="spinner-border spinner-border-sm me-2" role="status"></div> <span>Loading more…</span>';
                      if (
                        this.uploadsSentinel &&
                        this.uploadsSentinel.parentNode === uploadsList
                      ) {
                        uploadsList.insertBefore(li, this.uploadsSentinel);
                      } else {
                        uploadsList.appendChild(li);
                      }
                    }

                    this.uploadsLoading = true;
                    const delay =
                      this.uploadsLoadDelay ?? this.aiLoadDelay ?? 600; // ms
                    setTimeout(() => {
                      this.uploadsPage = this.uploadsPage + 1;
                      this.appendUploadsPage(this.uploadsPage);
                      this.uploadsLoading = false;
                    }, delay);
                  }
                }
              }
            },
            { root: panel, rootMargin: "200px" }
          );

          if (this.uploadsSentinel)
            this.uploadsObserver.observe(this.uploadsSentinel);
        } catch (err) {
          console.warn("Uploads observer init failed", err);
        }
      } else {
        // ensure observer is watching sentinel
        try {
          if (this.uploadsSentinel)
            this.uploadsObserver.observe(this.uploadsSentinel);
        } catch (e) { }
      }
    };

    // render first page
    this.appendUploadsPage(0);
  }

  // Navigates to the given hash (path)

  goto(hash) {
    hash = decodeURIComponent(hash).slice(1).split("=");
    let _this = this;

    if (hash.length) {
      let rendered = "";

      // if hash has search in it

      // inside goto(hash), replace the whole `if (hash[0] === 'search') { ... }` block
      // inside goto(hash)
      if (hash[0] === "search") {
        this.filemanager.classList.add("searching");

        const term = (hash[1] || "").toLowerCase();
        const files =
          this.response && this.response[0] && this.response[0].files
            ? this.response[0].files
            : [];

        const rendered = {
          folders: [],
          files: files.filter((f) =>
            (f.name || "").toLowerCase().includes(term)
          ),
        };

        // Do not change `currentPath` when handling a search hash —
        // searches are a transient filter over the current files list.
        this.render(rendered);
        return;
      }

      // if hash is some path
      else if (hash[0].trim().length) {
        rendered = this.searchByPath(hash[0]);

        if (rendered.length) {
          this.currentPath = hash[0];
          this.breadcrumbsUrls = this.generateBreadcrumbs(hash[0]);
          this.render(rendered);
        } else {
          this.currentPath = hash[0];
          this.breadcrumbsUrls = this.generateBreadcrumbs(hash[0]);
          this.render(rendered);
        }
      }

      // if there is no hash
      else {
        this.currentPath = this.response[0]?.path ?? "";
        this.breadcrumbsUrls.push(this.currentPath);
        this.render(this.searchByPath(this.currentPath));
      }
    }
  }

  // Splits a file path and turns it into clickable breadcrumbs
  _;
  generateBreadcrumbs(nextDir) {
    let path = nextDir.split("/").slice(0);
    for (let i = 1; i < path.length; i++) {
      path[i] = path[i - 1] + "/" + path[i];
    }
    return path;
  }

  searchByPath(dir) {
    // Since we're not using folders, just return all files at the root.
    if (this.response && this.response.length && this.response[0].files) {
      return { folders: [], files: this.response[0].files };
    }
    return { folders: [], files: [] };
  }

  // Recursively search through the file tree

  searchData(data, searchTerms) {
    let _this = this;
    let folders = [];
    let files = [];

    let _searchData = function (data, searchTerms) {
      data.forEach(function (d) {
        if (d.type === "folder") {
          _searchData(d.items, searchTerms);

          if (d.name.toLowerCase().indexOf(searchTerms) >= 0) {
            folders.push(d);
          }
        } else if (d.type === "file") {
          if (d.name.toLowerCase().indexOf(searchTerms) >= 0) {
            files.push(d);
          }
        }
      });
    };

    _searchData(data, searchTerms);

    return { folders: folders, files: files };
  }

  onUpload(event) {
    // Support both input.change handler (this === input) and drop events (event.dataTransfer.files)
    let input = this;
    let files = [];

    if (event && event.dataTransfer && event.dataTransfer.files) {
      files = Array.from(event.dataTransfer.files || []);
      // create a pseudo-input so the remainder of the flow that resets input.value keeps working
      input = { files: files, value: "" };
    } else if (event && event.target && event.target.files) {
      input = event.target;
      files = Array.from(event.target.files || []);
    } else if (this && this.files) {
      input = this;
      files = Array.from(this.files || []);
    } else {
      return;
    }

    if (!files.length) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "image/webp",
      "application/pdf",
      "video/mp4",
      "video/webm",
      "video/ogg",
    ];
    const MAX_IMAGE = 5 * 1024 * 1024; // 5 MB
    const MAX_PDF = 10 * 1024 * 1024; // 10 MB
    const MAX_VIDEO = 20 * 1024 * 1024; // 20 MB

    const getCookie = (name) => {
      const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return m ? decodeURIComponent(m[2]) : null;
    };

    const uploadOne = (file) => {
      return new Promise((resolve, reject) => {
        const isVideo = file.type.startsWith("video/");
        const isPdf = file.type === "application/pdf";
        const maxSize = isVideo ? MAX_VIDEO : isPdf ? MAX_PDF : MAX_IMAGE;

        if (!allowedTypes.includes(file.type)) {
          displayToast(
            "bg-danger",
            "Error",
            "Invalid file type. Only images, videos and PDF are allowed."
          );
          return reject(new Error("invalid-type"));
        }
        if (file.size > maxSize) {
          const label = isVideo ? "video" : isPdf ? "PDF" : "image";
          displayToast(
            "bg-danger",
            "Too large",
            `Selected ${label} exceeds ${Math.round(
              maxSize / 1024 / 1024
            )} MB limit.`
          );
          return reject(new Error("too-large"));
        }

        const modal = Vvveb?.MediaModal || this;
        const fileListEl =
          modal?.fileList || document.querySelector("#media-files");

        // Create a temporary placeholder list item with a progress UI
        const temp = document.createElement("li");
        temp.className = "files temporary-upload";
        temp.innerHTML = `
          <div class="info">
            <div class="name">${modal && typeof modal.escapeHTML === "function"
            ? modal.escapeHTML(file.name)
            : file.name
          }</div>
            <div class="details">${modal && typeof modal.bytesToSize === "function"
            ? modal.bytesToSize(file.size)
            : Math.round(file.size / 1024) + " KB"
          }</div>
          </div>
          <div class="upload-overlay">
            <div class="upload-progress">
              <div class="bar"><div class="fill"></div></div>
              <div class="label">Preparing…</div>
            </div>
          </div>
        `;

        if (fileListEl) fileListEl.prepend(temp);

        const xhr = new XMLHttpRequest();
        const url = "/user/media-upload";
        xhr.open("POST", url, true);
        xhr.withCredentials = true;

        // Set headers (CSRF)
        const token = getCookie("XSRF-TOKEN");
        if (token) xhr.setRequestHeader("X-XSRF-TOKEN", token);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        xhr.upload.onprogress = function (e) {
          if (!e.lengthComputable) return;
          const pct = Math.round((e.loaded / e.total) * 100);
          const fill = temp.querySelector(".fill");
          const label = temp.querySelector(".label");
          if (fill) fill.style.width = pct + "%";
          if (label) label.textContent = `Uploading — ${pct}%`;
        };

        xhr.onload = function () {
          try {
            if (xhr.status >= 200 && xhr.status < 300) {
              const data = JSON.parse(xhr.responseText || "{}");
              if (!data.success)
                throw new Error(data.message || "Upload failed");

              const f = {
                name: data.filename,
                type: "file",
                path: data.url,
                size: data.size || file.size,
                mime: data.mime || file.type,
                width: data.width || null,
                height: data.height || null,
              };

              // Replace temp with final element generated by addFile
              const finalEl = Vvveb.MediaModal.addFile(f, true);
              if (temp && temp.parentNode) temp.parentNode.removeChild(temp);

              // Update in-memory cache and include a created_at timestamp so sorting works immediately
              if (modal) {
                if (!Array.isArray(modal.response?.[0]?.files))
                  modal.response = [{ folders: [], files: [] }];
                const createdAt = data.created_at || new Date().toISOString();
                const newFileObj = {
                  name: f.name,
                  type: "file",
                  path: f.path,
                  size: f.size || 1,
                  mime: f.mime || "",
                  meta: data.meta || f.meta || undefined,
                  created_at: createdAt,
                  _idx: modal.response[0].files.length || 0,
                };
                modal.response[0].files.push(newFileObj);

                // Re-apply active sort and re-render current view so the new file is placed correctly
                try {
                  const sortEl = modal.container.querySelector("#sort");
                  const sortBy = sortEl ? sortEl.value : "newest";
                  if (typeof modal.sortFiles === "function")
                    modal.sortFiles(sortBy);
                  const dataView = modal.searchByPath(modal.currentPath);
                  if (dataView) modal.render(dataView);

                  // Find the newly added list item and restore selection/scroll
                  const newInput = modal.fileList.querySelector(
                    "input[name='filename[]'][value='" +
                    (newFileObj.path || "") +
                    "']"
                  );
                  const newLi = newInput ? newInput.closest("li.files") : null;
                  if (newLi) {
                    const chk = newLi.querySelector("input[name='file[]']");
                    if (chk) {
                      chk.checked = true;
                      modal.updateSaveButtonState();
                      chk.dispatchEvent(new Event("change", { bubbles: true }));
                    }
                    newLi.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "center",
                    });
                  }
                } catch (e) {
                  // non-fatal; fallback to leaving the item where addFile placed it
                  console.warn("Could not re-sort/render after upload", e);
                }
              }

              return resolve(f);
            }

            throw new Error("Upload failed with status " + xhr.status);
          } catch (err) {
            // show error state
            if (temp) {
              temp.innerHTML = `<div class="upload-error">Upload failed</div>`;
              setTimeout(() => {
                try {
                  temp.parentNode && temp.parentNode.removeChild(temp);
                } catch (e) { }
              }, 2500);
            }
            return reject(err);
          }
        };

        xhr.onerror = function () {
          if (temp) {
            temp.innerHTML = `<div class="upload-error">Network error</div>`;
            setTimeout(() => {
              try {
                temp.parentNode && temp.parentNode.removeChild(temp);
              } catch (e) { }
            }, 2500);
          }
          return reject(new Error("network-error"));
        };

        const fd = new FormData();
        fd.append("file", file);
        xhr.send(fd);
      });
    };

    Vvveb.MediaModal.showUploadLoading();
    (async () => {
      try {
        for (const f of files) await uploadOne(f); // sequential to keep UI sane
      } catch (e) {
        displayToast(
          "bg-danger",
          "Error",
          e.message?.slice(0, 200) || "Error uploading!"
        );
      } finally {
        Vvveb.MediaModal.hideUploadLoading();
        try {
          input.value = "";
        } catch (err) {
          /* some file objects are read-only */
        }
      }
    })();
  }

  deleteFile(el) {
    // first stage: open confirm modal
    const li = el.closest("li.files");
    if (!li) return;

    this.setIconLoading(el, true);
    this._deleteCtx = { li, btn: el };

    this.openConfirm(li);

    const modalEl =
      this.deleteModal || document.getElementById("MediaDeleteModal");
    if (modalEl) {
      const done = () => {
        this.setIconLoading(el, false);
        modalEl.removeEventListener("shown.bs.modal", done);
      };
      modalEl.addEventListener("shown.bs.modal", done);
    } else {
      setTimeout(() => this.setIconLoading(el, false), 600);
    }
  }

  // 1) Replace old renameFile with this (still inside class)
  renameFile(el) {
    const li = el.closest("li");
    if (!li) return;

    // show spinner on the exact clicked icon button
    this.setIconLoading(el, true);
    // keep a ref in context so we can always restore it
    this._renameCtx = { ...(this._renameCtx || {}), li, btn: el };

    // open modal
    this.showRenameDialog(li);

    // as soon as modal is visible, restore the icon
    if (this.renameModal) {
      const onceShown = () => {
        this.setIconLoading(el, false);
        this.renameModal.removeEventListener("shown.bs.modal", onceShown);
      };
      this.renameModal.addEventListener("shown.bs.modal", onceShown);
    } else {
      // fallback restore (if modal ref not present for any reason)
      setTimeout(() => this.setIconLoading(el, false), 600);
    }
  }

  // 2) Keep/insert showRenameDialog (inside class) if not already added
  showRenameDialog(li) {
    // Try hidden filename input (various markup variants), fall back to info name text
    const hidden = li.querySelector(
      'input[name="filename[]"], input[type="hidden"]'
    );
    const url = hidden?.value || "";
    const nameEl = li.querySelector(".info .name");

    // Always compute the filename and extension from the actual URL (canonical)
    const filenameFromUrl = (url && url.split("/").pop()) || "";
    const urlParts = filenameFromUrl.split(".");
    const extFromUrl = urlParts.length > 1 ? urlParts.pop() : "";
    const baseFromUrl = urlParts.join(".") || filenameFromUrl;

    // For display (Current name) prefer a human-friendly title if present.
    // Otherwise fall back to the canonical filename base (not the visible
    // info element, which may be truncated to an ellipsis). This prevents
    // the rename modal from showing a clipped "…" value after reload.
    const displayLabel =
      (li.dataset.title && String(li.dataset.title).trim()) ||
      baseFromUrl ||
      filenameFromUrl ||
      "";

    this._renameCtx = {
      li,
      url,
      filename: filenameFromUrl,
      ext: extFromUrl,
      base: baseFromUrl,
    };

    // Show the human-friendly title (if present) as the Current name
    this.renameCurrentEl.textContent = displayLabel;
    // Do not prefill the input — leave it empty so the placeholder forces user input
    this.renameInputEl.value = "";
    this.renameExtEl.textContent = extFromUrl ? "." + extFromUrl : "";
    this.renameErrorEl.style.display = "none";
    this.renameErrorEl.textContent = "";

    bootstrap.Modal.getOrCreateInstance(this.renameModal).show();
  }

  // 3) NOW paste your submitRename() exactly here (inside class)
  async submitRename() {
    const ctx = this._renameCtx;
    if (!ctx) return;

    if (this.renameSubmitBtn && this.renameSubmitBtn.disabled) return;

    // simple sanitization: keep letters, numbers, dashes, underscores, dots, spaces
    // IMPORTANT: do NOT convert spaces to dashes here — keep user input as-is
    let base = this.renameInputEl.value
      .trim()
      .replace(/[^\w.\-\s]/g, "")
      .replace(/\s+/g, " ");
    if (!base) {
      this.renameErrorEl.textContent = "Name cannot be empty.";
      this.renameErrorEl.style.display = "block";
      return;
    }

    const newFilename = ctx.ext ? `${base}.${ctx.ext}` : base;

    // Build payload – expect your Laravel to accept: file (current URL) & newfile (new name)
    const form = new FormData();
    form.append("file", ctx.url);
    form.append("newfile", newFilename);

    function getCookie(name) {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    }

    // 🔵 show the loader on the Update button
    this.startRenameLoading("Updating…");
    this.renameErrorEl.style.display = "none";
    this.renameErrorEl.textContent = "";

    try {
      const res = await fetch("/user/media-rename", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          "X-Requested-With": "XMLHttpRequest",
        },
        body: form,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Rename failed");
      }

      // Prefer backend’s final values if returned
      const finalName = data.filename || newFilename;
      const finalUrl = data.url || ctx.url.replace(ctx.filename, finalName);

      // update UI for every matching list item across all panels (uploads, ai, stock)
      const oldUrl = ctx.url;
      const oldBase = (ctx.url || "").split("/").pop();

      // find all list items whose hidden absolute filename matches the old URL
      const hiddenInputs = Array.from(
        document.querySelectorAll('input[name="filename[]"]')
      );

      hiddenInputs.forEach((hiddenInput) => {
        try {
          const val = hiddenInput.value || "";
          const li = hiddenInput.closest("li.files");
          // match by exact old absolute URL or by basename fallback
          if (val === oldUrl || val.split("/").pop() === oldBase) {
            // update hidden absolute URL
            hiddenInput.value = finalUrl;

            // update displayed names (both primary and nested preview name)
            const nameEl2 = li.querySelector(".info .name");
            const previewName = li.querySelector(".preview .name");

            // show a truncated display when the name is long, keep full name in title/dataset
            const makeDisplayName = (full) => {
              const MAX_NAME_LEN = 15;
              if (!full) return full;
              if (full.length <= MAX_NAME_LEN) return full;
              const parts = full.split(".");
              const ext = parts.length > 1 ? parts.pop() : "";
              const base = parts.join(".") || full;
              if (ext) {
                const maxBaseLen = Math.max(5, MAX_NAME_LEN - (ext.length + 4));
                const shortBase =
                  base.length > maxBaseLen
                    ? base.slice(0, maxBaseLen) + "…"
                    : base;
                return shortBase + "." + ext;
              }
              return full.slice(0, MAX_NAME_LEN - 1) + "…";
            };

            const display = makeDisplayName(finalName);
            if (nameEl2) {
              nameEl2.textContent = display;
              nameEl2.setAttribute("title", finalName);
            }
            if (previewName) {
              previewName.textContent = display;
              previewName.setAttribute("title", finalName);
            }

            // update dataset title so meta/image view pick it up
            // store a human-friendly title WITHOUT the file extension
            const finalBaseNoExt = (finalName || "").replace(/\.[^.]+$/, "");
            if (li) li.dataset.title = finalBaseNoExt;

            // update any image previews
            const img2 =
              li.querySelector("img.image") || li.querySelector(".preview img");
            if (img2) img2.src = finalUrl;

            // update the selectable input value if present
            const sel2 = li.querySelector('input[name="file[]"]');
            if (sel2) {
              try {
                sel2.value = finalUrl.startsWith(this.mediaPath)
                  ? finalUrl.slice(this.mediaPath.length)
                  : finalUrl;
              } catch {
                sel2.value = finalUrl;
              }
            }
          }
        } catch (e) {
          // ignore per-item failures
        }
      });

      // update in-memory cache so searches/sorts see the new name/path everywhere
      if (this.response && Array.isArray(this.response[0]?.files)) {
        const files = this.response[0].files;
        files.forEach((fileObj) => {
          if (
            fileObj.path === oldUrl ||
            fileObj.name === ctx.filename ||
            fileObj.name === oldBase ||
            (fileObj.path || "").split("/").pop() === oldBase
          ) {
            fileObj.name = finalName;
            fileObj.path = finalUrl;
          }
        });
      }

      // close modal + toast
      bootstrap.Modal.getInstance(this.renameModal)?.hide();
      displayToast("bg-success", "Renamed", data.message || "File renamed.");
    } catch (err) {
      this.renameErrorEl.textContent = err.message;
      this.renameErrorEl.style.display = "block";
    } finally {
      // 🔁 always restore the button
      this.stopRenameLoading();
    }
  }

  // called by the confirm dialog’s Delete button
  async confirmedDelete() {
    const ctx = this._confirmCtx;
    if (!ctx) return;

    const form = new FormData();
    form.append("file", ctx.url); // absolute URL (same shape you use for meta/rename)

    // optional: disable button while deleting
    this.confirmBtnDel.disabled = true;
    this.confirmBtnDel.innerHTML =
      '<span class="spinner-border spinner-border-sm me-1"></span>Deleting…';

    function getCookie(name) {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    }
    try {
      const res = await fetch("/user/media-delete", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          "X-Requested-With": "XMLHttpRequest",
        },
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success !== true) {
        throw new Error(data.message || "Delete failed");
      }

      // remove from UI
      ctx.li.remove();

      // --- ADD THIS BLOCK ---
      const panel = this.fileList
        ? this.fileList.closest(".display-panel")
        : null;
      const remainingFiles = this.fileList
        ? this.fileList.querySelectorAll("li.files, li.folders")
        : [];

      if (panel && remainingFiles.length === 0) {
        const nothing = panel.querySelector(".nothingfound");
        if (nothing) {
          nothing.style.setProperty("display", "block", "important");
        }
      }
      // ----------------------

      if (this.response?.[0]?.files) {
        const arr = this.response[0].files;
        const i = arr.findIndex(
          (x) => x.path === ctx.url || x.name === ctx.url.split("/").pop()
        );
        if (i > -1) arr.splice(i, 1);
      }
      this.updateSaveButtonState();

      // close modal + toast
      bootstrap.Modal.getInstance(this.confirmModal)?.hide();
      displayToast("bg-success", "Deleted", data.message || "File removed.");
    } catch (err) {
      this.confirmErrEl.textContent = err.message;
      this.confirmErrEl.style.display = "block";
    } finally {
      this.confirmBtnDel.disabled = false;
      this.confirmBtnDel.textContent = "Delete";
    }
  }

  showMetaDialog(li) {
    const url = li.querySelector('input[type="hidden"]').value;
    this._metaCtx = { li, url };
    // prefill from dataset (if you load meta with list; else derive sensible defaults)
    // For SEO inputs (title/alt) show a human-friendly value: prefer stored meta but
    // convert filename separators to spaces for readability in the input only.
    const filename = (url.split("/").pop() || "").replace(/\?.*$/, "");
    const baseNoExt = filename.replace(/\.[^.]+$/, "");

    // Title: prefer dataset.title (as-is) else use base filename
    this.metaTitleEl.value = li.dataset.title || baseNoExt;

    // Alt: prefer dataset.alt if present; otherwise derive from filename
    // When showing to the user, convert dashes/underscores to spaces for SEO-friendliness
    const rawAlt = li.dataset.alt || baseNoExt;
    this.metaAltEl.value = (rawAlt || "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    this.metaDescEl.value = li.dataset.description || "";
    this.metaErrorEl.style.display = "none";

    this.metaSaveBtn =
      this.metaSaveBtn ||
      this.metaForm?.querySelector('button[type="submit"], .save-btn');

    if (this.metaSaveBtn) {
      // overwrite any prior handler so we don't stack listeners
      this.metaSaveBtn.onclick = (e) => {
        e.preventDefault();
        this.submitMeta(); // triggers the loader + save flow
      };
    }

    // (Optional but nice) also catch Enter key submits once
    if (this.metaForm && !this._metaSubmitBound) {
      this._metaSubmitBound = true;
      this.metaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitMeta();
      });
    }

    bootstrap.Modal.getOrCreateInstance(this.metaModal).show();
  }

  // Amit has added this
  showImageViewDialog(li) {
    const url = li.querySelector('input[name="filename[]"]')?.value || "";
    // Pull metadata for Unsplash attribution if available
    const source = li.dataset.source || "";
    const author = li.dataset.author || "";

    if (!url) return;

    // Set image source and alt text
    this.imageViewImg.src = url;
    this.imageViewImg.alt = li.dataset.alt || this.inferAltFromName(url);

    // Update attribution text.
    // For Unsplash images keep the Unsplash attribution; for user uploads show the image name
    const filename = (url.split("/").pop() || "").replace(/\?.*$/, "");
    // Show the exact name (without extension) in the image view — preserve dashes/underscores/spaces
    const prettyName = (li.dataset.title || filename)
      .replace(/\.[^.]+$/, "")
      .trim();

    // If this is a Stock image (Unsplash), show the provider and the photographer
    const authorP = this.imageViewAuthor
      ? this.imageViewAuthor.parentElement
      : null;
    if (source && source.toLowerCase() === "unsplash") {
      // Powered by Unsplash → link to Unsplash
      if (this.imageViewPowered) {
        this.imageViewPowered.innerHTML = "";
        const a = document.createElement("a");
        a.href = "https://unsplash.com";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = "Powered by Unsplash";
        this.imageViewPowered.appendChild(a);
      }

      // Photo by → link to author page when available
      if (this.imageViewAuthor) {
        const authorLink = li.dataset.author_link || "";
        this.imageViewAuthor.innerHTML = "";
        if (authorLink) {
          const aa = document.createElement("a");
          aa.href = authorLink;
          aa.target = "_blank";
          aa.rel = "noopener noreferrer";
          aa.textContent = author || "Unsplash Contributor";
          this.imageViewAuthor.appendChild(aa);
        } else {
          this.imageViewAuthor.textContent = author || "Unsplash Contributor";
        }
      }
      if (authorP) authorP.style.display = "";
    } else {
      // Non-stock: show a friendly filename/title instead of the provider
      if (this.imageViewPowered)
        this.imageViewPowered.textContent = prettyName || "User Upload";
      if (author) {
        if (this.imageViewAuthor) {
          const authorLink = li.dataset.author_link || "";
          this.imageViewAuthor.innerHTML = "";
          if (authorLink) {
            const aa = document.createElement("a");
            aa.href = authorLink;
            aa.target = "_blank";
            aa.rel = "noopener noreferrer";
            aa.textContent = author;
            this.imageViewAuthor.appendChild(aa);
          } else {
            this.imageViewAuthor.textContent = author;
          }
        }
        if (authorP) authorP.style.display = "";
      } else {
        // hide the 'Photo by' line if there is no author for non-stock items
        if (authorP) authorP.style.display = "none";
      }
    }

    // Show the modal
    bootstrap.Modal.getOrCreateInstance(this.imageViewModal).show();
  }

  inferAltFromName(url) {
    // Derive a readable alt string from filename by removing extension and
    // replacing separators with spaces. This is only used as a fallback when
    // no explicit alt is stored in dataset/meta.
    return (url || "")
      .split("/")
      .pop()
      .replace(/\?.*$/, "")
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // submit
  async submitMeta() {
    if (this.metaSaveBtn && this.metaSaveBtn.disabled) return;
    const ctx = this._metaCtx;
    if (!ctx) return;

    // Normalize inputs: trim and collapse whitespace. Do not alter user punctuation
    const normalize = (s) => (s || "").toString().trim().replace(/\s+/g, " ");
    const payloadTitle = normalize(this.metaTitleEl.value);
    const payloadAlt = normalize(this.metaAltEl.value);
    const payloadDesc = normalize(this.metaDescEl.value);

    const form = new FormData();
    // prefer explicit url stored in ctx, fallback to li dataset/url
    const fileUrl =
      ctx.url ||
      ctx.li?.querySelector('input[name="filename[]"], input[type="hidden"]')
        ?.value ||
      "";
    form.append("file", fileUrl);
    form.append("title", payloadTitle);
    form.append("alt", payloadAlt);
    form.append("description", payloadDesc);

    function getCookie(name) {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? decodeURIComponent(match[2]) : null;
    }

    // show loader on Save button
    this.startMetaLoading("Saving…");
    if (this.metaErrorEl) {
      this.metaErrorEl.style.display = "none";
      this.metaErrorEl.textContent = "";
    }

    try {
      const res = await fetch("/user/media-meta", {
        method: "POST",
        credentials: "include",
        headers: {
          "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
          "X-Requested-With": "XMLHttpRequest",
        },
        body: form,
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Save failed");

      // reflect in UI (store on <li> for quick reuse)
      const { meta } = data;
      const title = (meta && meta.title) || payloadTitle || "";
      const alt = (meta && meta.alt) || payloadAlt || "";
      const description = (meta && meta.description) || payloadDesc || "";

      // update the source li
      const li = ctx.li;
      li.dataset.title = title;
      li.dataset.alt = alt;
      li.dataset.description = description;

      // Update visible name elements for this li (with truncation)
      const infoName = li.querySelector(".info .name");
      const previewName = li.querySelector(".preview .name");
      const FULL = title || infoName?.textContent || "";
      const MAX = 15;
      let short = FULL;
      if (FULL && FULL.length > MAX) {
        const parts = FULL.split(".");
        if (parts.length > 1) {
          const ext = parts.pop();
          const base = parts.join(".");
          const maxBaseLen = Math.max(5, MAX - (ext.length + 4));
          const shortBase =
            base.length > maxBaseLen ? base.slice(0, maxBaseLen) + "…" : base;
          short = shortBase + "." + ext;
        } else {
          short = FULL.slice(0, MAX - 1) + "…";
        }
      }
      if (infoName) {
        infoName.textContent = short || FULL;
        infoName.title = FULL || "";
      }
      if (previewName) {
        previewName.textContent = short || FULL;
        previewName.title = FULL || "";
      }

      // If rename modal is currently showing info for this li, update it too
      if (this._renameCtx && this._renameCtx.li === li) {
        const rawFilename = (fileUrl || "").split("/").pop() || "";
        const parts = rawFilename.split(".");
        const ext = parts.length > 1 ? parts.pop() : "";
        const base = parts.join(".") || rawFilename;
        // Show the human-friendly title (if present) in the Current name field
        this.renameCurrentEl.textContent = li.dataset.title || rawFilename;
        this.renameInputEl.value = base;
        this.renameExtEl.textContent = ext ? "." + ext : "";
      }

      // Update any other matching list items (AI / Stock / Uploads) that reference the same URL
      if (this.container) {
        const allLis = this.container.querySelectorAll("li.files");
        allLis.forEach((node) => {
          const h = node.querySelector(
            'input[name="filename[]"], input[type="hidden"]'
          );
          if (!h) return;
          if (h.value === fileUrl) {
            node.dataset.title = li.dataset.title;
            node.dataset.alt = li.dataset.alt;
            node.dataset.description = li.dataset.description;

            const inInfo = node.querySelector(".info .name");
            const inPreview = node.querySelector(".preview .name");
            const newFull =
              node.dataset.title || (inInfo && inInfo.textContent) || "";
            const displayShort =
              newFull && newFull.length > MAX
                ? newFull.slice(0, MAX - 1) + "…"
                : newFull;
            if (inInfo) {
              inInfo.textContent = displayShort;
              inInfo.title = newFull || "";
            }
            if (inPreview) {
              inPreview.textContent = displayShort;
              inPreview.title = newFull || "";
            }
          }
        });
      }

      // Update in-memory cache so subsequent renders/use the new meta
      try {
        if (
          this.response &&
          this.response[0] &&
          Array.isArray(this.response[0].files)
        ) {
          for (let f of this.response[0].files) {
            if (
              f.url === fileUrl ||
              (f.path && this.mediaPath + f.path === fileUrl) ||
              f.name === fileUrl.split("/").pop()
            ) {
              f.meta = f.meta || {};
              f.meta.title = li.dataset.title;
              f.meta.alt = li.dataset.alt;
              f.meta.description = li.dataset.description;
            }
          }
        }
      } catch (e) {
        console.warn("media: failed to update in-memory meta", e);
      }

      bootstrap.Modal.getInstance(this.metaModal)?.hide();
      displayToast("bg-success", "Saved", "Details updated.");
    } catch (err) {
      this.metaErrorEl.textContent = err.message;
      this.metaErrorEl.style.display = "block";
    } finally {
      // always restore the button
      this.stopMetaLoading();
    }
  }

  addFile(f, selected) {
    let _this = this;
    let isImage = false;
    let actions = "";

    // 🔹 1) Work with the raw filename
    const rawName = f.name || "";
    const safeFullName = _this.escapeHTML(rawName);

    // 🔹 2) Build a truncated display name (keep extension)
    const MAX_NAME_LEN = 15; // <--- change this as you like

    // Prefer meta.title for user-visible labels when present (SEO title)
    let displaySource = f.meta && f.meta.title ? f.meta.title : rawName;
    let displayName = displaySource;
    if (rawName.length > MAX_NAME_LEN) {
      const parts = displaySource.split(".");
      if (parts.length > 1) {
        const ext = parts.pop();
        const base = parts.join(".");

        const maxBaseLen = Math.max(5, MAX_NAME_LEN - (ext.length + 4));
        const shortBase =
          base.length > maxBaseLen ? base.slice(0, maxBaseLen) + "…" : base;

        displayName = shortBase + "." + ext;
      } else {
        // no extension
        displayName = displaySource.slice(0, MAX_NAME_LEN - 1) + "…";
      }
    }
    const safeDisplayName = _this.escapeHTML(displayName);

    // 🔹 3) fileType should be based on the REAL name, not truncated
    let fileSize = _this.bytesToSize(f.size),
      fileType = rawName.split(".").pop().toLowerCase(),
      icon = '<span class="icon file"></span>';

    // 🔹 hide size chip for stock/Unsplash items
    const hideSizeForStock = f.meta && f.meta.source === "unsplash";
    const displaySize = hideSizeForStock ? "" : fileSize;

    const isPdf = fileType === "pdf";
    const isVideo = f.mime
      ? f.mime.startsWith("video/")
      : ["mp4", "webm", "ogg", "mov", "m4v", "avi", "mkv"].includes(fileType);

    // Fix: Use absolute URL if f.path starts with http or //
    let fileUrl = f.path;
    if (!/^https?:\/\//.test(f.path) && !/^\/\//.test(f.path)) {
      fileUrl = _this.mediaPath + f.path;
    }

    if (["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(fileType)) {
      icon = '<img class="image" loading="lazy" src="' + fileUrl + '">';
      isImage = true;
    } else if (fileType === "pdf") {
      icon = '<span class="icon file f-pdf">PDF</span>';
    } else if (isVideo) {
      icon = '<span class="icon file f-video">VIDEO</span>';
    } else {
      icon =
        '<span class="icon file f-' + fileType + '">.' + fileType + "</span>";
    }

    let previewHtml = "";
    if (isImage) {
      previewHtml = '<img src="' + fileUrl + '">';
    } else if (isPdf) {
      previewHtml = '<div class="badge bg-secondary">PDF</div>';
    } else if (isVideo) {
      previewHtml = '<div class="badge bg-dark">VIDEO</div>';
    }

    actions +=
      '<a href="javascript:void(0);" class="btn btn-outline-primary btn-sm border-0 btn-rename"><i class="la la-edit"></i><span>Rename</span></a>';
    if (isImage) {
      actions +=
        '<a href="javascript:void(0);" class="btn btn-outline-secondary btn-sm border-0 btn-meta"><i class="la la-info-circle"></i><span>Details</span></a> ';
    }
    actions +=
      '<a href="javascript:void(0);" class="btn btn-outline-danger btn-sm border-0 btn-delete"><i class="la la-trash"></i><span>Delete</span></a>';

    let linkRowHtml = "";
    if (isPdf || isVideo) {
      const label = isPdf ? "Open PDF" : "Open video";
      const iconCls = isPdf ? "la-file-pdf" : "la-play-circle";
      linkRowHtml =
        '<a href="' +
        fileUrl +
        '" target="_blank" rel="noopener" class="btn btn-sm btn-sm border-0 asset-chip asset-open" title="' +
        label +
        '">' +
        '<i class="la ' +
        iconCls +
        '"></i>' +
        "<span>" +
        label +
        "</span>" +
        "</a>" +
        '<a type="button" class="btn btn-sm btn-sm border-0 asset-chip asset-copy btn-copy" data-url="' +
        fileUrl +
        '" title="Copy link">' +
        '<i class="la la-link"></i>' +
        "<span>Copy link</span>" +
        "</a>";
      actions += linkRowHtml;
    }

    const event = new CustomEvent("mediaModal:fileActions", {
      detail: {
        file: fileUrl,
        name: rawName, // 🔹 use full name in event
        fileType,
        fileSize,
        isImage,
        actions,
      },
    });
    window.dispatchEvent(event);

    let file = generateElements(
      '<li class="files">\
      <label class="form-check files-form-check">\
        <input type="hidden" value="' +
      fileUrl +
      '" name="filename[]">\
        <input type="' +
      (_this.type == "single" ? "radio" : "checkbox") +
      '" class="form-check-input" value="' +
      f.path +
      '" name="file[]"' +
      (selected == "single" ? "checked" : "") +
      '>\
        <span class="form-check-label"></span>\
        ' +
      icon +
      '\
      </label>\
      <div href="#" class="files liImageDetails">\
        <div class="info">\
          <div class="name" title="' +
      safeFullName +
      '">' +
      safeDisplayName +
      '</div>\
          <span class="details">' +
      displaySize +
      "</span>\
          <div class='tools-view-and-dots'>\
            <i class='fa-solid fa-eye view-photo-action' title='View'></i>\
            <div class='three-dots-action-triangle'></div>\
            <i class='fa-solid fa-ellipsis-vertical three-dots-action' title='More Options'></i>\
          </div>\
          <div class='toolactions'>" +
      actions +
      "</div>\
          <div class='preview'>\
            " +
      previewHtml +
      '\
            <div>\
              <span class="name" title="' +
      safeFullName +
      '">' +
      safeDisplayName +
      '</span><span class="details">' +
      displaySize +
      "</span>\
            </div>\
          </div>\
        </div>\
      </div>\
    </li>"
    )[0];

    // ✅ Prevent casual download: disable right click + drag on images (safe way)
    try {
      const imgs = file.querySelectorAll("img");
      imgs.forEach((img) => {
        img.draggable = false;

        // block right click only on images
        img.addEventListener("contextmenu", (e) => e.preventDefault());

        // block drag-start (some browsers allow drag-to-desktop save)
        img.addEventListener("dragstart", (e) => e.preventDefault());
      });
    } catch (e) {
      // ignore
    }

    // Hide "More Tools" for Unsplash / Stock images
    if (f.meta && f.meta.source === "unsplash") {
      const tools = file.querySelector(
        ".fa-ellipsis-vertical, .three-dots-action"
      );
      if (tools) tools.style.display = "none";
    }

    // Hide view icon for non-previewable types (PDF, video, Giphy/animated GIF)
    const viewIcon = file.querySelector(".view-photo-action");
    const isGiphy =
      (f.meta && String(f.meta.source).toLowerCase() === "giphy") ||
      fileType === "gif" ||
      (f.mime && f.mime === "image/gif");
    if (viewIcon && (isPdf || isVideo || isGiphy)) {
      viewIcon.style.display = "none";
    }

    if (f.meta) {
      file.dataset.title = f.meta.title || "";
      file.dataset.alt = f.meta.alt || "";
      file.dataset.description = f.meta.description || "";
      // expose source/author so other UI (image view) can detect stock images
      if (f.meta.source) file.dataset.source = f.meta.source;
      if (f.meta.author) file.dataset.author = f.meta.author;
      if (f.meta.author_link) file.dataset.author_link = f.meta.author_link;
    } else {
      file.dataset.title = "";
      file.dataset.alt = "";
      file.dataset.description = "";
      file.dataset.source = "";
      file.dataset.author = "";
      file.dataset.author_link = "";
    }

    _this.fileList.append(file);
    this.hideEmptyNotice();

    this.updateSaveButtonState();
    if (selected) {
      file.querySelector(
        "input[type ='radio'], input[type='checkbox']"
      ).checked = true;
      this.updateSaveButtonState();
    }

    return file;
  }

  render(data) {
    let scannedFolders = [],
      scannedFiles = [];

    if (Array.isArray(data)) {
      data.forEach(function (d) {
        if (d.type === "folder") {
          scannedFolders.push(d);
        } else if (d.type === "file") {
          scannedFiles.push(d);
        }
      });
    } else if (typeof data === "object") {
      scannedFolders = data.folders;
      scannedFiles = data.files;
    }

    // Empty the old result and make the new one

    this.fileList.replaceChildren();

    // Find the empty-state inside the same panel as the current list
    const panel = this.fileList
      ? this.fileList.closest(".display-panel")
      : null;
    const nothing = panel ? panel.querySelector(".nothingfound") : null;

    // if (nothing) {
    //   if (!scannedFolders.length && !scannedFiles.length) {
    //     // show empty state for THIS tab
    //     nothing.style.display = "";
    //   } else {
    //     // hide empty state for THIS tab
    //     nothing.style.display = "none";
    //   }
    // }

    if (nothing) {
      // If both folders and files are empty, show the notice
      if (scannedFolders.length === 0 && scannedFiles.length === 0) {
        nothing.style.setProperty("display", "block", "important");
      } else {
        nothing.style.display = "none";
      }
    }

    let _this = this;

    if (scannedFolders.length) {
      scannedFolders.forEach(function (f) {
        let itemsLength = f.items.length,
          name = _this.escapeHTML(f.name),
          icon = '<span class="icon folder"></span>';

        if (itemsLength) {
          icon = '<span class="icon folder full"></span>';
        }

        if (itemsLength == 1) {
          itemsLength += " item";
        } else if (itemsLength > 1) {
          itemsLength += " items";
        } else {
          itemsLength = "Empty";
        }

        let folder = generateElements(
          '<li class="folders"><a href="' +
          f.path +
          '" title="' +
          f.path +
          '" class="folders">' +
          icon +
          '<div class="info"><span class="name">' +
          name +
          '</span> <span class="details">' +
          itemsLength +
          "</span></div></a></li>"
        )[0];
        _this.fileList.append(folder);
      });
    }

    if (scannedFiles.length) {
      scannedFiles.forEach(function (f) {
        _this.addFile(f);
      });
    }

    // Generate the breadcrumbs

    let url = "";

    if (this.filemanager.classList.contains("searching")) {
      url = "<span>Search results: </span>";
      this.fileList.classList.remove("animated");
    } else {
      this.fileList.classList.add("animated");

      this.breadcrumbsUrls.forEach(function (u, i) {
        let name = u.split("/");

        if (i !== _this.breadcrumbsUrls.length - 1) {
          // Use a simple slash separator instead of the arrow character
          url +=
            '<a href="' +
            u +
            '"><span class="folderName">' +
            name[name.length - 1] +
            "</span></a>";
        } else {
          url +=
            '<span class="folderName">' + name[name.length - 1] + "</span>";
        }
      });
    }

    this.breadcrumbs.replaceChildren();
    // this.breadcrumbs.appendChild(generateElements('<a href="/"><i class="la la-home"></i><span class="folderName">&ensp;home</span></a>')[0]);
    this.breadcrumbs.appendChild(
      generateElements("<span>" + url + "</span>")[0]
    );

    // Show the generated elements

    this.fileList.animate({ display: "inline-block" });
    this.updateSaveButtonState();
  }

  // This function escapes special html characters in names

  escapeHTML(text) {
    return text
      .replace(/\&/g, "&amp;")
      .replace(/\</g, "&lt;")
      .replace(/\>/g, "&gt;");
  }

  // Convert file sizes from bytes to human readable units

  bytesToSize(bytes) {
    let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Bytes";
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

  // Sort files for My Uploads tab
  // Sort files for My Uploads tab
  sortFiles(sortBy) {
    if (!this.response || !this.response[0] || !this.response[0].files) return;
    const files = this.response[0].files;

    // ✅ Fallback to current select value if no argument passed
    if (!sortBy) {
      const select = this.container?.querySelector("#sort");
      sortBy = select ? select.value : "newest";
    }

    // Prefer server-provided timestamps when available (e.g. meta.created_at)
    const timeFor = (f) => {
      if (!f) return 0;
      const t =
        (f.meta &&
          (f.meta.created_at ||
            f.meta.createdAt ||
            f.meta.uploaded_at ||
            f.meta.time)) ||
        f.created_at ||
        f.mtime ||
        f.time;
      if (!t) return 0;
      if (typeof t === "number") return t;
      const parsed = Date.parse(t);
      return isNaN(parsed) ? 0 : parsed;
    };

    files.sort((a, b) => {
      const ta = timeFor(a);
      const tb = timeFor(b);
      const ia = typeof a._idx === "number" ? a._idx : 0;
      const ib = typeof b._idx === "number" ? b._idx : 0;

      if (sortBy === "newest") {
        // 1️⃣ If we have timestamps, use them (newest first)
        if (ta || tb) {
          if (ta && tb) return tb - ta;
          if (ta && !tb) return -1;
          if (!ta && tb) return 1;
        }
        // 2️⃣ Otherwise, fallback to original order (as sent by backend)
        return ia - ib;
      }

      if (sortBy === "oldest") {
        // 1️⃣ If we have timestamps, use them (oldest first)
        if (ta || tb) {
          if (ta && tb) return ta - tb;
          if (ta && !tb) return -1;
          if (!ta && tb) return 1;
        }
        // 2️⃣ Otherwise, reverse the original order
        return ib - ia;
      }

      if (sortBy === "a-z" || sortBy === "z-a") {
        // Alphabetical sort by filename (case-insensitive)
        const na = (a.name || "").toString().toLowerCase();
        const nb = (b.name || "").toString().toLowerCase();
        if (na < nb) return sortBy === "a-z" ? -1 : 1;
        if (na > nb) return sortBy === "a-z" ? 1 : -1;
        return 0;
      }

      return 0;
    });
  }
}

// --- Bootstrap multi-modal stacking fix (place AFTER class MediaModal) ---
document.addEventListener("show.bs.modal", (e) => {
  const openModals = document.querySelectorAll(".modal.show").length;
  const z = 1050 + 10 * openModals; // 1050 backdrop, 1055 modal base
  e.target.style.zIndex = z + 5;

  // Put the newly created backdrop just below the modal
  setTimeout(() => {
    const backdrop = document.querySelector(
      ".modal-backdrop:not(.modal-stack)"
    );
    if (backdrop) {
      backdrop.style.zIndex = z;
      backdrop.classList.add("modal-stack");
    }
  }, 0);
  // Immediately reset scroll positions (disable smooth scrolling briefly)
  if (e.target && e.target.id === "MediaModal") {
    try {
      const modal = e.target;
      // Add a modal-local loading overlay while the modal is opening (opaque and covers only the modal)
      try {
        const modalContent = modal.querySelector(".modal-content") || modal;
        // ensure modal content is a positioned container for absolute overlay
        const computed = window.getComputedStyle(modalContent);
        if (computed.position === "static") {
          modalContent.style.position = "relative";
        }

        if (!modal.querySelector(".media-loading-overlay")) {
          const loader = document.createElement("div");
          loader.className = "loading-overlay media-loading-overlay";
          // scope overlay to modal: absolute inside .modal-content
          loader.style.position = "absolute";
          loader.style.top = "0";
          loader.style.left = "0";
          loader.style.width = "100%";
          loader.style.height = "100%";
          loader.style.background = "rgba(255,255,255,0.98)";
          loader.style.zIndex = "9999";
          loader.style.pointerEvents = "auto";
          loader.innerHTML = '<div class="loader-colorful"></div>';
          modalContent.appendChild(loader);
        }
      } catch (err) {
        // fallback: if anything goes wrong, leave body-level behaviour (backwards compat)
        if (!document.querySelector(".media-loading-overlay")) {
          const loader = document.createElement("div");
          loader.className = "loading-overlay media-loading-overlay";
          loader.style.background = "rgba(255,255,255,0.98)";
          loader.style.zIndex = "20000";
          loader.style.pointerEvents = "auto";
          loader.innerHTML = '<div class="loader-colorful"></div>';
          document.body.appendChild(loader);
        }
      }
      const sels = [
        ".side",
        ".left-div-mygallery",
        ".filemanager",
        ".modal-body",
      ];
      sels.forEach((sel) => {
        const el = modal.querySelector(sel);
        if (!el) return;
        const prev = el.style.scrollBehavior;
        el.style.scrollBehavior = "auto";
        el.scrollTop = 0;
        setTimeout(() => {
          el.style.scrollBehavior = prev || "";
        }, 0);
      });

      // Also reset any scrollable children quickly to avoid smooth animation
      const all = modal.querySelectorAll("*");
      for (let i = 0; i < all.length; i++) {
        const c = all[i];
        const comp = window.getComputedStyle(c);
        if (
          (comp.overflowY === "auto" || comp.overflowY === "scroll") &&
          c.scrollTop
        ) {
          const p = c.style.scrollBehavior;
          c.style.scrollBehavior = "auto";
          c.scrollTop = 0;
          setTimeout(() => {
            c.style.scrollBehavior = p || "";
          }, 0);
        }
      }
    } catch (err) {
      // ignore
    }
  }
});

// If the gallery modal closes, force-close the rename modal too
document.addEventListener("hide.bs.modal", (e) => {
  if (e.target.id === "MediaModal") {
    const renameEl = document.getElementById("MediaRenameModal");
    if (renameEl) {
      const inst = bootstrap.Modal.getInstance(renameEl);
      inst?.hide();
    }
  }
});

// Use 'shown' and 'hidden' so we reset scroll after open/close animations finish
document.addEventListener("shown.bs.modal", (e) => {
  if (e.target && e.target.id === "MediaModal") {
    try {
      const modal = e.target;
      // reset obvious containers
      [".side", ".left-div-mygallery", ".filemanager", ".modal-body"].forEach(
        (sel) => {
          const el = modal.querySelector(sel);
          if (el) el.scrollTop = 0;
        }
      );

      // also reset any scrollable child (overflow:auto/scroll)
      const all = modal.querySelectorAll("*");
      for (let i = 0; i < all.length; i++) {
        const c = all[i];
        const style = window.getComputedStyle(c);
        if (
          (style.overflowY === "auto" || style.overflowY === "scroll") &&
          c.scrollTop
        ) {
          c.scrollTop = 0;
        }
      }
    } catch (err) {
      // ignore
    }

    // Initialize Bootstrap tooltips for consistent styling across all tabs
    try {
      const modal = e.target;
      // Find all elements with title attributes
      const tooltipElements = modal.querySelectorAll('[title]:not([title=""])');

      // Initialize Bootstrap tooltip for each element
      tooltipElements.forEach((el) => {
        // Dispose existing tooltip if any
        const existingTooltip = bootstrap.Tooltip.getInstance(el);
        if (existingTooltip) {
          existingTooltip.dispose();
        }

        // Initialize new tooltip with consistent styling
        new bootstrap.Tooltip(el, {
          placement: "bottom",
          trigger: "hover",
          boundary: "window",
          customClass: "media-tooltip",
          delay: { show: 200, hide: 0 },
        });
      });
    } catch (err) {
      console.warn("Tooltip initialization error:", err);
    }
    // remove the modal-local loading overlay once the modal is fully shown
    try {
      const modal = e.target;
      const loader =
        modal.querySelector?.(".media-loading-overlay") ||
        document.querySelector(".media-loading-overlay");
      if (loader) loader.remove();
    } catch (err) {
      /* ignore */
    }
    // Hide the shared upload overlay when the media modal closes
    try {
      const ov = document.getElementById("media-upload-overlay");
      if (ov) ov.style.display = "none";
    } catch (err) { }
  }
});

document.addEventListener("hidden.bs.modal", (e) => {
  if (e.target && e.target.id === "MediaModal") {
    try {
      const modal = e.target;

      // Dispose all Bootstrap tooltips to prevent memory leaks
      try {
        const tooltipElements = modal.querySelectorAll(
          '[title]:not([title=""])'
        );
        tooltipElements.forEach((el) => {
          const tooltip = bootstrap.Tooltip.getInstance(el);
          if (tooltip) {
            tooltip.dispose();
          }
        });
        // Amit has added this to remove the safari issue of the image fading after opening the media modal
        document.querySelectorAll("img").forEach((img) => {
          img.style.transform = "translateZ(0)";
          img.offsetHeight;
          img.style.transform = "";
        });
      } catch (err) {
        console.warn("Tooltip disposal error:", err);
      }

      // Reset scroll positions for various panels
      [".side", ".left-div-mygallery", ".filemanager", ".modal-body"].forEach(
        (sel) => {
          const el = modal.querySelector(sel);
          if (el) el.scrollTop = 0;
        }
      );

      // Clear visible search inputs so reopening doesn't preserve typed values
      [
        "#media-search-input",
        "#upload-search-input",
        "#ai-search-input",
        "#stock-search-input",
      ].forEach((sel) => {
        try {
          const input = modal.querySelector(sel);
          if (input) {
            input.value = "";
            // Trigger any listeners (input/change) that update UI state
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
          }
        } catch (err) { }
      });

      // Reset sort select to default
      try {
        const sort = modal.querySelector("#sort");
        if (sort) {
          sort.value = "newest";
          sort.dispatchEvent(new Event("change", { bubbles: true }));
        }
      } catch (err) { }

      // Ensure the left nav returns to 'uploads' and panels are shown/hidden
      try {
        const navItems = modal.querySelectorAll(".media-modal-nav-item");
        navItems.forEach((btn) => btn.classList.remove("active"));
        const uploadsBtn = modal.querySelector(
          '.media-modal-nav-item[data-tab="uploads"]'
        );
        if (uploadsBtn) uploadsBtn.classList.add("active");

        const panels = modal.querySelectorAll(".display-panel");
        panels.forEach((panel) => {
          panel.style.display = panel.dataset.tab === "uploads" ? "" : "none";
        });
      } catch (err) { }

      // Clear breadcrumbs and any transient overlays
      try {
        const breadcrumbs = modal.querySelector(".breadcrumbs");
        if (breadcrumbs) breadcrumbs.innerHTML = "";
      } catch (err) { }

      try {
        const ov = document.getElementById("media-upload-overlay");
        if (ov) ov.style.display = "none";
      } catch (err) { }

      // Remove modal-local overlay if present
      try {
        const loader =
          modal.querySelector?.(".media-loading-overlay") ||
          document.querySelector(".media-loading-overlay");
        if (loader) loader.remove();
      } catch (err) { }

      // Clear DOM lists and reset scroll positions for lists
      try {
        const lists = modal.querySelectorAll(
          "#media-files, #ai-media-files, #stock-media-files"
        );
        lists.forEach((l) => {
          if (l) {
            l.innerHTML = "";
            l.scrollTop = 0;
          }
        });
      } catch (err) { }

      // Reset selection state (uncheck any selected files)
      try {
        modal
          .querySelectorAll('input[name="file[]"]')
          .forEach((i) => (i.checked = false));
      } catch (err) { }

      // Disable Save button until a selection is made again
      try {
        const saveBtn = modal.querySelector(".save-btn");
        if (saveBtn) {
          saveBtn.disabled = true;
          saveBtn.classList.add("disabled");
        }
      } catch (err) { }

      // Reset internal MediaModal state so reopening performs a fresh reload
      try {
        const mm =
          window && window.Vvveb && window.Vvveb.MediaModal
            ? window.Vvveb.MediaModal
            : null;
        if (mm) {
          mm.isInit = false;
          mm.response = [];
          mm.uploadsLoaded = false;
          mm.aiLoaded = false;
          mm.stockLoaded = false;
          mm.uploadsAccumulatedFiles = [];
          mm.stockAccumulatedFiles = [];
          mm.uploadsPage = 0;
          mm.stockPage = 1;
        }
      } catch (err) { }
    } catch (err) {
      // ignore
    }
  }
});

// Optional: cleanup when all modals are closed (removes extra backdrops/classes)
document.addEventListener("hidden.bs.modal", () => {
  if (!document.querySelector(".modal.show")) {
    document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
    document.body.classList.remove("modal-open");
    document.body.style.removeProperty("padding-right");
  }
});

// Amit has added this to make the options active of the mygallery in the left panel
document.addEventListener("click", (e) => {
  const item = e.target.closest(".media-modal-nav-item");
  if (!item) return;

  const tab = item.dataset.tab; // "ai" | "stock" | "uploads"

  // Toggle active class on left nav
  const navItems = document.querySelectorAll(".media-modal-nav-item");
  navItems.forEach((btn) => btn.classList.remove("active"));
  item.classList.add("active");

  // Find the modal container
  const modal = document.getElementById("MediaModal");
  if (!modal) return;

  // Show/hide display panels
  const uploadFileButton = document.querySelector(
    ".upload-file-btn-mediagallery"
  );
  const panels = modal.querySelectorAll(".display-panel");
  panels.forEach((panel) => {
    const panelTab = panel.getAttribute("data-tab");
    console.log("paneltab: ", panelTab, "  tab: ", tab);

    if (panelTab === tab) {
      panel.style.display = ""; // show
      if (panelTab === "uploads") {
        uploadFileButton.style.display = "";
      } else {
        uploadFileButton.style.setProperty("display", "none", "important");
      }
    } else {
      panel.style.display = "none"; // hide
    }
  });

  // Show upload controls only on "My Uploads"
  const uploadControls = modal.querySelector("#uploadControls");
  if (uploadControls) {
    uploadControls.style.display = tab === "uploads" ? "" : "none";
  }

  // Also hide any top-right/global upload buttons when not on Uploads tab
  try {
    const globalUploadBtns = modal.querySelectorAll(
      "[data-bs-target='.upload-collapse']"
    );
    globalUploadBtns.forEach((b) => {
      b.style.display = tab === "uploads" ? "" : "none";
    });
  } catch (e) {
    // ignore if DOM differs
  }

  // Hide top-bar for AI & Stock tabs
  const topBar = modal.querySelector(".top-bar");
  if (topBar) {
    // Keep the top-bar container visible for all tabs, but hide
    // the Sort/Filter control when not on the Uploads tab.
    topBar.style.display = "";
    const sortBy = topBar.querySelector(".sort-by");
    if (sortBy) {
      // Use visibility to hide the control but preserve layout width
      // so the close button and other aligned items don't shift.
      sortBy.style.visibility = tab === "uploads" ? "" : "hidden";
    }
  }

  // Hide the small magnifier SVG inside the top-bar search when not on Uploads
  try {
    const topbarSearchIcon = modal.querySelector(".topbarSearch svg");
    if (topbarSearchIcon)
      topbarSearchIcon.style.display = tab === "uploads" ? "" : "none";
  } catch (e) {
    // ignore
  }

  // Just for debugging, if needed
  // console.log("Switched to tab:", tab);

  // When switching to AI tab, fetch AI gallery (first time only)
  if (
    tab === "ai" &&
    window.Vvveb &&
    Vvveb.MediaModal &&
    typeof Vvveb.MediaModal.loadAiGallery === "function"
  ) {
    Vvveb.MediaModal.loadAiGallery();
  }
});

// Amit has added this to toggle the three dots of the actions
document.addEventListener("click", (e) => {
  const dots = e.target.closest(".three-dots-action");

  // Click on three dots → toggle only that card’s toolactions
  if (dots) {
    const parent = dots.closest(".files"); // wrapper div
    const toolActions = parent.querySelector(".toolactions");
    const toolactionsTriangle = parent.querySelector(
      ".three-dots-action-triangle"
    );

    // Close all other toolactions
    document.querySelectorAll(".toolactions").forEach((t) => {
      if (t !== toolActions) {
        t.style.display = "none";
      }
    });
    document.querySelectorAll(".three-dots-action-triangle").forEach((t) => {
      if (t !== toolactionsTriangle) {
        t.style.display = "none";
      }
    });

    // Toggle this one
    toolActions.style.display =
      toolActions.style.display === "flex" ? "none" : "flex";
    toolactionsTriangle.style.display =
      toolactionsTriangle.style.display === "block" ? "none" : "block";

    return;
  }

  // Click outside → close all toolactions
  if (!e.target.closest(".toolactions")) {
    document
      .querySelectorAll(".toolactions")
      .forEach((t) => (t.style.display = "none"));
    document
      .querySelectorAll(".three-dots-action-triangle")
      .forEach((t) => (t.style.display = "none"));
  }
});

// document.addEventListener("click", () => {
//   const uploadCloseBtn = document.getElementById("upload-close");
//   const topPanel = document.querySelector(".top-panel");

//   uploadCloseBtn.addEventListener("click", () => {
//     topPanel.style.display = "none";
//   });
// });
// helper: debounce
function debounce(fn, wait = 300) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}
// NOTE: Uploads search uses the local, debounced client-side filter
// (same approach as the AI tab) and intentionally does NOT modify
// the browser URL or history. Any prior helpers that updated
// `media_search` have been removed to avoid side-effects.

// Amit has added this to make the options active of the mygallery in the left panel
document.addEventListener("click", (e) => {
  const item = e.target.closest(".media-modal-nav-item");
  if (!item) return;

  const tab = item.dataset.tab; // "ai" | "stock" | "uploads"

  const sidebar = document.getElementById("media-modal-sidebar");
  if (sidebar) sidebar.classList.remove("active-sidebar");

  // Toggle active class on left nav
  const navItems = document.querySelectorAll(".media-modal-nav-item");
  navItems.forEach((btn) => btn.classList.remove("active"));
  item.classList.add("active");

  // Find the modal container
  const modal = document.getElementById("MediaModal");
  if (!modal) return;

  // Show/hide display panels
  const uploadFileButton = document.querySelector(
    ".upload-file-btn-mediagallery"
  );
  const panels = modal.querySelectorAll(".display-panel");
  panels.forEach((panel) => {
    const panelTab = panel.getAttribute("data-tab");
    console.log("paneltab: ", panelTab, "  tab: ", tab);

    if (panelTab === tab) {
      panel.style.display = ""; // show
      if (panelTab === "uploads") {
        // This is the logic you wanted: show the button if on 'uploads' tab
        uploadFileButton.style.display = "";
      } else {
        // This is the logic you wanted: hide the button if not on 'uploads' tab
        uploadFileButton.style.setProperty("display", "none", "important");
      }
    } else {
      panel.style.display = "none"; // hide
    }
  });
});
