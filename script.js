
$(document).on("pagecreate", function () {
    // Auto-fill selected package when Book Now is clicked.
    $(".package-book").off("click.sarawak").on("click.sarawak", function () {
        var selected = $(this).data("package");
        setTimeout(function () {
            $("#tourPackage").val(selected).selectmenu("refresh");
        }, 250);
    });

    // Booking validation
    $("#bookingForm").off("submit.sarawak").on("submit.sarawak", function(e){
        e.preventDefault();
        $(".field-error,.success-message,.error-message").text("").hide();

        var ok=true;
        function err(id,msg){$("#"+id).text(msg).show();ok=false}
        var name=$("#bookingName").val().trim();
        var phone=$("#bookingPhone").val().trim();
        var email=$("#bookingEmail").val().trim();
        var date=$("#travelDate").val();
        var participants=parseInt($("#participants").val(),10);
        var pkg=$("#tourPackage").val();

        if(name.length<3) err("bookingNameError","Please enter your full name.");
        if(!/^[0-9+\\-\\s]{8,15}$/.test(phone)) err("bookingPhoneError","Please enter a valid phone number.");
        if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) err("bookingEmailError","Please enter a valid email.");
        if(!date) err("travelDateError","Please select a travel date.");
        if(!participants || participants<1 || participants>50) err("participantsError","Participants must be between 1 and 50.");
        if(!pkg) err("tourPackageError","Please select a tour package.");
        if(!$("#bookingConsent").prop("checked")) err("bookingConsentError","Please agree to the consent statement.");

        if(ok){
            $("#bookingSuccess").text("✓ Booking request submitted successfully!").show();
            this.reset();
            $("#tourPackage").val("").selectmenu("refresh");
        } else {
            $("#bookingGeneralError").text("Please correct the highlighted fields.").show();
        }
    });

    // Contact validation
    $("#contactForm").off("submit.sarawak").on("submit.sarawak", function(e){
        e.preventDefault();
        $(".field-error,.success-message,.error-message").text("").hide();
        var ok=true;
        function err(id,msg){$("#"+id).text(msg).show();ok=false}
        var name=$("#contactName").val().trim();
        var email=$("#contactEmail").val().trim();
        var message=$("#contactMessage").val().trim();
        if(name.length<3) err("contactNameError","Please enter your name.");
        if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) err("contactEmailError","Please enter a valid email.");
        if(message.length<10) err("contactMessageError","Please enter at least 10 characters.");
        if(!$("#contactConsent").prop("checked")) err("contactConsentError","Please agree to the consent statement.");
        if(ok){
            $("#contactSuccess").text("✓ Message sent successfully!").show();
            this.reset();
        } else {
            $("#contactGeneralError").text("Please correct the highlighted fields.").show();
        }
    });
});
