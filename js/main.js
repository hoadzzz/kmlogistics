(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").css("top", "0px");
    } else {
      $(".sticky-top").css("top", "-100px");
    }
  });

  // Dropdown on mouse hover
  const $dropdown = $(".dropdown");
  const $dropdownToggle = $(".dropdown-toggle");
  const $dropdownMenu = $(".dropdown-menu");
  const showClass = "show";

  $(window).on("load resize", function () {
    if (this.matchMedia("(min-width: 992px)").matches) {
      $dropdown.hover(
        function () {
          const $this = $(this);
          $this.addClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "true");
          $this.find($dropdownMenu).addClass(showClass);
        },
        function () {
          const $this = $(this);
          $this.removeClass(showClass);
          $this.find($dropdownToggle).attr("aria-expanded", "false");
          $this.find($dropdownMenu).removeClass(showClass);
        }
      );
    } else {
      $dropdown.off("mouseenter mouseleave");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000,
  });

  // Header carousel
  $(".header-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1500,
    items: 1,
    dots: false,
    loop: true,
    nav: true,
    navText: [
      '<i class="bi bi-chevron-left"></i>',
      '<i class="bi bi-chevron-right"></i>',
    ],
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: false,
    smartSpeed: 1000,
    center: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

// function formSubmitted() {
//   // Hiển thị trạng thái đang gửi
//   const submitButton = document.querySelector('button[type="submit"]');
//   submitButton.disabled = true;
//   submitButton.textContent = "Đang gửi...";

//   setTimeout(function () {
//     alert("Gửi thành công! Cảm ơn bạn đã liên hệ.");

//     // Reset lại nút
//     submitButton.disabled = false;
//     submitButton.textContent = "Submit";

//     // Reset form nếu cần
//     const form = document.getElementById("your-form-id");
//     if (form) form.reset();
//   }, 1000); // delay lâu hơn một chút để chắc chắn iframe xử lý xong
// }

let formSubmittedTimeout;

function formSubmitted() {
  const submitButton = document.querySelector('button[type="submit"]');
  const iframe = document.getElementById("hidden_iframe");
  const form = document.getElementById("form-quote");

  if (!submitButton || !iframe || !form) {
    console.error("Thiếu phần tử cần thiết trong DOM.");
    return false;
  }

  // Lấy các trường input
  const name = form.querySelector('input[name="entry.1944530592"]');
  const email = form.querySelector('input[name="entry.1408216351"]');
  const phone = form.querySelector('input[name="entry.134124479"]');

  // Kiểm tra input rỗng
  if (!name.value.trim() || !email.value.trim() || !phone.value.trim()) {
    alert("Please fill out fields before request.");
    return false; // Ngăn gửi form
  }

  // Hiển thị trạng thái đang gửi
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  // Xử lý thành công
  iframe.onload = function () {
    clearTimeout(formSubmittedTimeout);
    alert("Sent successfully! Thank you for contact.");
    submitButton.disabled = false;
    submitButton.textContent = "Send Request";
    form.reset();
  };

  // Xử lý thất bại sau 5 giây
  formSubmittedTimeout = setTimeout(function () {
    iframe.onload = null;
    alert("Failed to send. Please try again later.");
    submitButton.disabled = false;
    submitButton.textContent = "Send Request";
  }, 5000);

  return true; // Cho phép form gửi
}

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("language-toggle");

  if (!toggle) return;

  // Xác định nếu đang ở trang VN (có /vn/ trong path)
  const isVN = window.location.pathname.startsWith("/vn/");
  toggle.checked = isVN;

  // Khôi phục trạng thái toggle từ localStorage nếu có
  const savedLang = localStorage.getItem("lang");
  if (savedLang === "vn") toggle.checked = true;
  if (savedLang === "en") toggle.checked = false;

  toggle.addEventListener("change", () => {
    const currentPath = window.location.pathname;
    let targetPath = "";

    if (toggle.checked) {
      // Chuyển sang tiếng Việt
      if (!isVN) {
        targetPath = "/vn" + currentPath;
        localStorage.setItem("lang", "vn");
      }
    } else {
      // Chuyển sang tiếng Anh
      if (isVN) {
        targetPath = currentPath.replace("/vn", "");
        localStorage.setItem("lang", "en");
      }
    }

    // Nếu có path mới, chuyển trang
    if (targetPath && targetPath !== currentPath) {
      window.location.href = targetPath;
    }
  });
});
