const allElements = document.querySelectorAll("body > *");
const controlElements = document.querySelectorAll(".control-input");

let selectedElOriginalStyle = {};
let selectedEl;

const updatePropertyValue = () => {
  if (!selectedEl) {
    return;
  }
  const propertySelectEl = document.getElementById("property-select");
  const durationInputEl = document.getElementById("duration-input");
  const timingInputEl = document.getElementById("timing-input");
  const selectedProperty = propertySelectEl.value;
  selectedEl.style.setProperty(
    "transition",
    `${selectedProperty} ${durationInputEl.value}ms ${timingInputEl.value}`
  );
};

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

document.addEventListener("scroll", event => {
  if (!selectedEl) {
    return;
  }
  const propertySelected = document.getElementById("property-select").value;
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
    selectedEl.style.setProperty(propertySelected, propertyInitialValue);
  } else if (window.scrollY > scrollFinalValue) {
    selectedEl.style.setProperty(propertySelected, propertyFinalValue);
  } else {
    if (!scrollInitialValue || !scrollFinalValue) {
      return;
    }
    const percentage =
      (window.scrollY - scrollInitialValue) /
      (scrollFinalValue - scrollInitialValue);
    selectedEl.style.setProperty(
      propertySelected,
      (propertyFinalValue - propertyInitialValue) * percentage +
        propertyInitialValue
    );
  }
});
