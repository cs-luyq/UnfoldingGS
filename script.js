/* Local, dependency-free interactions. No network requests or analytics. */
(() => {
  'use strict';

  const sceneNames = ['Synopsis', 'Intermediate', 'Intermediate', 'Full detail'];
  const scenes = {
    truck: { name: 'Truck', description: 'Tanks & Temples', sizes: [6.5, 17.2, 31.3, 50.7], unit: 'MB', width: 979, height: 546 },
    bonsai: { name: 'Bonsai', description: 'Indoor scene', sizes: [12.5, 23.8, 39.6, 62.2], unit: 'M', width: 1600, height: 1066 }
  };
  const structure = document.querySelector('#structure-image');
  const rendering = document.querySelector('#render-image');
  const sceneImages = document.querySelector('.scene-images');
  const sceneOverlay = document.querySelector('#scene-load-overlay');
  const sceneLoadLabel = document.querySelector('#scene-load-label');
  const sceneLoadHelp = document.querySelector('#scene-load-help');
  const sceneFeedback = document.querySelector('#scene-feedback');
  const sceneAnnouncement = document.querySelector('#scene-announcement');
  const sceneRetry = document.querySelector('#scene-retry');
  const lodButtons = [...document.querySelectorAll('[data-lod]')];
  const sceneButtons = [...document.querySelectorAll('[data-scene]')];
  const imageCache = new Map();
  let selectedScene = 'truck';
  let selectedLod = 3;
  let sceneRequest = 0;

  function setSceneState(state, message) {
    sceneImages.dataset.state = state;
    sceneImages.setAttribute('aria-busy', String(state === 'loading'));
    sceneFeedback.dataset.state = state;
    sceneAnnouncement.textContent = message;
    sceneLoadLabel.textContent = message;
    sceneOverlay.hidden = state === 'ready';
    sceneLoadHelp.hidden = state !== 'error';
    sceneRetry.hidden = state !== 'error';
    for (const button of [...sceneButtons, ...lodButtons]) {
      button.classList.toggle('is-pending', state === 'loading' && button.getAttribute('aria-pressed') === 'true');
    }
  }

  // Cache successful decoded images and share in-flight requests. Failed entries
  // are removed so Retry can make a fresh request.
  function loadSceneImage(source, priority) {
    const cached = imageCache.get(source);
    if (cached) {
      if (priority === 'high') cached.image.fetchPriority = 'high';
      return cached.promise;
    }
    const image = new Image();
    image.fetchPriority = priority;
    image.decoding = 'async';
    const promise = new Promise((resolve, reject) => {
      image.onload = async () => {
        try {
          if (typeof image.decode === 'function') await image.decode();
          resolve(image);
        } catch (error) {
          reject(error);
        }
      };
      image.onerror = () => reject(new Error('Scene image could not be loaded'));
    });
    const entry = { image, promise };
    imageCache.set(source, entry);
    promise.catch(() => {
      if (imageCache.get(source) === entry) imageCache.delete(source);
    });
    image.src = source;
    return promise;
  }

  async function renderScene() {
    const request = ++sceneRequest;
    const key = selectedScene;
    const scene = scenes[key];
    const level = selectedLod;
    const target = `${scene.name} · L${level}`;
    sceneButtons.forEach(button => {
      const active = button.dataset.scene === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    lodButtons.forEach(button => {
      const index = Number(button.dataset.lod);
      const active = index === level;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      const unit = document.createElement('small');
      unit.textContent = scene.unit;
      button.querySelector('.lod-size').replaceChildren(document.createTextNode(`${scene.sizes[index]} `), unit);
      button.querySelector('.lod-track i').style.width = `${100 * scene.sizes[index] / scene.sizes[3]}%`;
    });
    sceneImages.style.setProperty('--scene-aspect', `${scene.width} / ${scene.height}`);
    document.querySelector('.lod-selector').setAttribute('aria-label', `Choose a level of detail for the ${scene.name} scene`);
    for (const image of [structure, rendering]) {
      image.width = scene.width;
      image.height = scene.height;
    }
    document.querySelector('#scene-dataset').textContent = `${scene.name} · ${scene.description}`;
    document.querySelector('#scene-badge').textContent = `L${level} / ${sceneNames[level]}`;
    setSceneState('loading', `Loading ${target}…`);

    const structureSource = `assets/images/${key}-structure-l${level}.webp`;
    const renderSource = `assets/images/${key}-render-l${level}.webp`;
    try {
      await Promise.all([
        loadSceneImage(structureSource, 'high'),
        loadSceneImage(renderSource, 'high')
      ]);
      if (request !== sceneRequest) return;

      // Both views are ready before either is revealed. The request counter
      // prevents an older scene or LOD from overwriting a newer selection.
      structure.src = structureSource;
      structure.alt = `Level ${level} 3D Gaussian structure of the ${scene.name} scene, ${sceneNames[level].toLowerCase()}`;
      rendering.src = renderSource;
      rendering.alt = `Level ${level} rendered view of the ${scene.name} scene, ${scene.sizes[level]} ${scene.unit}, at its target resolution`;
      await Promise.all([structure, rendering].map(image => (
        typeof image.decode === 'function' ? image.decode() : Promise.resolve()
      )));
      if (request !== sceneRequest) return;
      setSceneState('ready', `Showing ${target} · ${scene.sizes[level]} ${scene.unit}`);

      // Background loading starts after the requested pair is visible.
      setTimeout(() => {
        if (request === sceneRequest) preloadScene(key);
      }, 200);
    } catch (_) {
      if (request !== sceneRequest) return;
      setSceneState('error', `Couldn’t load ${target}.`);
    }
  }

  function preloadScene(key) {
    for (let level = 0; level < 4; level += 1) {
      for (const type of ['structure', 'render']) {
        loadSceneImage(`assets/images/${key}-${type}-l${level}.webp`, 'low').catch(() => {});
      }
    }
  }

  lodButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedLod = Number(button.dataset.lod);
      renderScene();
    });
  });

  sceneButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedScene = button.dataset.scene;
      renderScene();
    });
  });

  sceneRetry.addEventListener('click', renderScene);
  renderScene();

  const data = window.UNFOLDING_RESULTS;
  const datasetNames = { mip: 'Mip-NeRF360', bungee: 'BungeeNeRF', deep: 'DeepBlending', tanks: 'Tanks & Temples' };
  const methods = ['3DGS', 'Octree-GS', 'LapisGS', 'Ours'];
  const datasetButtons = [...document.querySelectorAll('[data-dataset]')];
  const levelSelect = document.querySelector('#results-level');
  let selectedDataset = 'mip';

  function renderResults() {
    if (!data) return;
    const level = Number(levelSelect.value);
    const current = data[selectedDataset][level];
    const body = document.querySelector('#results-body');
    body.replaceChildren();
    methods.forEach((name, index) => {
      const row = document.createElement('tr');
      const method = document.createElement('th');
      method.scope = 'row';
      method.textContent = name;
      if (index === 3) {
        row.classList.add('ours-row');
        const description = document.createElement('span');
        description.textContent = 'Iterative Gaussian Synopsis';
        method.append(description);
      }
      row.append(method);
      ['psnr', 'ssim', 'lpips', 'fps', 'size'].forEach(key => {
        const cell = document.createElement('td');
        const decimals = key === 'fps' ? 0 : key === 'ssim' || key === 'lpips' ? 3 : 2;
        cell.textContent = Number(current[index][key]).toFixed(decimals);
        row.append(cell);
      });
      body.append(row);
    });
    const ours = current[3];
    document.querySelector('#size-ratio').textContent = `${(current[0].size / ours.size).toFixed(1)}×`;
    document.querySelector('#result-context').textContent = `${datasetNames[selectedDataset]} · L${level} · ${ours.size.toFixed(2)} MB · ${ours.fps} FPS`;
    document.querySelector('#results-table-caption').textContent = `Quantitative comparison on ${datasetNames[selectedDataset]} at L${level}, evaluated at this level's target resolution.`;
  }

  datasetButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectedDataset = button.dataset.dataset;
      datasetButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderResults();
    });
  });
  levelSelect.addEventListener('change', renderResults);
  renderResults();

  const copyButton = document.querySelector('#copy-citation');
  let copyTimer;
  copyButton.addEventListener('click', async () => {
    const citation = document.querySelector('#bibtex').textContent;
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(citation);
        copied = true;
      }
    } catch (_) {
      // Local files or restrictive browser settings may need the fallback.
    }
    if (!copied) {
      const field = document.createElement('textarea');
      field.value = citation;
      field.style.cssText = 'position:fixed;top:0;left:-9999px;opacity:0';
      document.body.append(field);
      field.select();
      try { copied = document.execCommand('copy'); } catch (_) { /* Show a manual fallback below. */ }
      field.remove();
      copyButton.focus({ preventScroll: true });
    }
    clearTimeout(copyTimer);
    const label = copyButton.querySelector('span');
    if (copied) {
      label.textContent = 'Copied!';
      document.querySelector('#copy-status').textContent = 'Citation copied to clipboard.';
    } else {
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('#bibtex'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      label.textContent = 'Select & copy';
      document.querySelector('#copy-status').textContent = 'Citation selected. Press Control+C or Command+C to copy, or use Download BibTeX.';
    }
    copyTimer = setTimeout(() => { label.textContent = 'Copy citation'; }, 2500);
  });

  // Highlight the section currently in view without changing browser history.
  if ('IntersectionObserver' in window) {
    const navLinks = [...document.querySelectorAll('.desktop-nav a')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('is-current', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
  }
})();
