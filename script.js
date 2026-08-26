document.querySelector("#year").textContent = new Date().getFullYear();

const bookingPicker = document.querySelector("[data-booking-picker]");

if (bookingPicker) {
  const catalogNode = bookingPicker.querySelector("[data-booking-services]");
  const bookingStage = bookingPicker.querySelector("[data-booking-stage]");
  const bookingPrompt = bookingPicker.querySelector("[data-booking-prompt]");
  const bookingPath = bookingPicker.querySelector("[data-booking-path]");
  const bookingOptions = bookingPicker.querySelector("[data-booking-options]");
  const bookingBreadcrumb = bookingPicker.querySelector("[data-booking-breadcrumb]");
  const bookingBack = bookingPicker.querySelector("[data-booking-back]");
  const bookingReset = bookingPicker.querySelector("[data-booking-reset]");
  const bookingStatus = bookingPicker.querySelector("[data-booking-status]");
  const placeholder = "REPLACE_WITH_CAL_URL";
  const embeddedBookingView = window.matchMedia("(min-width: 768px)");
  let calEmbedLoaded = false;
  const familyOptions = [
    { value: "natural", label: "Natural Nails" },
    { value: "builder", label: "Builder" },
    { value: "gel-x", label: "Gel-X" },
    { value: "natural-refill", label: "Natural Refill" },
    { value: "builder-refill", label: "Builder Refill" },
  ];
  const serviceFlows = {
    natural: ["finish"],
    builder: ["length", "finish"],
    "gel-x": ["length", "finish"],
    "natural-refill": ["finish"],
    "builder-refill": ["length"],
  };
  const optionLabels = {
    length: {
      natural: "On Natural Nails",
      short: "Short",
      medium: "Medium",
      long: "Long",
    },
    finish: {
      "single-color": "Single Color",
      french: "French",
      design: "Design",
    },
  };
  const optionOrder = {
    length: ["natural", "short", "medium", "long"],
    finish: ["single-color", "french", "design"],
  };
  let selection = {};
  let services = [];

  const configureBookingDestination = (choice, service) => {
    const baseLabel = choice.dataset.bookingLabel || choice.getAttribute("aria-label") || "Book appointment";
    choice.dataset.bookingLabel = baseLabel;

    if (embeddedBookingView.matches) {
      const calUrl = new URL(service.calUrl);
      choice.dataset.calLink = calUrl.pathname.replace(/^\//, "");
      choice.dataset.calConfig = JSON.stringify({ layout: "month_view" });
      choice.setAttribute("aria-haspopup", "dialog");
      choice.setAttribute("aria-label", baseLabel);
      choice.removeAttribute("target");
      choice.removeAttribute("rel");
      return;
    }

    delete choice.dataset.calLink;
    delete choice.dataset.calConfig;
    choice.removeAttribute("aria-haspopup");
    choice.target = "_blank";
    choice.rel = "noreferrer";
    choice.setAttribute("aria-label", `${baseLabel} (opens in a new tab)`);
  };

  const syncBookingDestinations = () => {
    bookingPicker.querySelectorAll("[data-service-id]").forEach((choice) => {
      const service = services.find(({ id }) => id === choice.dataset.serviceId);
      if (service && service.calUrl !== placeholder) configureBookingDestination(choice, service);
    });
  };

  document.addEventListener("click", (event) => {
    if (embeddedBookingView.matches) return;
    const choice = event.target.closest("a[data-service-id]");
    if (!choice || !bookingPicker.contains(choice)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    window.open(choice.href, "_blank", "noopener,noreferrer");
  }, true);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainder = minutes % 60;
    if (!hours) return `${remainder} min`;
    if (!remainder) return `${hours} hr`;
    return `${hours} hr ${remainder} min`;
  };

  const matchesSelection = (service, candidate) => (
    (!candidate.family || service.family === candidate.family)
    && (!candidate.length || service.length === candidate.length)
    && (!candidate.finish || service.finish === candidate.finish)
  );

  const getFamilyLabel = (family) => familyOptions.find((option) => option.value === family)?.label || family;

  const getCurrentField = () => {
    if (!selection.family) return "family";
    return serviceFlows[selection.family].find((field) => !selection[field]) || null;
  };

  const getFinalLabel = (field, value, service) => {
    if (field === "length" && service.family === "gel-x" && value === "natural") return "Natural French";
    if (field === "length" && service.family === "builder-refill") {
      return `${optionLabels.length[value]} Design`;
    }
    return optionLabels[field][value];
  };

  const makeChoiceContent = (label, duration, isFinal) => {
    const copy = document.createElement("span");
    copy.className = "booking-choice-copy";
    const name = document.createElement("strong");
    name.textContent = label;
    copy.append(name);

    if (!isFinal) {
      const arrow = document.createElement("i");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "›";
      return [copy, arrow];
    }

    const meta = document.createElement("span");
    meta.className = "booking-choice-meta";
    const time = document.createElement("span");
    time.textContent = formatDuration(duration);
    const arrow = document.createElement("i");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    meta.append(time, arrow);
    return [copy, meta];
  };

  const updateBreadcrumb = (currentField) => {
    const crumbs = [];
    if (!selection.family) {
      const root = document.createElement("span");
      root.textContent = "Appointment type";
      crumbs.push(root);
    } else if (selection.length) {
      const family = document.createElement("button");
      family.type = "button";
      family.textContent = getFamilyLabel(selection.family);
      family.addEventListener("click", () => {
        selection = { family: selection.family };
        renderBookingStage(true);
      });
      const separator = document.createElement("i");
      separator.setAttribute("aria-hidden", "true");
      separator.textContent = "›";
      const length = document.createElement("span");
      length.textContent = optionLabels.length[selection.length];
      crumbs.push(family, separator, length);
    } else {
      const family = document.createElement("span");
      family.textContent = getFamilyLabel(selection.family);
      crumbs.push(family);
    }
    bookingBreadcrumb.replaceChildren(...crumbs);
    bookingReset.hidden = !selection.family;
    bookingBack.hidden = !selection.family;
    bookingBack.innerHTML = selection.length
      ? '<span aria-hidden="true">‹</span> Change length'
      : '<span aria-hidden="true">‹</span> Refresh';
    bookingBreadcrumb.dataset.field = currentField || "complete";
  };

  const renderBookingStage = (moveFocus = false) => {
    const currentField = getCurrentField();
    const flowLength = selection.family ? serviceFlows[selection.family].length + 1 : 1;
    const currentStep = currentField === "family"
      ? 1
      : serviceFlows[selection.family].indexOf(currentField) + 2;
    const prompt = currentField === "family"
      ? "What are you booking?"
      : currentField === "length" ? "Choose a length" : "Choose a finish";

    bookingPrompt.textContent = prompt;
    bookingPath.textContent = `Step ${currentStep} of ${flowLength}`;
    bookingOptions.dataset.field = currentField;
    updateBreadcrumb(currentField);

    const values = currentField === "family"
      ? familyOptions.map((option) => option.value)
      : optionOrder[currentField].filter((value) => services.some((service) => (
        matchesSelection(service, { ...selection, [currentField]: value })
      )));

    const choices = values.map((value) => {
      const nextSelection = { ...selection, [currentField]: value };
      const matchingServices = services.filter((service) => matchesSelection(service, nextSelection));
      if (!matchingServices.length) return null;

      const isFinal = matchingServices.length === 1;
      const service = isFinal ? matchingServices[0] : null;
      const label = currentField === "family"
        ? getFamilyLabel(value)
        : isFinal ? getFinalLabel(currentField, value, service) : optionLabels[currentField][value];
      const choice = document.createElement(isFinal ? "a" : "button");
      choice.className = `booking-choice${isFinal ? " is-final" : ""}`;
      choice.dataset.bookingValue = value;

      if (isFinal) {
        choice.dataset.serviceId = service.id;
        choice.setAttribute("aria-label", `Book ${label}, ${formatDuration(service.durationMinutes)}`);
        if (service.calUrl === placeholder) {
          choice.classList.add("is-placeholder");
          choice.setAttribute("role", "link");
          choice.setAttribute("aria-disabled", "true");
          choice.tabIndex = 0;
          choice.addEventListener("click", (event) => {
            event.preventDefault();
            bookingStatus.textContent = `Booking link pending for ${label}.`;
            console.error(`Cal.com link is not configured for service: ${service.id}`);
          });
        } else {
          choice.href = service.calUrl;
          configureBookingDestination(choice, service);
        }
        choice.append(...makeChoiceContent(label, service.durationMinutes, true));
      } else {
        choice.type = "button";
        choice.setAttribute("aria-label", `Choose ${label}`);
        choice.addEventListener("click", () => {
          selection = nextSelection;
          renderBookingStage(true);
        });
        choice.append(...makeChoiceContent(label, null, false));
      }
      return choice;
    }).filter(Boolean);

    bookingOptions.replaceChildren(...choices);
    bookingStage.classList.remove("is-entering");
    requestAnimationFrame(() => bookingStage.classList.add("is-entering"));
    bookingStatus.textContent = `${prompt}. ${choices.length} options.`;
    if (moveFocus) bookingPrompt.focus({ preventScroll: true });
  };

  bookingBack.addEventListener("click", () => {
    if (selection.length) selection = { family: selection.family };
    else selection = {};
    renderBookingStage(true);
  });
  bookingReset.addEventListener("click", () => {
    selection = {};
    renderBookingStage(true);
  });
  embeddedBookingView.addEventListener("change", () => {
    syncBookingDestinations();
    loadCalEmbed();
  });

  try {
    services = JSON.parse(catalogNode.textContent);
    const placeholderServices = services.filter((service) => service.calUrl === placeholder);
    if (placeholderServices.length) {
      console.error(
        `Cal.com links are not configured for: ${placeholderServices.map((service) => service.id).join(", ")}`,
      );
    }
    renderBookingStage();
  } catch (error) {
    bookingPrompt.textContent = "Booking is temporarily unavailable";
    bookingOptions.replaceChildren();
    console.error(error);
  }

  function loadCalEmbed() {
    if (
      calEmbedLoaded
      || !embeddedBookingView.matches
      || !services.some((service) => service.calUrl !== placeholder)
    ) return;

    calEmbedLoaded = true;
    ((C, A, L) => {
      const push = (api, args) => api.q.push(args);
      const document = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const args = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          const script = document.createElement("script");
          script.src = A;
          script.async = true;
          document.head.appendChild(script);
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api = function () { push(api, arguments); };
          const namespace = args[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            push(cal.ns[namespace], args);
            push(cal, ["initNamespace", namespace]);
          } else {
            push(cal, args);
          }
          return;
        }
        push(cal, args);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    window.Cal("init", { origin: "https://cal.com" });
    window.Cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
  }

  if ("IntersectionObserver" in window) {
    const bookingObserver = new IntersectionObserver((entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      loadCalEmbed();
      if (calEmbedLoaded) observer.disconnect();
    }, { rootMargin: "300px 0px" });
    bookingObserver.observe(bookingPicker);
  } else {
    loadCalEmbed();
  }

  bookingPicker.addEventListener("pointerdown", loadCalEmbed, { passive: true });
  bookingPicker.addEventListener("focusin", loadCalEmbed);

}

const galleryDialog = document.querySelector("#style-gallery");
const imageDialog = document.querySelector("#image-lightbox");
const galleryTitle = document.querySelector("#gallery-title");
const galleryDescription = document.querySelector("#gallery-description");
const galleryGrid = document.querySelector("#gallery-grid");
const lightboxPhoto = document.querySelector("#lightbox-photo");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxDescription = document.querySelector("#lightbox-description");
const lightboxPosition = document.querySelector("[data-lightbox-position]");
const lightboxSwipe = document.querySelector("[data-lightbox-swipe]");
const lightboxPrevious = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
const lightboxRotation = document.querySelector("[data-lightbox-rotation]");
const lightboxRotationIcon = document.querySelector("[data-lightbox-rotation-icon]");
const lightboxRotationLabel = document.querySelector("[data-lightbox-rotation-label]");
const lightboxStatus = document.querySelector("[data-lightbox-status]");
const serviceTriggers = [...document.querySelectorAll("[data-gallery-id]")];
const heroCarousel = document.querySelector("[data-hero-carousel]");
const heroCarouselToggle = document.querySelector("[data-hero-carousel-toggle]");
const heroCarouselToggleIcon = document.querySelector("[data-hero-carousel-toggle-icon]");
const heroCarouselStatus = document.querySelector("[data-hero-carousel-status]");

if (galleryDialog && imageDialog && galleryGrid) {
  let galleryDataPromise;
  let galleryOpener;
  let imageOpener;
  let lightboxItems = [];
  let lightboxIndex = 0;
  let lightboxTimer;
  let lightboxPaused = false;
  let lightboxPointerStartX;
  let lightboxSuppressClick = false;
  let navigatingToBooking = false;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const loadGalleryData = () => {
    if (!galleryDataPromise) {
      galleryDataPromise = fetch(document.body.dataset.galleryUrl || "/data/gallery.json?v=20260824-1")
        .then((response) => {
          if (!response.ok) throw new Error(`Gallery request failed: ${response.status}`);
          return response.json();
        })
        .catch((error) => {
          galleryDataPromise = undefined;
          throw error;
        });
    }

    return galleryDataPromise;
  };

  const setDialogLock = () => {
    document.body.classList.toggle("dialog-open", galleryDialog.open || imageDialog.open);
  };

  const closeImage = () => {
    window.clearInterval(lightboxTimer);
    lightboxTimer = undefined;
    if (imageDialog.open) imageDialog.close();
  };

  const closeGallery = () => {
    closeImage();
    if (galleryDialog.open) galleryDialog.close();
  };

  const showGalleryMessage = (message) => {
    const status = document.createElement("p");
    status.className = "gallery-error";
    status.setAttribute("role", "status");
    status.textContent = message;
    galleryGrid.replaceChildren(status);
  };

  const resolveSiteAsset = (source) => {
    if (!source || /^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(source)) return source;
    return `/${source.replace(/^\.?\//, "")}`;
  };

  const getExampleImage = (gallery, example) => resolveSiteAsset(example.image || gallery.image);

  const renderLightboxItem = (announce = false) => {
    const { gallery, example } = lightboxItems[lightboxIndex];
    lightboxPhoto.dataset.panel = String(example.panel ?? 0);
    lightboxPhoto.classList.toggle("is-standalone", Boolean(example.image));
    lightboxImage.src = getExampleImage(gallery, example);
    lightboxImage.alt = example.alt;
    lightboxTitle.textContent = example.name;
    lightboxDescription.textContent = example.alt;
    lightboxPosition.textContent = lightboxItems.length > 1
      ? `${lightboxIndex + 1} of ${lightboxItems.length} · Swipe or use arrows`
      : "";
    lightboxPrevious.hidden = lightboxItems.length < 2;
    lightboxNext.hidden = lightboxItems.length < 2;
    if (announce && lightboxStatus) {
      lightboxStatus.textContent = `${example.name}, image ${lightboxIndex + 1} of ${lightboxItems.length}.`;
    }
  };

  const updateLightboxRotationControl = (announce = false) => {
    if (!lightboxRotation) return;
    const canRotate = lightboxItems.length > 1 && !reducedMotion.matches;
    lightboxRotation.hidden = !canRotate;
    lightboxRotation.setAttribute("aria-pressed", String(lightboxPaused));
    const action = lightboxPaused ? "Resume" : "Pause";
    lightboxRotation.setAttribute("aria-label", `${action} automatic photo rotation`);
    if (lightboxRotationLabel) lightboxRotationLabel.textContent = `${action} slideshow`;
    if (lightboxRotationIcon) lightboxRotationIcon.textContent = lightboxPaused ? "▶" : "Ⅱ";
    if (announce && lightboxStatus) {
      lightboxStatus.textContent = lightboxPaused
        ? "Automatic photo rotation paused."
        : "Automatic photo rotation resumed.";
    }
  };

  const stopLightboxRotation = () => {
    window.clearInterval(lightboxTimer);
    lightboxTimer = undefined;
  };

  const startLightboxRotation = () => {
    stopLightboxRotation();
    if (lightboxPaused || lightboxItems.length < 2 || reducedMotion.matches || document.hidden || !imageDialog.open) return;
    lightboxTimer = window.setInterval(() => {
      lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
      renderLightboxItem();
    }, 5000);
  };

  const moveLightbox = (direction) => {
    if (lightboxItems.length < 2) return;
    lightboxIndex = (lightboxIndex + direction + lightboxItems.length) % lightboxItems.length;
    renderLightboxItem(true);
    startLightboxRotation();
  };

  const openImage = (gallery, example, opener, examples = [example], initialIndex = 0) => {
    imageOpener = opener;
    lightboxItems = examples.map((item) => ({ gallery, example: item }));
    lightboxIndex = Math.max(0, Math.min(initialIndex, lightboxItems.length - 1));
    lightboxPaused = false;
    renderLightboxItem();
    updateLightboxRotationControl();
    imageDialog.showModal();
    setDialogLock();
    startLightboxRotation();
    document.querySelector("[data-lightbox-close]")?.focus();
  };

  if (heroCarousel) {
    const slides = [...heroCarousel.querySelectorAll(".hero-set-slide")];
    const heroItems = slides.map((slide) => ({
      image: slide.dataset.full,
      name: slide.dataset.title,
      alt: slide.dataset.alt,
    }));
    let activeIndex = 0;
    let carouselTimer;
    let heroPaused = false;
    let pointerStartX;
    let suppressClick = false;
    let lastWheelTime = 0;

    const updateHeroCarousel = (nextIndex, announce = false) => {
      activeIndex = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        const offset = (index - activeIndex + slides.length) % slides.length;
        slide.classList.toggle("is-active", offset === 0);
        slide.classList.toggle("is-next", offset === 1);
        slide.classList.toggle("is-back", offset === 2);
        slide.setAttribute("aria-hidden", "true");
      });
      const activeSlide = slides[activeIndex];
      heroCarousel.setAttribute(
        "aria-label",
        `Enlarge ${activeSlide.dataset.title} nail photo. Use the arrow keys or swipe for another set.`,
      );
      if (announce && heroCarouselStatus) {
        heroCarouselStatus.textContent = `${activeSlide.dataset.title}, featured photo ${activeIndex + 1} of ${slides.length}.`;
      }
    };

    const updateHeroRotationControl = (announce = false) => {
      if (!heroCarouselToggle) return;
      const canRotate = slides.length > 1 && !reducedMotion.matches;
      heroCarouselToggle.hidden = !canRotate;
      heroCarouselToggle.setAttribute("aria-pressed", String(heroPaused));
      const action = heroPaused ? "Resume" : "Pause";
      const label = `${action} featured nail slideshow`;
      heroCarouselToggle.setAttribute("aria-label", label);
      heroCarouselToggle.title = label;
      if (heroCarouselToggleIcon) heroCarouselToggleIcon.textContent = heroPaused ? "▶" : "Ⅱ";
      if (announce && heroCarouselStatus) {
        heroCarouselStatus.textContent = heroPaused
          ? "Featured nail slideshow paused."
          : "Featured nail slideshow resumed.";
      }
    };

    const stopHeroCarousel = () => {
      window.clearInterval(carouselTimer);
      carouselTimer = undefined;
    };

    const startHeroCarousel = () => {
      stopHeroCarousel();
      if (heroPaused || reducedMotion.matches || document.hidden || heroCarousel.matches(":hover, :focus")) return;
      carouselTimer = window.setInterval(() => updateHeroCarousel(activeIndex + 1), 4200);
    };

    const moveHeroCarousel = (direction) => {
      updateHeroCarousel(activeIndex + direction, true);
      startHeroCarousel();
    };

    heroCarouselToggle?.addEventListener("click", () => {
      heroPaused = !heroPaused;
      if (heroPaused) stopHeroCarousel();
      else startHeroCarousel();
      updateHeroRotationControl(true);
    });

    heroCarousel.addEventListener("click", (event) => {
      if (suppressClick) {
        event.preventDefault();
        return;
      }
      const activeSlide = slides[activeIndex];
      stopHeroCarousel();
      openImage({}, heroItems[activeIndex], heroCarousel, heroItems, activeIndex);
    });

    heroCarousel.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      moveHeroCarousel(event.key === "ArrowRight" ? 1 : -1);
    });

    heroCarousel.addEventListener("pointerdown", (event) => {
      pointerStartX = event.clientX;
      stopHeroCarousel();
      try {
        heroCarousel.setPointerCapture?.(event.pointerId);
      } catch {
        // The gesture can still be handled if a browser cancels pointer capture.
      }
    });

    heroCarousel.addEventListener("pointerup", (event) => {
      if (pointerStartX === undefined) return;
      const distance = event.clientX - pointerStartX;
      pointerStartX = undefined;
      if (Math.abs(distance) < 24) {
        startHeroCarousel();
        return;
      }
      suppressClick = true;
      moveHeroCarousel(distance < 0 ? 1 : -1);
      window.setTimeout(() => { suppressClick = false; }, 0);
    });

    heroCarousel.addEventListener("pointercancel", () => {
      pointerStartX = undefined;
      startHeroCarousel();
    });

    heroCarousel.addEventListener("wheel", (event) => {
      const horizontalDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.shiftKey ? event.deltaY : 0;
      if (Math.abs(horizontalDelta) < 12) return;
      event.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime < 380) return;
      lastWheelTime = now;
      moveHeroCarousel(horizontalDelta > 0 ? 1 : -1);
    }, { passive: false });

    heroCarousel.addEventListener("pointerenter", stopHeroCarousel);
    heroCarousel.addEventListener("pointerleave", startHeroCarousel);
    heroCarousel.addEventListener("focus", stopHeroCarousel);
    heroCarousel.addEventListener("blur", startHeroCarousel);
    document.addEventListener("visibilitychange", startHeroCarousel);
    reducedMotion.addEventListener?.("change", () => {
      updateHeroRotationControl();
      startHeroCarousel();
    });
    updateHeroCarousel(0);
    updateHeroRotationControl();
    startHeroCarousel();
  }

  const renderGallery = (gallery) => {
    galleryTitle.textContent = gallery.title;
    galleryDescription.textContent = gallery.description;

    const cards = gallery.examples.map((example, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "gallery-shot";
      card.dataset.panel = String(example.panel ?? 0);
      card.classList.toggle("is-standalone", Boolean(example.image));
      card.setAttribute("aria-haspopup", "dialog");
      card.setAttribute("aria-controls", "image-lightbox");
      card.setAttribute("aria-label", `Expand ${example.name} image`);

      const crop = document.createElement("span");
      crop.className = "gallery-crop";

      const image = document.createElement("img");
      image.src = resolveSiteAsset(example.thumbnail) || getExampleImage(gallery, example);
      image.alt = "";
      image.width = example.thumbnail ? 240 : example.image ? 600 : 1350;
      image.height = example.thumbnail ? 400 : example.image ? 1000 : 750;
      image.decoding = "async";
      image.loading = "lazy";
      crop.append(image);

      const label = document.createElement("span");
      label.className = "gallery-shot-label";

      const name = document.createElement("span");
      name.textContent = example.name;

      const expand = document.createElement("i");
      expand.textContent = "↗";
      expand.setAttribute("aria-hidden", "true");

      label.append(name, expand);
      card.append(crop, label);
      card.addEventListener("click", () => openImage(gallery, example, card, gallery.examples, index));
      return card;
    });

    galleryGrid.dataset.count = String(cards.length);
    galleryGrid.replaceChildren(...cards);
  };

  const openGallery = async (trigger) => {
    const serviceName = trigger.querySelector(".service-name")?.textContent || "Nail portfolio";
    galleryOpener = trigger;
    galleryTitle.textContent = serviceName;
    galleryDescription.textContent = "Loading studio work…";
    showGalleryMessage("Loading examples…");
    galleryDialog.setAttribute("aria-busy", "true");
    galleryDialog.scrollTop = 0;
    galleryGrid.scrollLeft = 0;
    galleryDialog.showModal();
    setDialogLock();

    try {
      const galleries = await loadGalleryData();
      const gallery = galleries[trigger.dataset.galleryId];
      if (!gallery) throw new Error("Gallery entry not found");
      renderGallery(gallery);
    } catch (error) {
      galleryTitle.textContent = serviceName;
      galleryDescription.textContent = "The studio gallery could not load right now.";
      showGalleryMessage("Please close this window and try again.");
      console.error(error);
    } finally {
      galleryDialog.removeAttribute("aria-busy");
    }
  };

  serviceTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openGallery(trigger));
  });

  document.querySelector("[data-gallery-close]")?.addEventListener("click", closeGallery);
  document.querySelector("[data-lightbox-close]")?.addEventListener("click", closeImage);
  lightboxPrevious?.addEventListener("click", () => moveLightbox(-1));
  lightboxNext?.addEventListener("click", () => moveLightbox(1));
  lightboxRotation?.addEventListener("click", () => {
    lightboxPaused = !lightboxPaused;
    if (lightboxPaused) stopLightboxRotation();
    else startLightboxRotation();
    updateLightboxRotationControl(true);
  });

  lightboxSwipe?.addEventListener("pointerdown", (event) => {
    lightboxPointerStartX = event.clientX;
    stopLightboxRotation();
    try {
      lightboxSwipe.setPointerCapture?.(event.pointerId);
    } catch {
      // The swipe still works if the browser declines pointer capture.
    }
  });

  lightboxSwipe?.addEventListener("pointerup", (event) => {
    if (lightboxPointerStartX === undefined) return;
    const distance = event.clientX - lightboxPointerStartX;
    lightboxPointerStartX = undefined;
    if (Math.abs(distance) < 32) {
      startLightboxRotation();
      return;
    }
    lightboxSuppressClick = true;
    moveLightbox(distance < 0 ? 1 : -1);
    window.setTimeout(() => { lightboxSuppressClick = false; }, 0);
  });

  lightboxSwipe?.addEventListener("pointercancel", () => {
    lightboxPointerStartX = undefined;
    startLightboxRotation();
  });

  lightboxSwipe?.addEventListener("click", (event) => {
    if (lightboxSuppressClick) event.preventDefault();
  });

  imageDialog.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    moveLightbox(event.key === "ArrowRight" ? 1 : -1);
  });

  reducedMotion.addEventListener?.("change", () => {
    updateLightboxRotationControl();
    startLightboxRotation();
  });
  document.addEventListener("visibilitychange", startLightboxRotation);

  document.querySelectorAll("[data-reserve-now]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      navigatingToBooking = true;
      closeGallery();
      const bookingSection = document.querySelector("#book");
      window.history.replaceState(null, "", "#book");
      bookingSection?.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => {
        document.querySelector("#booking-stage-title")?.focus({ preventScroll: true });
        navigatingToBooking = false;
      }, reducedMotion.matches ? 0 : 500);
    });
  });

  galleryDialog.addEventListener("click", (event) => {
    const bounds = galleryDialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (event.target === galleryDialog && outside) closeGallery();
  });

  imageDialog.addEventListener("click", (event) => {
    if (event.target === imageDialog) closeImage();
  });

  imageDialog.addEventListener("close", () => {
    stopLightboxRotation();
    setDialogLock();
    if (!navigatingToBooking) imageOpener?.focus();
  });

  galleryDialog.addEventListener("close", () => {
    closeImage();
    setDialogLock();
    if (!navigatingToBooking) galleryOpener?.focus();
  });
}

// Scale from the viewport's dominant axis: width for landscape screens,
// height for portrait screens, and a blend of both near square. The physical
// window size keeps this additive with the browser's own page zoom.
let desktopScaleFrame;

const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));

const scaleAxis = (size, start, comfort, maximum) => {
  if (size <= start) return 1;
  if (size <= comfort) return 1 + ((size - start) / (comfort - start)) * 0.05;
  return 1.05 + clamp((size - comfort) / (maximum - comfort), 0, 1) * 0.45;
};

const updateDesktopScale = () => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const windowWidth = window.outerWidth || viewportWidth;
  const windowHeight = window.outerHeight || viewportHeight;
  const shortSide = Math.min(windowWidth, windowHeight);

  let scale = 1;
  let mode = "compact";

  if (shortSide >= 700) {
    const widthScale = scaleAxis(windowWidth, 1080, 1920, 3840);
    const heightScale = scaleAxis(windowHeight, 720, 1080, 2160);
    const aspectDelta = (viewportWidth - viewportHeight) / Math.max(viewportWidth, viewportHeight);
    const squareWeight = 1 - clamp(Math.abs(aspectDelta) / 0.2, 0, 1);
    const dominantScale = aspectDelta >= 0 ? widthScale : heightScale;
    const balancedScale = Math.sqrt(widthScale * heightScale);

    scale = dominantScale + (balancedScale - dominantScale) * squareWeight;
    mode = squareWeight > 0.5 ? "balanced" : aspectDelta >= 0 ? "horizontal" : "vertical";
  }

  const appliedScale = clamp(scale, 1, 1.5);
  document.body.style.setProperty("--desktop-scale", appliedScale.toFixed(4));
  document.documentElement.style.setProperty(
    "--landing-viewport-height",
    `${(viewportHeight / appliedScale).toFixed(2)}px`,
  );
  document.documentElement.dataset.scaleMode = mode;
};

const queueDesktopScale = () => {
  if (desktopScaleFrame) return;
  desktopScaleFrame = requestAnimationFrame(() => {
    desktopScaleFrame = 0;
    updateDesktopScale();
  });
};

updateDesktopScale();
window.addEventListener("resize", queueDesktopScale, { passive: true });

// Smoothly carry the hero elements between stacked and side-by-side layouts.
// This uses FLIP animation so crossing a responsive breakpoint feels like a
// glide instead of an instant jump while someone resizes their window.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const heroElements = [...document.querySelectorAll(".hero-copy, .hero-art")];
  let previousRects = new Map(
    heroElements.map((element) => [element, element.getBoundingClientRect()]),
  );
  let resizeFrame;

  const animateHeroReflow = () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      heroElements.forEach((element) => {
        element.getAnimations().forEach((animation) => {
          if (animation.id === "hero-reflow") animation.cancel();
        });

        const previous = previousRects.get(element);
        const current = element.getBoundingClientRect();
        previousRects.set(element, current);

        if (!previous || (!previous.width && !previous.height)) return;

        const x = previous.left - current.left;
        const y = previous.top - current.top;
        if (Math.abs(x) < 1 && Math.abs(y) < 1) return;

        const animation = element.animate(
          [
            { transform: `translate3d(${x}px, ${y}px, 0)` },
            { transform: "translate3d(0, 0, 0)" },
          ],
          {
            duration: 620,
            easing: "cubic-bezier(.16, 1, .3, 1)",
          },
        );
        animation.id = "hero-reflow";
      });
    });
  };

  new ResizeObserver(animateHeroReflow).observe(document.documentElement);
}
