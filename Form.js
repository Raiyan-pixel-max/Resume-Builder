var _a;
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (e) {
    var _a;
    e.preventDefault();
    var name = document.getElementById("name").value.trim();
    var title = document.getElementById("title").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var location = document.getElementById("location").value.trim();
    var education = document.getElementById("education").value.trim();
    var experience = document.getElementById("experience").value.trim();
    var skillsInput = document.getElementById("skills").value.trim();
    var linksInput = document.getElementById("links").value.trim();
    var imageInput = document.getElementById("image");
    var imageFile = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (!name || !title || !email || !phone || !location || !education || !experience || !skillsInput || !linksInput) {
        alert("All fields are required.");
        return;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email.");
        return;
    }
    var phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        alert("Please enter a valid phone number (10 digits).");
        return;
    }
    var skills = skillsInput.split(",").map(function (skill) {
        var _a = skill.trim().split(":"), name = _a[0], level = _a[1];
        if (!name || !level || isNaN(Number(level)) || Number(level) < 0 || Number(level) > 100) {
            alert("Please enter valid skills in the format 'Skill:Level' (e.g., 'HTML:80').");
            throw new Error("Invalid skills format");
        }
        return "".concat(name, ":").concat(level);
    });
    var links = linksInput.split(",").map(function (link) { return link.trim(); });
    var linkPattern = /^(http|https):\/\/[^\s$.?#].[^\s]*$/gm;
    for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
        var link = links_1[_i];
        if (!linkPattern.test(link)) {
            alert("Invalid URL format: ".concat(link, ". Please provide a valid URL."));
            return;
        }
    }
    var image = "";
    if (imageFile) {
        var allowedImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!allowedImageTypes.includes(imageFile.type)) {
            alert("Please upload a valid image file (JPEG, PNG).");
            return;
        }
        var reader_1 = new FileReader();
        reader_1.onloadend = function () {
            image = reader_1.result;
            var resumeData = {
                name: name,
                title: title,
                email: email,
                phone: phone,
                location: location,
                education: education,
                experience: experience,
                skills: skills,
                links: links,
                image: image
            };
            localStorage.setItem("resumeData", JSON.stringify(resumeData));
            window.location.href = "resume.html";
        };
        reader_1.readAsDataURL(imageFile);
    }
    else {
        var resumeData = {
            name: name,
            title: title,
            email: email,
            phone: phone,
            location: location,
            education: education,
            experience: experience,
            skills: skills,
            links: links,
            image: ""
        };
        localStorage.setItem("resumeData", JSON.stringify(resumeData));
        window.location.href = "resume.html";
    }
});
