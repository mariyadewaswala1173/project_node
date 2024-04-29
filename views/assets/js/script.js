$(document).ready(function () {
  $('html,body').removeClass('loading');
});

// $(window).scroll(function(){
//   if ($(window).scrollTop() >= 300) {
//     $('.header').addClass('fixed-header');
//   }
//   else {
//     $('.header').removeClass('fixed-header');
//   }
// });

$(document).ready(function () {
  AOS.init();
  AOS.init({
    once: true
  })
});

$(document).ready(function () {
  window.onscroll = function () { scrollFunction() };
  $("#scrollTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
});

$(document).ready(function () {
  $(".navbar-toggler").click(function () {
    $("body").addClass("openMenu");
  });
  $(".overlay").click(function () {
    $("body").removeClass("openMenu");
  });
  $(".overlay").click(function () {
    $('.navbar-collapse').removeClass('show');
  });
});

$(document).on('click', 'a[href^="#"].got-id', function (event) {
  event.preventDefault();
  var _id = $(this).attr('href');
  if ($(_id).length == 0) {
    // window.location.href = '/'+document.location.hostname;
    window.location.href = 'index.php' + _id;
  }

  $('html, body').animate({
    scrollTop: $($.attr(this, 'href')).offset().top - 0
  }, 0);
});

$(document).on('click', 'a[href^="#"].got-id', function (event) {
  event.preventDefault();
  $('.navbar-collapse').removeClass('show');
  $('body').removeClass('openMenu');
});

function scrollFunction() {

  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    $('#scrollTop').show();
  } else {
    $('#scrollTop').hide();
  }
}

$('.spotlight_slid').owlCarousel({
  loop: true,
  items: 2,
  nav: true,
  dots: false,
  autoplay: true,
  smartSpeed: 300,
  slideSpeed: 2500,
  autoplaySpeed: 2500,
  paginationSpeed: 2500,
  autoplayHoverPause: true,
  margin: 30,
  responsive: {
    0: {
      items: 1,
      margin: 10,
    },
    490: {
      items: 2,
      margin: 10,
    },
    992: {
      items: 3,
      margin: 30,
    }
  }
});

$('.testimonial_slid').owlCarousel({
  loop: true,
  items: 2,
  nav: true,
  dots: false,
  autoplay: true,
  center: true,
  smartSpeed: 300,
  slideSpeed: 2500,
  autoplaySpeed: 2500,
  paginationSpeed: 2500,
  autoplayHoverPause: true,
  margin: 30,
  responsive: {
    0: {
      items: 1,
      margin: 10,
    },
    768: {
      items: 3,
      margin: 10,
    }
  }
});

$('.glry_slid').owlCarousel({
  loop: false,
  nav: false,
  dots: false,
  autoplay: true,
  smartSpeed: 300,
  slideSpeed: 2500,
  autoplaySpeed: 2500,
  paginationSpeed: 2500,
  autoplayHoverPause: true,
  margin: 0,
  responsive: {
    0: {
      items: 1,
      margin: 0,
    },
    490: {
      items: 2,
      margin: 0,
    },
    992: {
      items: 3,
      margin: 0,
    }
  }
});


$('#file-upload').change(function () {
  var filepath = this.value;
  var m = filepath.match(/([^\/\\]+)$/);
  var filename = m[1];
  $('#filename').html(filename);
});



function gotoStep(step) {
  // this.signup_spts = step;
  $('[data-signup-step]').hide();
  $('[data-signup-step=' + step + ']').fadeIn();
}


$(document).ready(function () {
  $(".business_list .cat_check > .form-check > i.icon").click(function () {
    $(".business_list .cat_check > .form-check").toggleClass("openCheck");
  });
});

$(document).ready(function () {
  $(".innr_header.header .search_form > span").click(function () {
    $(".innr_header.header .search_form ").toggleClass("openForm");
  });
});

$(document).ready(function () {
  $(".flt_left .closeasidebar").click(function () {
    $(".flt_left").toggleClass("showSidebar");
  });
});



function changeView(val){
  let adminActive = document.getElementsByClassName("adminActive");
  for(let i=0;i<adminActive.length; i++){
    if(val === adminActive[i].id){
      adminActive[i].classList.add("admin_show");
      adminActive[i].classList.remove("admin_hide");
    }
    else{
      adminActive[i].classList.remove("admin_show");
      adminActive[i].classList.add("admin_hide");
    }
  }
}