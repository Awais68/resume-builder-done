// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the stored resume data from localStorage
  const resumeData = JSON.parse(localStorage.getItem('resumeData'));

  if (resumeData) {
    // Set profile image if available
    const profileImage = document.querySelector(".profile_sec img");
    if (resumeData.profileImg) {
      profileImage.src = resumeData.profileImg;  // Set the base64 image data to the img src
    } else {
      profileImage.src = "default-profile-image.jpg"; // Use a default image if none is found
    }

    // Populate the personal details
    document.getElementById("name").innerHTML = `${resumeData.name} <br><span class="sub-heading">Web Developer</span>`;
    document.getElementById("phone").innerHTML = `Phone: ${resumeData.contact}`;
    document.getElementById("email").innerHTML = `Email: ${resumeData.email}`;
    document.getElementById("linkdin").innerHTML = `LinkedIn: ${resumeData.linkdin || "Not Provided"}`;
    document.getElementById("location").innerHTML = `Location: ${resumeData.address || "Not Provided"}`;

    // Populate the education section
    document.getElementById("education").innerHTML = `Bachelors: ${resumeData.education.bachelor || "Not Provided"}`;
    document.getElementById("masters").innerHTML = `Masters: ${resumeData.education.masters || "Not Provided"}`;

    // Languages - render as a list
    renderList("lang", resumeData.languages);

    // Profile Description
    document.getElementById("profile").innerHTML = resumeData.profile || "No profile description provided.";

    // Experience
    document.getElementById("workExp").innerHTML = resumeData.workExp || "No work experience provided.";

    // Skills - render as a list
    renderList("skillsList", resumeData.skills);
  } else {
    alert("No resume data found in storage.");
  }

  // Add event listener for the download button
  const downloadButton = document.getElementById("submit");
  downloadButton.addEventListener("click", function () {
    downloadResume();
  });
});

// Helper function to render a list
function renderList(elementId, dataArray) {
  const listContainer = document.getElementById(elementId);
  if (dataArray && dataArray.length > 0) {
    // Create a <ul> element
    const ul = document.createElement("ul");
    dataArray.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
    listContainer.appendChild(ul);  // Append the <ul> to the container
  } else {
    const message = document.createElement("p");
    message.textContent = "No data available.";
    listContainer.appendChild(message);  // Append a message if there's no data
  }
}

// Function to download the resume as PDF using html2pdf
function downloadResume() {
  console.log('button clicked ')
  const element = document.querySelector(".main-container");  // The element to be converted into PDF

  const opt = {
    margin: [0, 0, 0, 0],  // No margins
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  
  // Generate the PDF using html2pdf
  html2pdf()
    .set(opt)
    .from(element)
    .save();  // This will trigger the download of the PDF
}
