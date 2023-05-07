document
  .getElementById("cta-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const googleFormURL =
      "https://docs.google.com/forms/d/e/1FAIpQLSd9P7qRNOb3Dlin42OKu_zRidoljgwV1-vN999Fj7DT1uZYxw/formResponse";
    const entryIdentifier = "entry.2046440925";

    const formData = new FormData();
    formData.append(entryIdentifier, email);

    setFormDisabledState(true);
    fetch(googleFormURL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
      .then(async (res) => {
        // console.log({ res, ok: res.ok, status: res.status });
        // if (!res.ok) {
        //   throw new Error();
        // }
        onCtaSuccess();
      })
      .catch(onCtaError)
      .finally(() => setFormDisabledState(false));
  });

function setFormDisabledState(state) {
  document.getElementById("cta-send").disabled = state;
  document.getElementById("cta-send").innerText = state
    ? "Attendi..."
    : "Invia";
  document.getElementById("email").disabled = state;
}

function onCtaSuccess() {
  const section = document.getElementById("cta-section");

  section.classList.remove("bg-gray-50");
  section.classList.add("bg-green-50");

  const formSection = document.getElementById("cta-form-container");
  const successSection = document.getElementById("cta-success");

  formSection.classList.add("force-hidden");
  successSection.classList.remove("force-hidden");
}

function onCtaError() {
  const snackbar = new mdc.snackbar.MDCSnackbar(
    document.querySelector(".mdc-snackbar")
  );
  snackbar.open();
}
