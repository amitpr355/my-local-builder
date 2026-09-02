/* ═══════════════════════════════════════════════════════════════════
   Zigrow Multi Pager — Phase 2B: Navbar Page Management
   Self-contained — renders into .zp-navbar-pages / #zp-dropdown-list
   Reuses existing global helpers: showDynamicModal, Vvveb, etc.
   Extracted from editor.html for maintainability.

   Dependencies (must be loaded before this file):
     - Vvveb (builder.js)
     - window.__zigrowPages (populated by Phase 2A in editor.html)
     - window.__zigrowTemplateName / window.__zigrowTemplateFolder
     - showDynamicModal (optional, for toast notifications)
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // ── Feature flags — temporarily disabled until public nav reflects these actions ──
  var ENABLE_SET_HOME    = false;
  var ENABLE_DRAG_REORDER = false;

  // ── Constants ─────────────────────────────────────────────────
  var MAX_PAGES = 10;

  // ── Free-user guard (reuses isFreeUser from editor.html) ────
  function _isFreeUser() {
    return window.isFreeUser === true;
  }
  function _showPricingIfFree() {
    if (_isFreeUser()) {
      if (typeof window.openZigrowPricingModal === 'function') {
        window.openZigrowPricingModal();
      }
      return true;
    }
    return false;
  }

  // ── Page count helper ───────────────────────────────────────
  function _pageCount() {
    return Object.keys(window.__zigrowPages || {}).length;
  }

  // ── Floating tooltip for restricted/disabled actions ────────
  var _floatingTip = null;
  function _showFloatingTip(refEl, text) {
    if (!_floatingTip) {
      _floatingTip = document.createElement('div');
      _floatingTip.className = 'zp-floating-tooltip';
      document.body.appendChild(_floatingTip);
    }
    _floatingTip.textContent = text;
    _floatingTip.style.display = 'block';
    var r = refEl.getBoundingClientRect();
    _floatingTip.style.left = (r.left + r.width / 2) + 'px';
    _floatingTip.style.top = (r.top - 6) + 'px';
  }
  function _hideFloatingTip() {
    if (_floatingTip) _floatingTip.style.display = 'none';
  }

  // ── Shared helpers ──────────────────────────────────────────
  function _getCookie(name) {
    var m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  }

  function _tName() {
    if (window.__zigrowTemplateName) return window.__zigrowTemplateName;
    var params = new URLSearchParams(window.location.search);
    var raw = params.get('t');
    var p = '';
    if (raw) { try { p = atob(raw); } catch(e) { p = ''; } }
    if (!p) p = params.get('template') || '';
    if (p.includes('/')) {
      var parts = p.split('/');
      return parts[parts.length - 2] || parts[parts.length - 1];
    }
    return p;
  }

  function _tFolder() {
    if (window.__zigrowTemplateFolder) return window.__zigrowTemplateFolder;
    var params = new URLSearchParams(window.location.search);
    var raw = params.get('t');
    var p = '';
    if (raw) { try { p = atob(raw); } catch(e) { p = ''; } }
    if (!p) p = params.get('template') || '';
    return p.replace(/\/index\.html$/i, '');
  }

  function _mode() {
    return new URLSearchParams(window.location.search).get('mode') || 'new';
  }

  // ── Page-name validation (URL-safe: letters, numbers, spaces, hyphens, underscores) ──
  function _validatePageName(name) {
    if (!name || !name.trim()) return 'Page name cannot be empty.';
    name = name.trim();
    if (name.length > 50) return 'Page name must be 50 characters or fewer.';
    if (!/^[a-z0-9]/.test(name)) return 'Page name must start with a lowercase letter or number.';
    if (/[^a-z0-9_-]/.test(name)) return 'Only lowercase letters, numbers, hyphens and underscores are allowed.';
    return null;
  }

  // ── Check for duplicate page name (case-insensitive, trimmed) ──
  function _isDuplicatePageName(name, excludePageKey) {
    var normalized = name.trim().toLowerCase();
    var pages = window.__zigrowPages || {};
    for (var k in pages) {
      if (excludePageKey && pages[k]._pageKey === excludePageKey) continue;
      if ((pages[k]._pageName || '').trim().toLowerCase() === normalized) return true;
    }
    return false;
  }

  // ── Centralized preview cleanup: hide all editor-only helpers in iframe ──
  // Selector covers all known builder-injected helpers and controls
  var _editorHelperSelector = [
    '.vvv-enhanced-btn',
    '#global-fab',
    '#global-help',
    '.vvveb-add-link-helper',
    '.vvveb-add-slide-helper',
    '.add-card-btn',
    '[data-vvveb-helpers="true"]'
  ].join(', ');

  function _applyPreviewCleanup(iframeDoc) {
    if (!iframeDoc) return;
    // Signal to builder.js MutationObserver: do NOT re-inject helpers
    try { iframeDoc.documentElement.setAttribute('data-vvveb-helpers-allowed', 'false'); } catch (e) {}
    // Remove editor-only navbar/helper nodes entirely in preview so they cannot
    // participate in later navbar DOM processing.
    iframeDoc.querySelectorAll([
      'li.vvveb-add-link-helper',
      '[data-vvveb-add-link-helper]',
      'button.vvveb-add-link-btn[data-vvveb-context="icons"][data-vvveb-helpers="true"]',
      '.vvveb-add-slide-helper',
      '.add-card-btn[data-vvveb-helpers="true"]'
    ].join(', ')).forEach(function (el) {
      try { el.remove(); } catch (e) {}
    });
    // Remove contenteditable
    iframeDoc.querySelectorAll('[contenteditable]').forEach(function (el) {
      el.removeAttribute('contenteditable');
    });
    // Hide editor-only helper elements
    iframeDoc.querySelectorAll(_editorHelperSelector).forEach(function (el) {
      el.style.setProperty('display', 'none', 'important');
    });
  }

  function _restoreEditorHelpers(iframeDoc) {
    if (!iframeDoc) return;
    if (typeof Vvveb !== 'undefined' && Vvveb.Builder && Vvveb.Builder.isPreview) return;
    // Re-allow helper injection by MutationObserver
    try { iframeDoc.documentElement.setAttribute('data-vvveb-helpers-allowed', 'true'); } catch (e) {}
    // Restore visibility of editor helpers hidden during preview
    iframeDoc.querySelectorAll(_editorHelperSelector).forEach(function (el) {
      el.style.removeProperty('display');
    });
    // Re-inject helpers if they were removed during preview iframe reload
    try {
      if (typeof addNavbarAddLinkHelpers === 'function') addNavbarAddLinkHelpers(iframeDoc);
      if (typeof addButtonHelpers === 'function') addButtonHelpers(iframeDoc);
      if (typeof addClonableCardHelpers === 'function') addClonableCardHelpers(iframeDoc);
    } catch (e) { /* helpers may not exist yet */ }
  }

  // Expose globally so builder.js preview toggle and editor.html can use these
  window._zpApplyPreviewCleanup = _applyPreviewCleanup;
  window._zpRestoreEditorHelpers = _restoreEditorHelpers;

  // ── Derive a URL-safe slug from a page name ────────────────
  function _deriveSlug(name) {
    return '/' + name.trim().toLowerCase().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');
  }

  // ── Check if the builder has unsaved changes ────────────────
  function _isDirty() {
    if (typeof Vvveb === 'undefined') return false;
    if (Vvveb.Builder && Vvveb.Builder.dirty) return true;
    if (Vvveb.Undo && Vvveb.Undo.undoIndex >= 0) return true;
    return false;
  }

  // ── First-save guard check ──────────────────────────────────
  function _requireFirstSave() {
    if (_mode() !== 'edit' && !window.hasSaved) {
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: 'Please save your template first before managing pages.', type: 'info', autoCloseDelay: 3000 });
      }
      return true;
    }
    return false;
  }

  // ── Builder Modal: input prompt ─────────────────────────────
  function _showBuilderInput(opts) {
    var title = opts.title || 'Enter value';
    var label = opts.label || '';
    var defaultValue = opts.defaultValue || '';
    var placeholder = opts.placeholder || '';
    var onConfirm = opts.onConfirm;
    var validate = opts.validate || function() { return null; };

    var overlay = document.createElement('div');
    overlay.className = 'zp-modal-overlay';

    var box = document.createElement('div');
    box.className = 'zp-modal-box';
    box.innerHTML =
      '<h4>' + _esc(title) + '</h4>' +
      (label ? '<p class="zp-modal-msg">' + _esc(label) + '</p>' : '') +
      '<input type="text" class="zp-modal-input" placeholder="' + _esc(placeholder) + '" maxlength="50">' +
      '<div class="zp-modal-error"></div>' +
      '<div class="zp-modal-footer">' +
        '<button class="zp-modal-btn zp-btn-cancel">Cancel</button>' +
        '<button class="zp-modal-btn zp-btn-primary">OK</button>' +
      '</div>';

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    var input = box.querySelector('.zp-modal-input');
    var errorEl = box.querySelector('.zp-modal-error');
    var cancelBtn = box.querySelector('.zp-btn-cancel');
    var okBtn = box.querySelector('.zp-btn-primary');

    input.value = defaultValue;
    setTimeout(function() { input.focus(); input.select(); }, 50);

    function close() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }

    function submit() {
      var val = input.value.trim();
      var err = validate(val);
      if (err) {
        errorEl.textContent = err;
        input.classList.add('zp-input-error');
        input.focus();
        return;
      }
      close();
      if (onConfirm) onConfirm(val);
    }

    cancelBtn.addEventListener('click', close);
    okBtn.addEventListener('click', submit);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); submit(); }
      if (e.key === 'Escape') { e.preventDefault(); close(); }
    });
    input.addEventListener('input', function() {
      // Auto-convert spaces to hyphens and uppercase to lowercase
      var cur = input.selectionStart;
      var old = input.value;
      var converted = old.replace(/ /g, '-').toLowerCase();
      if (converted !== old) {
        input.value = converted;
        input.setSelectionRange(cur, cur);
      }
      errorEl.textContent = '';
      input.classList.remove('zp-input-error');
    });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
  }

  // ── Builder Modal: confirm dialog ───────────────────────────
  function _showBuilderConfirm(opts) {
    var title = opts.title || 'Confirm';
    var message = opts.message || 'Are you sure?';
    var confirmText = opts.confirmText || 'Confirm';
    var isDanger = opts.danger || false;
    var onConfirm = opts.onConfirm;

    var overlay = document.createElement('div');
    overlay.className = 'zp-modal-overlay';

    var box = document.createElement('div');
    box.className = 'zp-modal-box';
    box.innerHTML =
      '<h4>' + _esc(title) + '</h4>' +
      '<p class="zp-modal-msg">' + _esc(message) + '</p>' +
      '<div class="zp-modal-footer">' +
        '<button class="zp-modal-btn zp-btn-cancel">Cancel</button>' +
        '<button class="zp-modal-btn ' + (isDanger ? 'zp-btn-danger' : 'zp-btn-primary') + '">' + _esc(confirmText) + '</button>' +
      '</div>';

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    var cancelBtn = box.querySelector('.zp-btn-cancel');
    var confirmBtn = box.querySelector('.zp-btn-primary, .zp-btn-danger');

    function close() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }

    cancelBtn.addEventListener('click', close);
    confirmBtn.addEventListener('click', function() { close(); if (onConfirm) onConfirm(); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { e.preventDefault(); close(); document.removeEventListener('keydown', handler); }
    });
  }

  // ── API caller ──────────────────────────────────────────────
  async function apiPost(endpoint, body) {
    var res = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': _getCookie('XSRF-TOKEN'),
      },
      body: JSON.stringify(body),
    });
    var data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  }

  // ── DOM refs (updated for navbar-integrated layout) ──────────
  function _selector()  { return document.getElementById('zp-selector'); }
  function _selLabel()  { return document.getElementById('zp-selector-label'); }
  function _dropdown()  { return document.getElementById('zp-dropdown'); }
  function _ddList()    { return document.getElementById('zp-dropdown-list'); }
  function _addBtn()    { return document.getElementById('zp-add-btn'); }

  // ── Sync data store (FileManager.pages + __zigrowPages) ─────
  function _syncDataStore(pageList, folder) {
    if (typeof Vvveb !== 'undefined' && Vvveb.FileManager) Vvveb.FileManager.pages = {};
    window.__zigrowPages = {};

    pageList.forEach(function (p) {
      var fname = p.filename || (p.is_home ? 'index.html' : (p.page_key + '.html'));
      var pageData = {
        name: fname,
        filename: fname,
        file: folder + '/' + fname,
        url: folder + '/' + fname,
        title: p.page_name,
        folder: null,
        _pageKey: p.page_key,
        _pageName: p.page_name,
        _pageSlug: p.page_slug,
        _isHome: p.is_home,
        _sortOrder: p.sort_order,
      };
      window.__zigrowPages[fname] = pageData;
      if (typeof Vvveb !== 'undefined' && Vvveb.FileManager) Vvveb.FileManager.pages[fname] = pageData;
    });
  }

  // ── Escape HTML ──────────────────────────────────────────────
  function _esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ── Lookup helpers ──────────────────────────────────────────
  function _fnameByKey(pageKey) {
    for (var k in window.__zigrowPages) {
      if (window.__zigrowPages[k]._pageKey === pageKey) return k;
    }
    return null;
  }
  function _pdByKey(pageKey) {
    var fname = _fnameByKey(pageKey);
    return fname ? window.__zigrowPages[fname] : null;
  }

  // ── Update selector label to show current page ──────────────
  function _updateSelectorLabel(activeFname) {
    var label = _selLabel();
    if (!label) return;
    var pd = window.__zigrowPages && window.__zigrowPages[activeFname];
    if (pd) {
      label.innerHTML = _esc(pd._pageName) + (pd._isHome ? ' <span class="zigrow-home-badge"><i class="la la-home"></i> Home</span>' : '');
    } else {
      label.textContent = 'Pages';
    }
  }

  // ── Close dropdown ──────────────────────────────────────────
  function _closeDropdown() {
    var dd = _dropdown(); var sel = _selector();
    if (dd) dd.classList.remove('zp-open');
    if (sel) sel.classList.remove('zp-open');
  }

  // ── Render the dropdown list ─────────────────────────────────
  function _renderDropdown(activeFname) {
    var list = _ddList();
    if (!list) return;
    list.innerHTML = '';

    var pages = window.__zigrowPages || {};
    var keys = Object.keys(pages);
    if (!keys.length) {
      list.innerHTML = '<div class="zp-notice">No pages yet. Click "+ Add New Page" to create one.</div>';
      return;
    }

    keys.sort(function (a, b) {
      return (pages[a]._sortOrder || 0) - (pages[b]._sortOrder || 0);
    });

    keys.forEach(function (fname) {
      var p = pages[fname];
      var row = document.createElement('div');
      row.className = 'zp-item' + (fname === activeFname ? ' zp-active' : '');
      row.setAttribute('data-fname', fname);
      row.setAttribute('data-page-key', p._pageKey);
      if (ENABLE_DRAG_REORDER) row.setAttribute('draggable', 'true');

      var html = '';
      if (ENABLE_DRAG_REORDER) html += '<span class="zp-grip" title="Drag to reorder"><i class="la la-grip-vertical"></i></span>';
      html += '<span class="zp-name">' + _esc(p._pageName);
      if (p._isHome) html += ' <span class="zigrow-home-badge"><i class="la la-home"></i> Home</span>';
      html += '</span>';
      var isFree = _isFreeUser();
      var restricted = isFree ? ' zp-restricted' : '';
      // Free users: data-zp-tooltip only (JS floating tooltip), no title
      // Paid users: normal title only, no data-zp-tooltip
      html += '<span class="zp-actions">';
      if (ENABLE_SET_HOME && !p._isHome) {
        html += '<button class="zp-act zp-set-home' + restricted + '"';
        html += isFree ? ' data-zp-tooltip="Upgrade to unlock"' : ' title="Set as Home"';
        html += '><i class="la la-home"></i></button>';
      }
      html += '<button class="zp-act zp-clone' + restricted + '"';
      html += isFree ? ' data-zp-tooltip="Upgrade to unlock"' : ' title="Clone page"';
      html += '><i class="la la-copy"></i></button>';
      html += '<button class="zp-act zp-rename' + restricted + '"';
      html += isFree ? ' data-zp-tooltip="Upgrade to unlock"' : ' title="Rename"';
      html += '><i class="la la-pen"></i></button>';
      if (!p._isHome) {
        html += '<button class="zp-act zp-delete' + restricted + '"';
        html += isFree ? ' data-zp-tooltip="Upgrade to unlock"' : ' title="Delete"';
        html += '><i class="la la-trash"></i></button>';
      }
      html += '</span>';

      row.innerHTML = html;
      list.appendChild(row);
    });

    _updateSelectorLabel(activeFname);
    _bindDropdownEvents();

    // Update Add New Page button state for 10-page limit (paid users only)
    var addBtn = _addBtn();
    if (addBtn && !_isFreeUser()) {
      if (keys.length >= MAX_PAGES) {
        addBtn.classList.add('zp-disabled');
        addBtn.setAttribute('data-zp-tooltip', 'You can create up to 10 pages only.');
      } else {
        addBtn.classList.remove('zp-disabled');
        addBtn.removeAttribute('data-zp-tooltip');
      }
    }
  }

  // ── Bind events on dropdown rows ────────────────────────────
  function _bindDropdownEvents() {
    var list = _ddList();
    if (!list) return;

    // Floating tooltip delegation for restricted/disabled actions
    list.addEventListener('mouseover', function (e) {
      var act = e.target.closest('[data-zp-tooltip]');
      if (act) _showFloatingTip(act, act.getAttribute('data-zp-tooltip'));
    });
    list.addEventListener('mouseout', function (e) {
      var act = e.target.closest('[data-zp-tooltip]');
      if (act) _hideFloatingTip();
    });

    // Click row to switch page (with unsaved-changes guard)
    list.querySelectorAll('.zp-item').forEach(function (row) {
      row.addEventListener('click', function (e) {
        if (e.target.closest('.zp-actions')) return;
        var pk = row.getAttribute('data-page-key');
        if (!pk) return;

        // If current page has unsaved changes, confirm before switching
        if (_isDirty()) {
          _closeDropdown();
          _showBuilderConfirm({
            title: 'Unsaved Changes',
            message: 'You have unsaved changes on this page. Discard changes and switch?',
            confirmText: 'Discard & Switch',
            danger: true,
            onConfirm: function() { zigrowSwitchPage(pk); }
          });
          return;
        }

        zigrowSwitchPage(pk);
        _closeDropdown();
      });
    });

    // Set Home (gated by feature flag)
    if (ENABLE_SET_HOME) {
      list.querySelectorAll('.zp-set-home').forEach(function (btn) {
        btn.onclick = function (e) {
          e.preventDefault(); e.stopPropagation();
          _closeDropdown();
          if (_showPricingIfFree()) return;
          var row = btn.closest('.zp-item');
          var pk = row && row.getAttribute('data-page-key');
          var pd = _pdByKey(pk);
          if (!pd) return;
          _showBuilderConfirm({
            title: 'Set as Home Page',
            message: 'Set "' + pd._pageName + '" as the Home page? The current Home page will be demoted.',
            confirmText: 'Set as Home',
            onConfirm: function() { zigrowSetHomePage(pk); }
          });
        };
      });
    }

    // Clone
    list.querySelectorAll('.zp-clone').forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault(); e.stopPropagation();
        _closeDropdown();
        if (_showPricingIfFree()) return;
        var row = btn.closest('.zp-item');
        var pk = row && row.getAttribute('data-page-key');
        var pd = _pdByKey(pk);
        if (!pd) return;
        if (_requireFirstSave()) return;
        _showBuilderInput({
          title: 'Clone Page',
          label: 'Enter a name for the cloned page:',
          defaultValue: pd._pageName + ' (Copy)',
          placeholder: 'e.g. About Us',
          validate: function(val) {
            var err = _validatePageName(val);
            if (err) return err;
            if (_isDuplicatePageName(val)) return 'A page with this name already exists.';
            return null;
          },
          onConfirm: function(val) { zigrowCreatePage(val, pk, _deriveSlug(val)); }
        });
      };
    });

    // Rename
    list.querySelectorAll('.zp-rename').forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault(); e.stopPropagation();
        _closeDropdown();
        if (_showPricingIfFree()) return;
        var row = btn.closest('.zp-item');
        var pk = row && row.getAttribute('data-page-key');
        var pd = _pdByKey(pk);
        if (!pd) return;
        if (_requireFirstSave()) return;
        // Capture current name for comparison; re-lookup on confirm to avoid stale data
        var currentName = pd._pageName;
        _showBuilderInput({
          title: 'Rename Page',
          label: 'Enter a new name for "' + currentName + '":',
          defaultValue: currentName,
          placeholder: 'e.g. Contact Us',
          validate: function(val) {
            if (val === currentName) return 'Name is unchanged.';
            var err = _validatePageName(val);
            if (err) return err;
            if (_isDuplicatePageName(val, pk)) return 'A page with this name already exists.';
            return null;
          },
          onConfirm: function(val) {
            // Re-lookup page data to ensure page_key is still valid
            var freshPd = _pdByKey(pk);
            if (!freshPd) {
              if (typeof showDynamicModal === 'function') {
                showDynamicModal({ message: 'Page not found. Please refresh and try again.', type: 'error', autoCloseDelay: 3000 });
              }
              return;
            }
            zigrowRenamePage(pk, val, _deriveSlug(val));
          }
        });
      };
    });

    // Delete
    list.querySelectorAll('.zp-delete').forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault(); e.stopPropagation();
        _closeDropdown();
        if (_showPricingIfFree()) return;
        var row = btn.closest('.zp-item');
        var pk = row && row.getAttribute('data-page-key');
        var pd = _pdByKey(pk);
        if (!pd) return;
        _showBuilderConfirm({
          title: 'Delete Page',
          message: 'Delete "' + pd._pageName + '"? This cannot be undone.',
          confirmText: 'Delete',
          danger: true,
          onConfirm: function() { zigrowDeletePage(pk); }
        });
      };
    });

    // Drag-and-drop reorder (gated by feature flag)
    if (ENABLE_DRAG_REORDER) {
      var dragSrc = null;
      list.querySelectorAll('.zp-item[draggable="true"]').forEach(function (row) {
        row.addEventListener('dragstart', function (e) {
          dragSrc = row;
          row.style.opacity = '0.4';
          e.dataTransfer.effectAllowed = 'move';
          e.dataTransfer.setData('text/plain', row.getAttribute('data-page-key'));
        });
        row.addEventListener('dragend', function () {
          row.style.opacity = '';
          dragSrc = null;
          list.querySelectorAll('.zp-item').forEach(function (el) { el.classList.remove('zp-drag-over'); });
        });
        row.addEventListener('dragover', function (e) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          row.classList.add('zp-drag-over');
        });
        row.addEventListener('dragleave', function () {
          row.classList.remove('zp-drag-over');
        });
        row.addEventListener('drop', function (e) {
          e.preventDefault();
          row.classList.remove('zp-drag-over');
          if (_isFreeUser()) return;
          if (!dragSrc || dragSrc === row) return;
          var items = Array.from(list.querySelectorAll('.zp-item'));
          var fromIdx = items.indexOf(dragSrc);
          var toIdx = items.indexOf(row);
          if (fromIdx < 0 || toIdx < 0) return;
          if (fromIdx < toIdx) {
            row.parentNode.insertBefore(dragSrc, row.nextSibling);
          } else {
            row.parentNode.insertBefore(dragSrc, row);
          }
          var newOrder = [];
          list.querySelectorAll('.zp-item').forEach(function (item) {
            newOrder.push(item.getAttribute('data-page-key'));
          });
          zigrowReorderPages(newOrder);
        });
      });
    }
  }

  // ── Page-switch loader helpers ────────────────────────────────
  function _showPageLoader() {
    if (document.getElementById('zp-page-loader')) return; // already showing
    var el = document.createElement('div');
    el.id = 'zp-page-loader';
    el.className = 'zp-page-loader';
    el.innerHTML = '<div class="zp-loader-spinner"></div>';
    document.body.appendChild(el);
  }
  function _hidePageLoader() {
    var el = document.getElementById('zp-page-loader');
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
  // Expose globally so the Phase 2A loadPage handler in editor.html can hide it
  window._zpHidePageLoader = _hidePageLoader;

  // ── Switch active page (UI only — updates dropdown + label) ─
  function zigrowSwitchPage(pageKey) {
    var fname = _fnameByKey(pageKey);
    // Guard: if the page key isn't in the current data store, abort rather
    // than silently falling back to index.html (home).  A wrong fallback
    // can cause the next save to overwrite the home page with foreign content.
    if (!fname) {
      console.warn('[zigrow-multipager] switchPage: page key "' + pageKey + '" not found in page store — aborting switch.');
      return;
    }
    var pd = window.__zigrowPages && window.__zigrowPages[fname];
    if (!pd) return;

    // Show lightweight loader during page switch
    _showPageLoader();

    // Suppress beforeunload popup during internal page switch
    window.__zpInternalAction = true;

    if (typeof Vvveb !== 'undefined' && Vvveb.FileManager) Vvveb.FileManager.currentPage = fname;

    // Update dropdown active state
    var list = _ddList();
    if (list) {
      list.querySelectorAll('.zp-item').forEach(function (r) { r.classList.remove('zp-active'); });
      var el = list.querySelector('[data-page-key="' + pageKey + '"]');
      if (el) el.classList.add('zp-active');
    }

    // Update selector label
    _updateSelectorLabel(fname);

    // Dispatch event so Phase 2A handler loads the HTML into iframe
    window.dispatchEvent(
      new CustomEvent('vvveb.FileManager.loadPage', { detail: pd })
    );
  }
  window.zigrowSwitchPage = zigrowSwitchPage;

  // ── Refresh pages from backend & rebuild dropdown ───────────
  // Guard: prevent concurrent / repeated refresh calls
  var _refreshing = false;
  async function zigrowRefreshPages(activatePageKey) {
    if (_refreshing) return;
    _refreshing = true;

    var tName = _tName();
    var folder = _tFolder();
    if (!tName) { _refreshing = false; return; }

    var pageList;
    try {
      var res = await fetch(
        '/template/pages?template_name=' + encodeURIComponent(tName),
        { credentials: 'include' }
      );
      if (!res.ok) { _refreshing = false; return; }
      pageList = await res.json();
    } catch (e) { _refreshing = false; return; }

    if (!pageList || !pageList.length) { _refreshing = false; return; }

    _syncDataStore(pageList, folder);

    var targetKey = activatePageKey;
    if (!targetKey) {
      var home = pageList.find(function (p) { return p.is_home; });
      targetKey = home ? home.page_key : pageList[0].page_key;
    }
    var targetFname = _fnameByKey(targetKey) || 'index.html';

    _renderDropdown(targetFname);

    // Only switch page if explicitly requested (not on init boot)
    if (activatePageKey) {
      zigrowSwitchPage(activatePageKey);
    }

    _refreshing = false;
  }
  window.zigrowRefreshPages = zigrowRefreshPages;

  // ── Create page ─────────────────────────────────────────────
  async function zigrowCreatePage(pageName, cloneFromKey, slug) {
    // Guard: block page creation if template hasn't been saved yet
    if (_requireFirstSave()) return;
    var tName = _tName();
    if (!tName || !pageName) return;
    // Frontend page-count limit (backend also enforces)
    if (_pageCount() >= MAX_PAGES) {
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: 'You can create up to 10 pages only.', type: 'info', autoCloseDelay: 3000 });
      }
      return;
    }
    try {
      var body = { template_name: tName, page_name: pageName };
      if (cloneFromKey) body.clone_from_key = cloneFromKey;
      if (slug) body.page_slug = slug;
      var result = await apiPost('/template/page/create', body);
      await zigrowRefreshPages(result.page_key);
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: 'Page "' + pageName + '" created.', type: 'success', autoCloseDelay: 2000 });
      }
    } catch (err) {
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: '\u274c ' + err.message, type: 'error', autoCloseDelay: 3000 });
      }
    }
  }
  window.zigrowCreatePage = zigrowCreatePage;

  // ── Rename page ─────────────────────────────────────────────
  async function zigrowRenamePage(pageKey, newName, newSlug) {
    var tName = _tName();
    if (!tName || !pageKey || !newName) return;
    try {
      var body = { template_name: tName, page_key: pageKey, page_name: newName };
      if (newSlug !== undefined) body.page_slug = newSlug;
      await apiPost('/template/page/rename', body);
      await zigrowRefreshPages(pageKey);
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: 'Page renamed.', type: 'success', autoCloseDelay: 2000 });
      }
    } catch (err) {
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: '\u274c ' + err.message, type: 'error', autoCloseDelay: 3000 });
      }
    }
  }
  window.zigrowRenamePage = zigrowRenamePage;

  // ── Delete page ─────────────────────────────────────────────
  async function zigrowDeletePage(pageKey) {
    var tName = _tName();
    if (!tName || !pageKey) return;
    // Suppress beforeunload during internal delete operation
    window.__zpInternalAction = true;
    try {
      await apiPost('/template/page/delete', { template_name: tName, page_key: pageKey });
      var currentFname = (typeof Vvveb !== 'undefined' && Vvveb.FileManager && Vvveb.FileManager.currentPage) || '';
      var currentData = window.__zigrowPages && window.__zigrowPages[currentFname];
      var wasActive = currentData && currentData._pageKey === pageKey;
      // Clear dirty state before page switch to avoid stale beforeunload
      if (Vvveb.Builder) {
        if (typeof Vvveb.Builder.setDirty === 'function') Vvveb.Builder.setDirty(false);
        else Vvveb.Builder.dirty = false;
      }
      if (Vvveb.Undo) Vvveb.Undo.reset();

      if (wasActive) {
        // Compute fallback: 1) Home  2) Previous in list  3) First remaining
        var pages = window.__zigrowPages || {};
        var sortedKeys = Object.keys(pages).sort(function (a, b) {
          return (pages[a]._sortOrder || 0) - (pages[b]._sortOrder || 0);
        });
        var fallbackKey = null;
        var deletedIdx = -1;
        // Try home page first
        for (var i = 0; i < sortedKeys.length; i++) {
          if (pages[sortedKeys[i]]._pageKey === pageKey) { deletedIdx = i; continue; }
          if (pages[sortedKeys[i]]._isHome) { fallbackKey = pages[sortedKeys[i]]._pageKey; break; }
        }
        // Try previous page in sort order
        if (!fallbackKey && deletedIdx > 0) {
          var prevKey = sortedKeys[deletedIdx - 1];
          if (pages[prevKey] && pages[prevKey]._pageKey !== pageKey) {
            fallbackKey = pages[prevKey]._pageKey;
          }
        }
        // Fall back to first remaining page
        if (!fallbackKey) {
          for (var i = 0; i < sortedKeys.length; i++) {
            if (pages[sortedKeys[i]]._pageKey !== pageKey) {
              fallbackKey = pages[sortedKeys[i]]._pageKey;
              break;
            }
          }
        }
        await zigrowRefreshPages(fallbackKey);
      } else {
        await zigrowRefreshPages(currentData ? currentData._pageKey : null);
      }

      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: 'Page deleted.', type: 'success', autoCloseDelay: 2000 });
      }
    } catch (err) {
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: '\u274c ' + err.message, type: 'error', autoCloseDelay: 3000 });
      }
    } finally {
      window.__zpInternalAction = false;
    }
  }
  window.zigrowDeletePage = zigrowDeletePage;

  // ── Reorder pages ───────────────────────────────────────────
  async function zigrowReorderPages(orderedKeys) {
    var tName = _tName();
    if (!tName || !orderedKeys || !orderedKeys.length) return;
    try {
      await apiPost('/template/page/reorder', { template_name: tName, order: orderedKeys });
      var currentFname = (typeof Vvveb !== 'undefined' && Vvveb.FileManager && Vvveb.FileManager.currentPage) || '';
      var currentData = window.__zigrowPages && window.__zigrowPages[currentFname];
      await zigrowRefreshPages(currentData ? currentData._pageKey : null);
    } catch (err) {
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: '\u274c ' + err.message, type: 'error', autoCloseDelay: 3000 });
      }
    }
  }
  window.zigrowReorderPages = zigrowReorderPages;

  // ── Set Home page ───────────────────────────────────────────
  async function zigrowSetHomePage(pageKey) {
    var tName = _tName();
    if (!tName || !pageKey) return;
    try {
      await apiPost('/template/page/set-home', { template_name: tName, page_key: pageKey });
      await zigrowRefreshPages(pageKey);
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: 'Home page updated.', type: 'success', autoCloseDelay: 2000 });
      }
    } catch (err) {
      if (typeof showDynamicModal === 'function') {
        showDynamicModal({ message: '\u274c ' + err.message, type: 'error', autoCloseDelay: 3000 });
      }
    }
  }
  window.zigrowSetHomePage = zigrowSetHomePage;

  // ── Selector toggle + Add Page button ───────────────────────
  function _wireNavbarControls() {
    // Toggle dropdown
    var sel = _selector();
    if (sel && !sel.__wired) {
      sel.__wired = true;
      sel.addEventListener('click', function (e) {
        e.stopPropagation();
        var dd = _dropdown();
        if (!dd) return;
        var isOpen = dd.classList.contains('zp-open');
        if (isOpen) {
          _closeDropdown();
        } else {
          dd.classList.add('zp-open');
          sel.classList.add('zp-open');
        }
      });
    }

    // Close on outside click (guarded against duplicate listeners)
    if (!window.__zpOutsideClickWired) {
      window.__zpOutsideClickWired = true;

      document.addEventListener('click', function (e) {
        var dd = _dropdown();
        if (!dd || !dd.classList.contains('zp-open')) return;
        var sel2 = _selector();
        if (dd.contains(e.target)) return;
        if (sel2 && (e.target === sel2 || sel2.contains(e.target))) return;
        _closeDropdown();
      });

      // Close on Escape key
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') _closeDropdown();
      });

      // Close when clicking inside the builder iframe (canvas)
      // The iframe swallows clicks, so listen on its document via focusin/mousedown
      document.addEventListener('mousedown', function (e) {
        var dd = _dropdown();
        if (!dd || !dd.classList.contains('zp-open')) return;
        var iframe = document.getElementById('iframe1') || document.querySelector('iframe');
        if (iframe && (e.target === iframe || iframe.contains(e.target))) {
          _closeDropdown();
        }
      });

      // Also close dropdown when iframe gains focus (catches clicks that don't bubble)
      window.addEventListener('blur', function () {
        // When window blurs and iframe gains focus, close dropdown
        setTimeout(function () {
          if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
            _closeDropdown();
          }
        }, 50);
      });
    }

    // Add Page button
    var addBtn = _addBtn();
    if (addBtn && !addBtn.__wired) {
      addBtn.__wired = true;
      if (_isFreeUser()) {
        addBtn.classList.add('zp-restricted');
        addBtn.setAttribute('data-zp-tooltip', 'Upgrade to unlock');
      }
      // Floating tooltip for add button (covers both restricted + disabled states)
      addBtn.addEventListener('mouseenter', function () {
        var tip = addBtn.getAttribute('data-zp-tooltip');
        if (tip) _showFloatingTip(addBtn, tip);
      });
      addBtn.addEventListener('mouseleave', function () { _hideFloatingTip(); });
      addBtn.addEventListener('click', function (e) {
        e.preventDefault();
        _closeDropdown();
        if (_showPricingIfFree()) return;
        if (_requireFirstSave()) return;
        // Page-count limit (frontend guard — backend also enforces)
        if (_pageCount() >= MAX_PAGES) {
          if (typeof showDynamicModal === 'function') {
            showDynamicModal({ message: 'You can create up to 10 pages only.', type: 'info', autoCloseDelay: 3000 });
          }
          return;
        }
        _showBuilderInput({
          title: 'Add New Page',
          label: 'Enter a name for the new page:',
          placeholder: 'e.g. About Us',
          validate: function(val) {
            var err = _validatePageName(val);
            if (err) return err;
            if (_isDuplicatePageName(val)) return 'A page with this name already exists.';
            return null;
          },
          onConfirm: function(val) { zigrowCreatePage(val, null, _deriveSlug(val)); }
        });
      });
    }
  }

  // ── Preview mode: intercept cross-page nav links inside iframe ──
  // When the builder is in preview mode and the user clicks a nav link
  // that targets another page (e.g. "about.html" or slug "/about"),
  // we intercept it and use zigrowSwitchPage instead of letting the
  // iframe navigate to a broken builder URL.
  //
  // Uses a single persistent listener on window for iframe.loaded,
  // and guards against duplicate click handlers via a WeakSet.
  var _previewClickDocs = typeof WeakSet !== 'undefined' ? new WeakSet() : null;

  // ── Centralized page-key resolver ──────────────────────────
  // Priority: data-page-key → href match → null
  // Returns the matched page key string, or null if not a page link.
  function _resolvePageKey(link) {
    var pages = window.__zigrowPages || {};
    // 1. Prefer explicit data-page-key attribute
    var pk = link.getAttribute('data-page-key');
    if (pk) {
      var found = Object.values(pages).some(function(p) { return p._pageKey === pk; });
      return found ? pk : null; // null = page was deleted
    }
    // 2. Fallback: match href against known filenames / slugs
    var href = link.getAttribute('href');
    if (!href) return null;
    var cleanHref = href.replace(/^\.\//,'').replace(/\?.*$/,'').replace(/#.*$/,'');
    for (var fname in pages) {
      var p = pages[fname];
      if (cleanHref === fname || cleanHref === './' + fname) return p._pageKey;
      if (p._pageSlug) {
        var slug = p._pageSlug.replace(/^\//, '');
        var hs   = cleanHref.replace(/^\//, '');
        if (slug && hs === slug) return p._pageKey;
      }
      if (p._isHome && (cleanHref === '/' || cleanHref === '' || cleanHref === 'index.html')) return p._pageKey;
    }
    return null;
  }

  function _currentPreviewPageKey() {
    var currentFname = (typeof Vvveb !== 'undefined' && Vvveb.FileManager && Vvveb.FileManager.currentPage) || 'index.html';
    var currentData = window.__zigrowPages && window.__zigrowPages[currentFname];
    return currentData ? currentData._pageKey : null;
  }

  function _scrollPreviewToHash(href) {
    var hashIndex = href.indexOf('#');
    if (hashIndex === -1) return false;

    var rawHash = href.slice(hashIndex + 1);
    if (!rawHash) return false;

    var doc = window.FrameDocument;
    if (!doc) return false;

    var targetId = rawHash;
    try { targetId = decodeURIComponent(rawHash); } catch (e) {}

    var target = doc.getElementById(targetId) || doc.querySelector('[name="' + targetId.replace(/"/g, '\\"') + '"]');
    if (!target || typeof target.scrollIntoView !== 'function') return false;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }

  function _previewClickHandler(e) {
    // Only intercept in preview mode
    if (typeof Vvveb === 'undefined' || !Vvveb.Builder || !Vvveb.Builder.isPreview) return;

    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href) return;

    // Skip anchors on same page (#section) and external/absolute URLs
    if (href.startsWith('#') || href.startsWith('javascript:')) return;
    if (/^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    // Resolve against registered pages via centralized resolver
    var matchedKey = _resolvePageKey(link);
    var currentKey = _currentPreviewPageKey();

    // Same-page links like "index.html#about" should scroll in-place.
    // Reloading the current page here restores stale persisted HTML.
    if (matchedKey && currentKey && matchedKey === currentKey) {
      e.preventDefault();
      e.stopPropagation();
      _scrollPreviewToHash(href);
      return;
    }

    // Link has data-page-key but page was deleted → safe ignore
    if (!matchedKey && link.hasAttribute('data-page-key')) {
      e.preventDefault();
      e.stopPropagation();
      console.warn('[zigrow-preview] Ignored click on link to deleted page (key: ' + link.getAttribute('data-page-key') + ')');
      return;
    }

    // href looks like a relative path but didn't match any page → safe ignore (prevents 404)
    if (!matchedKey) {
      // Could be an unregistered relative path — block to prevent iframe 404
      e.preventDefault();
      e.stopPropagation();
      console.warn('[zigrow-preview] Ignored unresolved relative link:', href);
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    // Prevent double-clicks during page switch
    if (window.__zpSwitching) return;
    window.__zpSwitching = true;

    // Safety timeout: reset flag if page load takes too long or fails
    var _switchTimer = setTimeout(function() { window.__zpSwitching = false; }, 8000);

    // Stay in preview mode — switch page content without exiting preview
    zigrowSwitchPage(matchedKey);

    // After page loads, re-apply preview cleanup to new iframe content
    window.addEventListener('vvveb.iframe.loaded', function _reapplyPreview() {
      window.removeEventListener('vvveb.iframe.loaded', _reapplyPreview);
      clearTimeout(_switchTimer);
      window.__zpSwitching = false;
      if (!Vvveb.Builder || !Vvveb.Builder.isPreview) return;
      var iframe = document.getElementById('iframe1');
      if (!iframe) return;
      var doc = iframe.contentDocument || iframe.contentWindow.document;
      // Defer cleanup: let _frameLoaded + init complete before hiding helpers
      setTimeout(function() { _applyPreviewCleanup(doc); }, 50);
    });
  }

  function _setupPreviewLinkInterception() {
    window.addEventListener('vvveb.iframe.loaded', function () {
      var iframeDoc = window.FrameDocument;
      if (!iframeDoc) return;

      // Guard against duplicate click handlers on the same document
      if (_previewClickDocs && _previewClickDocs.has(iframeDoc)) return;
      if (_previewClickDocs) _previewClickDocs.add(iframeDoc);

      iframeDoc.addEventListener('click', _previewClickHandler, true);

      // If we're already in preview mode (page switch during preview), defer cleanup
      // so it runs after all _frameLoaded initialization (helper injection, etc.)
      if (typeof Vvveb !== 'undefined' && Vvveb.Builder && Vvveb.Builder.isPreview) {
        setTimeout(function() { _applyPreviewCleanup(iframeDoc); }, 50);
      }
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  function zigrowPhase2BInit() {
    _wireNavbarControls();
    _setupPreviewLinkInterception();

    // Render dropdown from existing __zigrowPages data (populated by Phase 2A)
    // Do NOT call zigrowRefreshPages here — that causes reload loops
    var currentFname = (typeof Vvveb !== 'undefined' && Vvveb.FileManager && Vvveb.FileManager.currentPage) || 'index.html';
    if (window.__zigrowPages && Object.keys(window.__zigrowPages).length) {
      _renderDropdown(currentFname);
    } else {
      // No page data yet — show placeholder in selector
      var label = _selLabel();
      if (label) label.textContent = 'Home';
    }
  }

  // Boot: wait for Vvveb + POPULATED page data, then render dropdown once
  function _boot() {
    var attempts = 0;
    var iv = setInterval(function () {
      attempts++;
      if (attempts > 150) { clearInterval(iv); return; }
      if (typeof Vvveb !== 'undefined' && window.__zigrowPages && Object.keys(window.__zigrowPages).length > 0) {
        clearInterval(iv);
        setTimeout(function () {
          if (!window.__zigrowPhase2BInited) {
            window.__zigrowPhase2BInited = true;
            zigrowPhase2BInit();
          }
        }, 200);
      }
    }, 200);
  }

  // Also listen for Phase 2A's 'zigrow.pages.ready' event (fired after page data is populated)
  window.addEventListener('zigrow.pages.ready', function () {
    if (!window.__zigrowPhase2BInited) {
      window.__zigrowPhase2BInited = true;
      zigrowPhase2BInit();
    }
  });

  if (document.readyState === 'complete') {
    _boot();
  } else {
    window.addEventListener('load', _boot);
  }

  // Re-init after first save (mode transitions from new → edit)
  var _saveWatcher = setInterval(function () {
    if (window.hasSaved === true && !window.__zigrowPhase2BInited) {
      window.__zigrowPhase2BInited = true;
      clearInterval(_saveWatcher);
      setTimeout(zigrowPhase2BInit, 500);
    }
  }, 500);

  /* ═══════════════════════════════════════════════════════════════
     Shared Header & Footer Across All Pages — IMPLEMENTED
     ─────────────────────────────────────────────────────────────
     After every page save, editor.html extracts the <header>/<nav>
     and <footer> from the saved HTML via DOMParser and fires a
     fire-and-forget POST to /template/page/sync-header-footer.
     The backend (TemplateController::syncHeaderFooter) replaces
     those regions in all sibling TemplatePage rows using regex.
     ═══════════════════════════════════════════════════════════════ */

  /* ═══════════════════════════════════════════════════════════════
     TODO: Global Colors & Fonts Across All Pages
     ─────────────────────────────────────────────────────────────
     Current issue: Global colors/fonts set via the Global Style Panel
     (Vvveb.GlobalCustomVariable) only apply to the currently loaded
     page's iframe document. When switching pages, the new page loads
     its own saved HTML which may not contain the updated CSS variables.

     Why this is deferred:
     - The global style system (ColorPaletteManager, GlobalCustomVariable)
       injects CSS variables into FrameDocument's <head> at runtime.
     - These injected styles are captured when the page HTML is saved
       (they become part of that page's stored HTML).
     - However, other pages that were not open during the style change
       retain their original CSS variable values.
     - Fixing this properly requires one of:
       (a) Storing global styles as a separate template-level record
           (not per-page) and injecting them into every page on load.
       (b) On save of global styles, iterating all TemplatePage rows
           and updating their <head> CSS variables — which risks
           corrupting page-specific style overrides.
       (c) A runtime merge layer that applies template-level global
           styles on top of per-page HTML during load.
     - All three options touch the global-style persistence model,
       the save/load pipeline, and the page-switch handler — areas
       that are currently stable for single-page and current-page
       context.
     - Forcing a cross-page sync without careful design could break
       templates that intentionally use different color schemes per
       page or have page-specific font overrides.

     Recommended approach for future implementation:
     - Store global styles (color palette + font pair) as a JSON
       column on the Template model (not per TemplatePage).
     - On page load/switch, inject those global CSS variables into
       the iframe <head> after the page HTML is set via srcdoc.
     - On global style change + save, persist to the Template record
       and re-inject into the current iframe.
     - This cleanly separates "template-level global styles" from
       "per-page HTML content" without cross-page HTML mutation.
     ═══════════════════════════════════════════════════════════════ */

})();
