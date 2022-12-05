if (localStorage.getItem("width") != null) {
    //takes saved data, allows to reload
    document.querySelectorAll(".leftRewardBamboo")[0].innerHTML =
        localStorage.getItem("leftBambooFinal0");
    document.querySelectorAll(".leftRewardBamboo")[1].innerHTML =
        localStorage.getItem("leftBambooFinal1");
    document.querySelectorAll(".leftRewardBlack")[0].innerHTML =
        localStorage.getItem("leftBlackFinal0");
    document.querySelectorAll(".leftRewardBlack")[1].innerHTML =
        localStorage.getItem("leftBlackFinal1");
    document.getElementById("paid").innerHTML =
        localStorage.getItem("moneyFinal");
    document.getElementById("beckers").innerHTML =
        localStorage.getItem("backerFinal");
    document.getElementById("fillBar").style.width =
        localStorage.getItem("width");
}
if (localStorage.getItem("bookmarkFinal") != null) {
    document.getElementById("bookmark").innerHTML =
        localStorage.getItem("bookmarkFinal");
    if (document.getElementById("bookmark").innerHTML !=
        `<img src="./images/icon-bookmark.svg">Bookmark`) {
        document.getElementById("bookmark").classList.add("bookmarked");
    }
}
const bookmark = document.getElementById("bookmark");
const reward = document.querySelectorAll(".reward");
const back = document.getElementById("back");
const modal = document.querySelector("#selection");
const hide = document.getElementById("x");
const choose = document.querySelectorAll(".text h4");
const radio = document.querySelectorAll(".radio div");
const setMoney = document.querySelectorAll(".amount");
const apply = document.querySelectorAll(".continue");
const money = document.querySelectorAll("input");
const selected = document.querySelectorAll(".choose");
const alreadyPaid = document.getElementById("paid");
const success = document.getElementById("success");
const succesBtn = document.getElementById("successBtn");
const backers = document.getElementById("beckers");
const leftBamboo = document.querySelectorAll(".leftRewardBamboo");
const leftBlack = document.querySelectorAll(".leftRewardBlack");
const progress = document.getElementById("fillBar");
bookmark.addEventListener("click", function bookmarkFnc() {
    //adds or removes ed to bookmark button and also changes color
    bookmark.classList.toggle("bookmarked"); //toogle class
    if (bookmark.classList.contains("bookmarked")) {
        bookmark.innerHTML = `${bookmark.innerHTML}ed`; //adds ed at the end of innerHTML
    }
    else if (bookmark.classList.contains("bookmarked") == false) {
        //if false "deletes" ed from end
        bookmark.innerHTML = `<img src="./images/icon-bookmark.svg">Bookmark`;
    }
    localStorage.setItem("bookmarkFinal", bookmark.innerHTML); //saves inner html
});
localStorage.setItem("bookmarkFinal", bookmark.innerHTML);
const showModal = () => {
    //shows modal
    modal.style.display = "flex";
    const appear = () => {
        modal.style.opacity = "1";
    };
    setTimeout(appear, 30); //allows to slightly appear on page
};
back.addEventListener("click", showModal);
reward.forEach((item) => {
    item.addEventListener("click", showModal);
});
hide.addEventListener("click", function close() {
    //hides modal
    modal.style.opacity = "0";
    const hide = () => {
        modal.style.display = "none";
    };
    setTimeout(hide, 300); //allows to slightly disappear on page
    choose.forEach((item) => item.classList.remove("selectedFor")); //removes class from all items
    Select();
});
const Select = () => {
    //toggle selectors
    for (let i = 0; i < 3; i++) {
        //iterates through every chooose and if it have said class it appear or disappear
        if (choose[i].classList.contains("selectedFor")) {
            radio[i].classList.add("selected");
            setMoney[i].style.display = "flex";
            selected[i].style.border = "2px solid var(--primary-color1)";
            const appear = () => {
                setMoney[i].style.opacity = "1";
            };
            setTimeout(appear, 30);
        }
        else {
            radio[i].classList.remove("selected");
            setMoney[i].style.opacity = "0";
            setMoney[i].style.display = "none";
            selected[i].style.border = "1px solid hsl(0, 0%, 81%)";
            money.forEach((item) => {
                item.value = ""; //resets input value
            });
        }
    }
};
choose.forEach((item) => {
    //adds class selectedFor
    item.addEventListener("click", (event) => {
        choose.forEach((object) => {
            object.classList.remove("selectedFor");
        });
        item.classList.add("selectedFor");
        Select();
    });
});
const paidValue = alreadyPaid.innerHTML;
const backersValue = backers.innerHTML;
let result = "";
let left = " ";
for (let i = 0; i < paidValue.length; i++) {
    //takes numbers from paid value
    if (paidValue[i] != "," && paidValue[i] != "$") {
        result += Number(paidValue[i]);
    }
}
for (let i = 0; i < backersValue.length; i++) {
    //takes numbers from backers
    if (backersValue[i] != ",") {
        left += backersValue[i];
    }
}
const progressBar = () => {
    progress.style.width = `${Number(result) / 1000}%`; //calculates width of progress bar
};
const addToMoney = (nr) => {
    result = String(Number(result) + Number(money[nr].value)); //adds amount of number from input and sets it to variable
    let firstHalf = "";
    let secondHalf = "";
    if (result.toString().length == 5) {
        //slices string of exact length to add "," between sliced elements
        firstHalf = result.toString().slice(0, 2);
        secondHalf = result.toString().slice(2);
    }
    else {
        firstHalf = result.toString().slice(0, 3);
        secondHalf = result.toString().slice(3);
    }
    alreadyPaid.innerHTML = `$${firstHalf},${secondHalf}`; //connects everyting and returns on page
    progressBar();
};
const addToBackers = () => {
    left = String(Number(left) + 1); //add number of backers
    let firstHalf = left.toString().slice(0, 1); //allows to add "," between numbers
    let secondHalf = left.toString().slice(1);
    backers.innerHTML = `${firstHalf},${secondHalf}`;
};
const getMoney = (nr) => {
    //takes actual value and adds from input
    addToMoney(nr);
    const hide = () => {
        modal.style.display = "none";
    };
    setTimeout(hide, 300);
    modal.style.opacity = "0";
    choose.forEach((item) => item.classList.remove("selectedFor"));
    Select();
    success.style.display = "flex";
    const appear = () => {
        success.style.opacity = "1";
    };
    setTimeout(appear, 300);
    addToBackers();
};
const leftDown = (nr) => {
    //decrease number of items left
    if (nr == 1) {
        leftBamboo.forEach((item) => {
            let number = Number(item.innerHTML);
            item.innerHTML = String(number - 1);
        });
    }
    else {
        leftBlack.forEach((item) => {
            let number = Number(item.innerHTML);
            item.innerHTML = String(number - 1);
        });
    }
    localStorage.setItem("leftBambooFinal0", leftBamboo[0].innerHTML);
    localStorage.setItem("leftBambooFinal1", leftBamboo[1].innerHTML);
    localStorage.setItem("leftBlackFinal0", leftBlack[0].innerHTML);
    localStorage.setItem("leftBlackFinal1", leftBlack[1].innerHTML);
};
apply.forEach((item) => {
    //adds money
    item.addEventListener("click", (event) => {
        if (money[0].value != "") {
            getMoney(0);
        }
        else if (money[1].value >= "25") {
            getMoney(1);
            leftDown(1);
        }
        else if (money[2].value >= "75") {
            getMoney(2);
            leftDown(2);
        }
        localStorage.setItem("moneyFinal", alreadyPaid.innerHTML);
        localStorage.setItem("backerFinal", backers.innerHTML);
        localStorage.setItem("width", progress.style.width);
    });
});
succesBtn.addEventListener("click", function close() {
    //hides
    success.style.opacity = "0";
    const hide = () => {
        success.style.display = "none";
    };
    setTimeout(hide, 300);
});
const nav = document.getElementById("nav");
const hamburger = document.getElementById("hamburger");
const closeMenu = document.getElementById("closeMenu");
closeMenu.addEventListener("click", (closeMen) => {
    nav.style.opacity = "0";
    const hide = () => {
        nav.style.display = "none";
    };
    setTimeout(hide, 300);
    closeMenu.style.display = "none";
    hamburger.style.display = "flex";
});
hamburger.addEventListener("click", (showMen) => {
    nav.style.display = "flex";
    const show = () => {
        nav.style.opacity = "1";
    };
    setTimeout(show, 30);
    closeMenu.style.display = "flex";
    hamburger.style.display = "none";
});
