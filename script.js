const form = document.getElementById("form-section");

form.addEventListener("submit", (event) => {
  generate(event);
});

function generate(event) {
  event.preventDefault();

  // Collect data from the form fields
  const profileImgFile = event.target[0].files[0];  // File input for profile image
  const name = event.target[1].value;
  const fName = event.target[2].value;
  const address = event.target[3].value;
  const contact = event.target[4].value;
  const email = event.target[5].value;
  const workExp = event.target[6].value;
  const skills = event.target[7].value;  // Skills as space-separated string
  const interest = event.target[8].value;  // Interests as space-separated string
  const languages = event.target[9].value;  // Languages as space-separated string

  // Check if all fields have values
  if (!profileImgFile || !name || !fName || !address || !contact || !email || !workExp || !skills || !interest || !languages) {
    alert('Please fill in all the fields.');
    return; // Stop the function execution
  }

  // Convert the image to base64 using FileReader
  const reader = new FileReader();
  reader.onloadend = function () {
    // This will contain the base64-encoded image data
    const base64Image = reader.result;

    // Split skills, interests, and languages into arrays
    const skillsArray = skills.split(' ').map(item => item.trim()).filter(Boolean);
    const interestArray = interest.split(' ').map(item => item.trim()).filter(Boolean);
    const languagesArray = languages.split(' ').map(item => item.trim()).filter(Boolean);

    // Collect form data along with the base64 image
    const data = {
      profileImg: base64Image,  // Store the base64 image
      name: name,
      fName: fName,
      address: address,
      contact: contact,
      email: email,
      workExp: workExp,
      skills: skillsArray,  // Store the skills as an array
      interest: interestArray,  // Store interests as an array
      languages: languagesArray,  // Store languages as an array
    };

    // Save data to localStorage
    localStorage.setItem('resumeData', JSON.stringify(data));

    // Redirect to the resume page (or refresh to display the data)
    window.location.href = '/resume.html';
  };
  reader.readAsDataURL(profileImgFile);  // Convert the image file to base64
}
