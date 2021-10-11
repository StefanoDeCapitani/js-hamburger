const hamburgerBtn = document.querySelector(".header-right > a");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const closeBtn = document.querySelector(".close");

hamburgerBtn.addEventListener("click", function () {
  hamburgerMenu.classList.add("active");
});

closeBtn.addEventListener("click", function () {
  hamburgerMenu.classList.remove("active");
});

/**/

const navList = document.querySelectorAll(
  ".header-right li:nth-last-child(n+1)"
);
let mouseDirection = "left";
let oldx = 0;
let oldy = 0;

detectMouseDirection = function (e) {
  horizontalOffset = e.pageX - oldx;
  verticalOffset = e.pageY - oldy;
  changeMouseDirection(horizontalOffset, verticalOffset);
  if (!(e.pageX === 0 && e.pageY === 0)) {
    oldx = e.pageX;
    oldy = e.pageY;
  }
};

function changeMouseDirection(horizontalOffset, verticalOffset) {
  if (Math.abs(horizontalOffset) >= Math.abs(verticalOffset)) {
    if (horizontalOffset > 0) {
      direction = "right";
    } else {
      direction = "left";
    }
  } else {
    if (verticalOffset > 0) {
      direction = "down";
    } else {
      direction = "up";
    }
  }
}

changeBorderStartPosition = function (e) {
  mousex = e.pageX;
  mousey = e.pageY;
  notHoveredNavList = document.querySelectorAll(
    ".header-right li:nth-last-child(n+1):not(:hover)"
  );
  notHoveredNavList.forEach((el) => {
    setNavListBorderInitialWidth(el);
  });
};

function setNavListBorderInitialWidth(el) {
  let elCoord = el.getBoundingClientRect();
  if (mousex < elCoord["left"] || mousex > elCoord["right"]) {
    if (mousex < elCoord["left"]) {
      setElementBorderBottomWidth(el, "0", "100%");
    }
    if (mousex > elCoord["right"]) {
      setElementBorderBottomWidth(el, "100%", "0");
    }
  } else {
    setElementBorderBottomWidth(el, "50%", "50%");
  }
}

function navListHoverBorderEffect(el) {
  el.addEventListener("mouseover", function () {
    setElementBorderBottomWidth(el, "0", "0");
  });
  el.addEventListener("mouseout", function () {
    setElementBorderBottomWidthAccordingToMouseDirection(el);
  });
}

function setElementBorderBottomWidth(el, left, right) {
  el.style.setProperty("--after-left", left);
  el.style.setProperty("--after-right", right);
}

function setElementBorderBottomWidthAccordingToMouseDirection(el) {
  if (direction === "left") {
    setElementBorderBottomWidth(el, "0", "100%");
  }
  if (direction === "right") {
    setElementBorderBottomWidth(el, "100%", "0");
  }
  if (direction === "up" || direction === "down") {
    setElementBorderBottomWidth(el, "50%", "50%");
  }
}

window.addEventListener("mousemove", changeBorderStartPosition);

navList.forEach((el) => {
  el.addEventListener("mousemove", detectMouseDirection);
});

navList.forEach((el) => {
  navListHoverBorderEffect(el);
});
