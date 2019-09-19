const scrollBarElement = document.getElementById("scroll-bar");
const tooltipElement = document.getElementById("scroll-bar-tooltip");
const markerStartElement = document.getElementById("scroll-bar-tooltip-start");
const markerEndElement = document.getElementById("scroll-bar-tooltip-end");
const selectEl = document.getElementById("property-select");

markers = [];
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
let propertySelected;

// Create properties select options
propertiesAvailable.forEach(item => {
  const optionEl = document.createElement("option");
  optionEl.value = item.value;
  optionEl.innerText = item.label;
  optionEl.disabled = item.disabled;
  selectEl.appendChild(optionEl);
});

// Create ruler on HTML
Array(30)
  .fill(null)
  .forEach((_, sectionIndex) => {
    const ruleSectionEl = document.createElement("div");
    ruleSectionEl.classList.add("rule-section");
    Array(6)
      .fill(null)
      .forEach((_, i) => {
        const el = document.createElement("div");
        if (i === 5) {
          el.classList.add("rule-mark", "rule-mark-big");
          const label = document.createElement("span");
          label.classList.add("rule-mark-label");
          label.innerText = 100 * sectionIndex + 100;
          el.appendChild(label);
        } else {
          el.classList.add("rule-mark", "rule-mark-small");
        }
        el.style.setProperty("left", `${20 * i + 100 * sectionIndex}px`);
        ruleSectionEl.appendChild(el);
      });
    document.getElementById("ruler").appendChild(ruleSectionEl);
  });

const setMarker = ({ index, mousePosition, element }) => {
  markers[index] = mousePosition + scrollBarElement.scrollLeft;
  element.style.setProperty("left", `${mousePosition}px`);
  element.innerText = markers[index];
  element.classList.remove("tooltip-hide");
};

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

markerStartElement.addEventListener("click", e => {
  markers[0] = null;
  markerStartElement.classList.add("tooltip-hide");
  markerStartElement.innerText = null;
});

markerEndElement.addEventListener("click", e => {
  markers[1] = null;
  markerEndElement.classList.add("tooltip-hide");
  markerEndElement.innerText = null;
});

scrollBarElement.addEventListener("mousemove", e => {
  tooltipElement.style.setProperty("left", `${e.layerX}px`);
  tooltipElement.innerText = e.layerX + scrollBarElement.scrollLeft;
});

scrollBarElement.addEventListener("mouseleave", e => {
  tooltipElement.classList.add("tooltip-hide");
});

scrollBarElement.addEventListener("mouseenter", e => {
  tooltipElement.classList.remove("tooltip-hide");
});
