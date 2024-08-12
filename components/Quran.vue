<template>
  <div class="book-container">
    <div class="book">
      <img
        alt=""
        src="https://rukminim2.flixcart.com/image/850/1000/xif0q/regionalbooks/f/r/4/al-quran-al-karim-saudi-in-arabic-language-indian-good-printed-original-imagmfmvv25x96yh.jpeg?q=90&crop=false"
      />
    </div>
  </div>
</template>

<style>
.book-container {
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
}

@keyframes initAnimation {
  0% {
    transform: rotateY(-8deg);
  }
  100% {
    transform: rotateY(-40deg);
  }
}

.book {
  width: 200px;
  height: 250px;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(-40deg);
  transition: 0.5s ease;
  animation: 1s ease 0s 1 initAnimation;
}

.book-container:hover .book,
.book-container:focus .book {
  transform: rotateY(-8deg);
}

.book > :first-child {
  position: absolute;
  top: 0;
  left: 0;
  background-color: red;
  width: 200px;
  height: 250px;
  transform: translateZ(25px);
  background-color: #050505;
  border-radius: 0 5px 5px 0;
  /* box-shadow: 5px 5px 20px #666; */
}

.book::before {
  position: absolute;
  content: " ";
  background-color: blue;
  left: 0;
  top: 10px;
  width: 48px;
  height: 230px;
  transform: translateX(165px) rotateY(90deg);
  background: linear-gradient(
    90deg,
    #fff 0%,
    #f9f9f9 5%,
    #fff 10%,
    #f9f9f9 15%,
    #fff 20%,
    #f9f9f9 25%,
    #fff 30%,
    #f9f9f9 35%,
    #fff 40%,
    #f9f9f9 45%,
    #fff 50%,
    #f9f9f9 55%,
    #fff 60%,
    #f9f9f9 65%,
    #fff 70%,
    #f9f9f9 75%,
    #fff 80%,
    #f9f9f9 85%,
    #fff 90%,
    #f9f9f9 95%,
    #fff 100%
  );
}

.book::after {
  position: absolute;
  top: 0;
  left: 0;
  content: " ";
  width: 200px;
  height: 250px;
  transform: translateZ(-25px);
  background-color: #050505;
  border-radius: 0 5px 5px 0;
  /* box-shadow: -10px 0 50px 10px #5b5b5b; */
}
</style>
