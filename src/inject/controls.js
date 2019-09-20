window.createControls = () => {
  const createPropertyOptions = () => {
    const selectEl = document.getElementById("property-select");

    const propertiesAvailable = [
      {
        value: "background",
        label: "Background",
        disabled: true
      },
      {
        value: "border",
        label: "Border",
        disabled: true
      },
      {
        value: "color",
        label: "Color",
        disabled: true
      },
      {
        value: "height",
        label: "Height",
        disabled: true
      },
      {
        value: "margin",
        label: "Margin",
        disabled: true
      },
      {
        value: "opacity",
        label: "Opacity",
        disabled: false
      },
      {
        value: "padding",
        label: "Padding",
        disabled: true
      },
      {
        value: "scale",
        label: "Scale",
        disabled: true
      },
      {
        value: "translateX",
        label: "Translate X",
        disabled: false
      },
      {
        value: "translateY",
        label: "Translate Y",
        disabled: false
      },
      {
        value: "width",
        label: "Width",
        disabled: true
      }
    ];

    // Create properties select options
    propertiesAvailable.forEach(item => {
      const optionEl = document.createElement("option");
      optionEl.value = item.value;
      optionEl.innerText = item.label;
      optionEl.disabled = item.disabled;
      selectEl.appendChild(optionEl);
    });
  };

  const createRuler = () =>
    Array(30)
      .fill(null)
      .forEach((_, sectionIndex, array) => {
        const ruleSectionEl = document.createElement("div");
        ruleSectionEl.classList.add("sd-rule-section");
        Array(sectionIndex === array.length - 1 ? 5 : 6)
          .fill(null)
          .forEach((_, i) => {
            const el = document.createElement("div");
            if (i === 5) {
              el.classList.add("sd-rule-mark", "sd-rule-mark-big");
              const label = document.createElement("span");
              label.classList.add("sd-rule-mark-label");
              label.innerText = 100 * sectionIndex + 100;
              el.appendChild(label);
            } else {
              el.classList.add("sd-rule-mark", "sd-rule-mark-small");
            }
            el.style.setProperty("left", `${20 * i + 100 * sectionIndex}px`);
            ruleSectionEl.appendChild(el);
          });
        document.getElementById("sd-ruler").appendChild(ruleSectionEl);
      });

  const setListeners = () => {
    markers = [];
    const scrollBarElement = document.getElementById("scroll-bar");
    const tooltipElement = document.getElementById("sd-scroll-bar-tooltip");
    const markerStartElement = document.getElementById(
      "sd-scroll-bar-tooltip-start"
    );
    const markerEndElement = document.getElementById(
      "sd-scroll-bar-tooltip-end"
    );
    const jsonButtonEl = document.getElementById("export-button");
    const jsonOutputEl = document.getElementById("json-output");
    const jsonOutputTextEl = document.getElementById("sd-json-output-text");

    // Helper to add marker
    const setMarker = ({ index, mousePosition, element }) => {
      markers[index] = mousePosition + scrollBarElement.scrollLeft;
      element.style.setProperty("left", `${mousePosition}px`);
      element.innerText = markers[index];
      element.classList.remove("sd-tooltip-hide");
    };

    // Set marker on scrollBar click
    scrollBarElement.addEventListener("click", e => {
      const index =
        markers.length < 2
          ? markers.length
          : markers.findIndex(item => item === null);
      const element = index === 0 ? markerStartElement : markerEndElement;
      const mousePosition = e.layerX;

      setMarker({
        index,
        mousePosition,
        element
      });
    });

    // Remove start marker on click
    markerStartElement.addEventListener("click", e => {
      markers[0] = null;
      markerStartElement.classList.add("sd-tooltip-hide");
      markerStartElement.innerText = null;
    });

    // Remove end marker on click
    markerEndElement.addEventListener("click", e => {
      markers[1] = null;
      markerEndElement.classList.add("sd-tooltip-hide");
      markerEndElement.innerText = null;
    });

    // Add hover marker on scrollbar mouse enter
    scrollBarElement.addEventListener("mouseenter", e => {
      tooltipElement.classList.remove("sd-tooltip-hide");
    });

    // Move hover marker on scrollbar mouse movement
    scrollBarElement.addEventListener("mousemove", e => {
      tooltipElement.style.setProperty("left", `${e.layerX}px`);
      tooltipElement.innerText = e.layerX + scrollBarElement.scrollLeft;
    });

    // Remove hover marker on scrollbar mouse leave
    scrollBarElement.addEventListener("mouseleave", e => {
      tooltipElement.classList.add("sd-tooltip-hide");
    });

    // Create json and export on button click
    jsonButtonEl.addEventListener("click", () => {
      const unit = document.getElementById("unit-select").value;
      const startValue = document.getElementById("property-initial-value-input")
        .value;
      const endValue = document.getElementById("property-final-value-input")
        .value;
      let querySelector = "";
      if (selectedEl) {
        if (selectedEl.id) {
          querySelector += `#${selectedEl.id}`;
        }

        selectedEl.classList.forEach(item => {
          querySelector += `.${item}`;
        });
      }
      const obj = {
        start: Number(markerStartElement.innerText),
        end: Number(markerEndElement.innerText),
        element: querySelector,
        properties: [
          {
            startValue: unit ? `${startValue}${unit}` : startValue,
            endValue: unit ? `${endValue}${unit}` : endValue,
            property: document.getElementById("property-select").value,
            duration: Number(document.getElementById("duration-input").value),
            timing: document.getElementById("timing-input").value
          }
        ]
      };
      const jsonString = JSON.stringify(obj);
      jsonOutputEl.classList.add("sd-json-show");
      jsonOutputTextEl.value = jsonString;
    });

    // Hide json on close section click
    document
      .getElementById("sd-json-output-close")
      .addEventListener("click", () => {
        jsonOutputEl.classList.remove("sd-json-show");
      });

    // Copy json code on textarea click
    jsonOutputTextEl.addEventListener("click", () => {
      jsonOutputTextEl.select();
      document.execCommand("copy");
    });
  };

  createPropertyOptions();
  createRuler();
  setListeners();
};

window.createControls();
