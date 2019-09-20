const allElements = document.querySelectorAll("body > *");
const controlElements = document.querySelectorAll(".control-input");

let selectedElOriginalStyle = {};
let selectedEl;

const transformProperties = ["translateX", "translateY"];

// Get correct property for cases of `transform`
const getSelectedProperty = () => {
  const property = document.getElementById("property-select").value;
  return transformProperties.includes(property) ? `transform` : property;
};

// Add unit to property value
const getPropertyValue = value => {
  const property = document.getElementById("property-select").value;
  const unit = document.getElementById("unit-select").value;
  return transformProperties.includes(property)
    ? `${property}(${value}${unit})`
    : value;
};

// Update element style with selected options
const updatePropertyValue = () => {
  if (!selectedEl) {
    return;
  }
  const durationInputEl = document.getElementById("duration-input");
  const timingInputEl = document.getElementById("timing-input");
  selectedEl.style.setProperty(
    "transition",
    `${getSelectedProperty()} ${durationInputEl.value}ms ${timingInputEl.value}`
  );
};

// Add listener to update transition property every time a control input is changed
controlElements.forEach(item =>
  item.addEventListener("input", () => updatePropertyValue())
);

// Add click events to add animation to selected element;
allElements.forEach(item =>
  item.addEventListener("click", e => {
    e.preventDefault();
    e.stopPropagation();
    selectedEl = e.target;
    updatePropertyValue();
  })
);

// Add border to highlight which element is being selected
allElements.forEach(item => {
  item.addEventListener("mouseover", e => {
    el = e.target;
    el.classList.add("sd-hover-item");
  });
  item.addEventListener("mouseout", e => {
    el = e.target;
    el.classList.remove("sd-hover-item");
  });
});

// Animate element based on scroll points
document.addEventListener("scroll", event => {
  if (!selectedEl) {
    return;
  }
  const propertySelected = getSelectedProperty();
  const propertyInitialValue = Number(
    document.getElementById("property-initial-value-input").value
  );
  const propertyFinalValue = Number(
    document.getElementById("property-final-value-input").value
  );
  const scrollInitialValue = Number(
    document.getElementById("scroll-bar-tooltip-start").innerText
  );
  const scrollFinalValue = Number(
    document.getElementById("scroll-bar-tooltip-end").innerText
  );
  if (window.scrollY < scrollInitialValue) {
    selectedEl.style.setProperty(
      propertySelected,
      getPropertyValue(propertyInitialValue)
    );
  } else if (window.scrollY > scrollFinalValue) {
    selectedEl.style.setProperty(
      propertySelected,
      getPropertyValue(propertyFinalValue)
    );
  } else {
    if (!scrollInitialValue || !scrollFinalValue) {
      return;
    }

    const percentage =
      (window.scrollY - scrollInitialValue) /
      (scrollFinalValue - scrollInitialValue);

    selectedEl.style.setProperty(
      propertySelected,
      getPropertyValue(
        (propertyFinalValue - propertyInitialValue) * percentage +
          propertyInitialValue
      )
    );
  }
});
