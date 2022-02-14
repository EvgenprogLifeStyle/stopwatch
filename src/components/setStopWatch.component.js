import { Component } from "../core/component";

export class controlStopwatch extends Component {
   constructor(id) {
      super(id);
   }
   init() {
      this.$time = document.getElementById("time");

      this.st = 0; //id setInterval

      // Кнопки в шапке
      document.getElementById("start").addEventListener("click", start.bind(this));
      document.getElementById("stop").addEventListener("click", this.stop.bind(this));
      document.getElementById("reset").addEventListener("click", this.reset.bind(this));
      document.getElementById("circle").addEventListener("click", this.add.bind(this));

      this.$controlsBtn = document.querySelectorAll(".controls__item");
      this.$id.addEventListener("click", this.active.bind(this));

      this.up();
   }
   // Данные json в localStorage
   local() {
      return localStorage.getItem("stopwatchList");
   }
   // Обнуление секундомера
   null() {
      clearInterval(this.st);
      this.$time.innerHTML = `00:00:00`;
   }

   // Оставновка секундомера
   stop() {
      clearInterval(this.st);
   }

   // Сброс секундомера
   reset() {
      this.null();
      document.getElementById("start").removeAttribute("disabled");
      this.$time.innerHTML = `00:00:00`;
   }

   // Добавление круга
   add(event) {
      if (this.$time.textContent != "00:00:00") {
         let list = JSON.parse(this.local());
         const arrTime = this.$time.textContent;

         list != "" ? list.push({ time: arrTime }) : (list = [{ time: arrTime }]);
         localStorage.setItem("stopwatchList", JSON.stringify(list));

         this.up();
      } else {
         alert("Friend, don't rush :)");
      }
   }

   // Обновление списка
   up() {
      let dataLocal = JSON.parse(this.local());
      let listTime = document.querySelector(".stopwatch__list");
      if (dataLocal.length == 0 || dataLocal.length == "") {
         listTime.innerHTML = "The list is empty";
      } else {
         listTime.innerHTML = "";

         let number = 0;
         dataLocal.forEach((item) => {
            number++;
            let item1 = `<li data-id="${number - 1}">${number} Circle: ${item.time}<div class="_del"></div></li>`;
            listTime.insertAdjacentHTML("afterbegin", item1);
         });
      }
   }

   // Проверка клика по кнопкам с добавлением класса _active
   active(event) {
      const el = event.target;

      if (el.classList.contains("controls__item")) {
         this.$controlsBtn.forEach((item) => {
            item.classList.remove("_active");
         });
         el.classList.add("_active");
      }
      // Удаление
      if (el.classList.contains("_del")) {
         let list = JSON.parse(this.local());
         list.splice([el.parentElement.dataset.id], 1);
         localStorage.setItem("stopwatchList", JSON.stringify(list));
         this.up();
      }
   }
}

function start() {
   let sec = 0;
   let min = 0;
   let ch = 0;
   clearInterval(this.st);
   document.getElementById("time").innerHTML = `00:00:00`;

   function time() {
      sec++;
      if (sec < 60) {
         sec <= 9 ? (sec = "0" + sec) : sec;
      } else if (min < 60) {
         sec = 0;
         min++;
         min <= 9 ? (min = "0" + min) : min;
      } else if (ch < 24) {
         ch++;
         sec = 0;
         min = 0;
         ch <= 9 ? (ch = "0" + ch) : ch;
      }
      if (!sec) {
         sec = "00";
      }
      if (!min) {
         min = "00";
      }
      if (!ch) {
         ch = "00";
      }
      return (document.getElementById("time").innerHTML = `${sec}:${min}:${ch}`);
   }
   this.st = setInterval(time, 1000);
}
