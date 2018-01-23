<template>
  <div :style="styleObjectWrapper" ref="imgWrapper" @mouseover="onMouseOver">
    <div :style="styleObjectImg" @mousedown="onMouseDown" @mousemove="onMouseMove($event)" @mouseup="onMouseUp" @mouseout="onMouseOut" @dragstart="onDragStart" @mouseover="onMouseOver" @wheel.prevent.stop="onScroll">
    </div>
    <span v-show="onMouseOverFlag" :style="styleObjectHandle" @mouseover="onMouseOver" @mouseout="onMouseOut">
      <i class="rotate rotate-left" @click="rotateLeft"></i>
      <i class="rotate rotate-right" @click="rotateRight"></i>
    </span>
  </div>
</template>
<script>
export default {
  name: "imgView",
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    background: {
      type: String,
      default: '#F2F2F2'
    }
  },
  data () {
    return {
      computedHeight: "",
      computedWidth: "",
      imgWidth: 0,
      imgHeight: 0,
      onMouseDownFlag: false,
      onMouseOverFlag: false,
      styleObjectWrapper: {
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: this.background
      },
      styleObjectImg: {
        backgroundImage: "",
        backgroundRepeat: "no-repeat",
        backgroundSize: "0px 0px",
        cursor: "move",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        transform: "rotate(0deg)",
        transformOrigin: "center",
        position: "absolute"
      },
      styleObjectHandle: {
        textAlign: "center",
        position: "absolute",
        right: "10px",
        bottom: "10px"
      }
    };
  },
  watch: {
    imgUrl () {
      let vm = this;
      vm.$nextTick(function () {
        let imgWrapper = vm.$refs.imgWrapper
        vm.styleObjectImg.backgroundImage = "url(" + vm.imgUrl + ")";
        vm.init().then(() => {
          vm.$nextTick(function () {
            vm.computedHeight = imgWrapper.offsetHeight;
            vm.computedWidth = imgWrapper.offsetWidth;
            if (vm.computedHeight / vm.computedWidth < vm.imgHeight / vm.imgWidth) {
              vm.imgWidth = vm.imgWidth * vm.computedHeight / vm.imgHeight
              vm.imgHeight = vm.computedHeight
            } else {
              vm.imgHeight = vm.imgHeight * vm.computedWidth / vm.imgWidth
              vm.imgWidth = vm.computedWidth
            }
            vm.styleObjectImg.backgroundImage = "url(" + vm.imgUrl + ")";
            vm.styleObjectImg.transform = "rotate(0deg)";
            vm.styleObjectImg.width = vm.computedWidth + 'px';
            vm.styleObjectImg.height = vm.computedHeight + 'px';
            vm.styleObjectImg.left = '0px';
            vm.styleObjectImg.top = '0px';
            vm.styleObjectImg.backgroundSize = vm.imgWidth + "px " + vm.imgHeight + "px";
            vm.styleObjectImg.backgroundPosition = (vm.computedWidth - vm.imgWidth) / 2 + "px " + (vm.computedHeight - vm.imgHeight) / 2 + "px";
          });
        })
      });
    }
  },
  mounted () {
    let vm = this;
    let imgWrapper = vm.$refs.imgWrapper
    vm.init().then(() => {
      vm.$nextTick(function () {
        vm.computedHeight = imgWrapper.offsetHeight;
        vm.computedWidth = imgWrapper.offsetWidth;
        if (vm.computedHeight / vm.computedWidth < vm.imgHeight / vm.imgWidth) {
          vm.imgWidth = vm.imgWidth * vm.computedHeight / vm.imgHeight
          vm.imgHeight = vm.computedHeight
        } else {
          vm.imgHeight = vm.imgHeight * vm.computedWidth / vm.imgWidth
          vm.imgWidth = vm.computedWidth
        }
        vm.styleObjectImg.backgroundImage = "url(" + vm.imgUrl + ")";
        vm.styleObjectImg.transform = "rotate(0deg)";
        vm.styleObjectImg.width = vm.computedWidth + 'px';
        vm.styleObjectImg.height = vm.computedHeight + 'px';
        vm.styleObjectImg.left = '0px';
        vm.styleObjectImg.top = '0px';
        vm.styleObjectImg.backgroundSize = vm.imgWidth + "px " + vm.imgHeight + "px";
        vm.styleObjectImg.backgroundPosition = (vm.computedWidth - vm.imgWidth) / 2 + "px " + (vm.computedHeight - vm.imgHeight) / 2 + "px";
      });
    })
  },
  updated () {
    let vm = this
    if (parseInt(this.computedWidth) === 0) {
      let imgWrapper = vm.$refs.imgWrapper;
      vm.init().then(() => {
        vm.$nextTick(function () {
          vm.computedHeight = imgWrapper.offsetHeight;
          vm.computedWidth = imgWrapper.offsetWidth;
          if (vm.computedHeight / vm.computedWidth < vm.imgHeight / vm.imgWidth) {
            vm.imgWidth = vm.imgWidth * vm.computedHeight / vm.imgHeight
            vm.imgHeight = vm.computedHeight
          } else {
            vm.imgHeight = vm.imgHeight * vm.computedWidth / vm.imgWidth
            vm.imgWidth = vm.computedWidth
          }
          vm.styleObjectImg.backgroundImage = "url(" + vm.imgUrl + ")";
          vm.styleObjectImg.backgroundSize = vm.imgWidth + "px " + vm.imgHeight + "px";
          vm.styleObjectImg.backgroundPosition = (vm.computedWidth - vm.imgWidth) / 2 + "px " + (vm.computedHeight - vm.imgHeight) / 2 + "px";
        });
      })
    }
  },
  methods: {
    init () {
      let vm = this;
      return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = vm.imgUrl;
        img.onload = function () {
          vm.imgWidth = img.width
          vm.imgHeight = img.height
          resolve()
        };
      })
    },
    onMouseDown () {
      this.onMouseDownFlag = true;
    },
    onMouseUp () {
      this.onMouseDownFlag = false;
    },
    onMouseOver () {
      this.onMouseOverFlag = true;
    },
    onMouseOut () {
      this.onMouseOverFlag = false;
      this.onMouseDownFlag = false;
    },
    onMouseMove (e) {
      if (this.onMouseDownFlag) {
        var e = e || window.event;
        if (this.styleObjectImg.backgroundPosition) {
          var rotate =
            parseInt(this.styleObjectImg.transform.split("(")[1]) % 360;
          if (rotate < 0) {
            rotate += 360;
          }
          if (rotate % 360 == 0) {
            var x =
              parseInt(this.styleObjectImg.backgroundPosition.split(" ")[0]) +
              e.movementX;
            var y =
              parseInt(this.styleObjectImg.backgroundPosition.split(" ")[1]) +
              e.movementY;
          } else if (rotate % 270 == 0) {
            var x =
              parseInt(this.styleObjectImg.backgroundPosition.split(" ")[0]) -
              e.movementY;
            var y =
              parseInt(this.styleObjectImg.backgroundPosition.split(" ")[1]) +
              e.movementX;
          } else if (rotate % 180 == 0) {
            var x =
              parseInt(this.styleObjectImg.backgroundPosition.split(" ")[0]) -
              e.movementX;
            var y =
              parseInt(this.styleObjectImg.backgroundPosition.split(" ")[1]) -
              e.movementY;
          } else if (rotate % 90 == 0) {
            var x =
              parseInt(this.styleObjectImg.backgroundPosition.split(" ")[0]) +
              e.movementY;
            var y =
              parseInt(this.styleObjectImg.backgroundPosition.split(" ")[1]) -
              e.movementX;
          }
          this.styleObjectImg.backgroundPosition = x + "px " + y + "px";
        } else {

          this.styleObjectImg.backgroundPosition = (this.computedWidth - this.imgWidth) / 2 + "px " + (this.computedHeight - this.imgHeight) / 2 + "px";
        }
      }
    },
    onScroll (e) {
      var e = e || window.event;
      let backgroundSizeX = parseFloat(this.styleObjectImg.backgroundSize.split(" ")[0]);
      let backgroundSizeY = parseFloat(this.styleObjectImg.backgroundSize.split(" ")[1]);
      let positionX = parseFloat(this.styleObjectImg.backgroundPosition.split(" ")[0]);
      let positionY = parseFloat(this.styleObjectImg.backgroundPosition.split(" ")[1]);
      if (e.deltaY < 0) {
        this.styleObjectImg.backgroundSize = backgroundSizeX * 1.1 + "px " + backgroundSizeY * 1.1 + "px";
        let x = (backgroundSizeX - backgroundSizeX * 1.1) / 2 + positionX
        let y = (backgroundSizeY - backgroundSizeY * 1.1) / 2 + positionY
        this.styleObjectImg.backgroundPosition = x + 'px ' + y + 'px'
      } else {
        this.styleObjectImg.backgroundSize = backgroundSizeX / 1.1 + "px " + backgroundSizeY / 1.1 + "px";
        let x = (backgroundSizeX - backgroundSizeX / 1.1) / 2 + positionX
        let y = (backgroundSizeY - backgroundSizeY / 1.1) / 2 + positionY
        this.styleObjectImg.backgroundPosition = x + 'px ' + y + 'px'
      }
    },
    rotateLeft () {
      let vm = this
      let backgroundSizeX = parseInt(this.styleObjectImg.backgroundSize.split(" ")[0]);
      let backgroundSizeY = parseInt(this.styleObjectImg.backgroundSize.split(" ")[1]);
      let positionX = parseInt(vm.styleObjectImg.backgroundPosition.split(" ")[0]);
      let positionY = parseInt(vm.styleObjectImg.backgroundPosition.split(" ")[1]);
      var r = (parseInt(vm.styleObjectImg.transform.split("(")[1]) - 90) % 360;
      if (r < 0) { r += 360 }
      vm.styleObjectImg.transform = "rotate(" + r + "deg)";
      if (r % 180 == 90) {
        vm.styleObjectImg.width = vm.computedHeight + 'px';
        vm.styleObjectImg.height = vm.computedWidth + 'px';
        vm.styleObjectImg.left = Math.abs(parseInt(vm.computedHeight) - parseInt(vm.computedWidth)) / 2 + 'px';
        vm.styleObjectImg.top = (vm.computedHeight - vm.computedWidth) / 2 + 'px';
        if (vm.computedHeight / vm.computedWidth < vm.imgWidth / vm.imgHeight) {
          vm.imgHeight = vm.imgHeight * vm.computedHeight / vm.imgWidth
          vm.imgWidth = vm.computedHeight
        } else {
          vm.imgWidth = vm.imgWidth * vm.computedWidth / vm.imgHeight
          vm.imgHeight = vm.computedWidth
        }
        vm.styleObjectImg.backgroundSize = vm.imgWidth + "px " + vm.imgHeight + "px";
        vm.styleObjectImg.backgroundPosition = (vm.computedHeight - vm.imgWidth) / 2 + "px " + (vm.computedWidth - vm.imgHeight) / 2 + "px";
      } else {
        vm.styleObjectImg.width = vm.computedWidth + 'px';
        vm.styleObjectImg.height = vm.computedHeight + 'px';
        vm.styleObjectImg.left = '0px';
        vm.styleObjectImg.top = '0px';
        if (vm.computedHeight / vm.computedWidth < vm.imgHeight / vm.imgWidth) {
          vm.imgWidth = vm.imgWidth * vm.computedHeight / vm.imgHeight
          vm.imgHeight = vm.computedHeight
        } else {
          vm.imgHeight = vm.imgHeight * vm.computedWidth / vm.imgWidth
          vm.imgWidth = vm.computedWidth
        }
        vm.styleObjectImg.backgroundSize = vm.imgWidth + "px " + vm.imgHeight + "px";
        vm.styleObjectImg.backgroundPosition = (vm.computedWidth - vm.imgWidth) / 2 + "px " + (vm.computedHeight - vm.imgHeight) / 2 + "px";
      }
    },
    rotateRight () {
      let vm = this
      let backgroundSizeX = parseInt(this.styleObjectImg.backgroundSize.split(" ")[0]);
      let backgroundSizeY = parseInt(this.styleObjectImg.backgroundSize.split(" ")[1]);
      var r = (parseInt(vm.styleObjectImg.transform.split("(")[1]) + 90) % 360;
      if (r < 0) { r += 360 }
      vm.styleObjectImg.transform = "rotate(" + r + "deg)";
      if (r % 180 == 90) {
        vm.styleObjectImg.width = vm.computedHeight + 'px';
        vm.styleObjectImg.height = vm.computedWidth + 'px';
        vm.styleObjectImg.left = Math.abs(parseInt(vm.computedHeight) - parseInt(vm.computedWidth)) / 2 + 'px';
        vm.styleObjectImg.top = (vm.computedHeight - vm.computedWidth) / 2 + 'px';
        if (vm.computedHeight / vm.computedWidth < vm.imgWidth / vm.imgHeight) {
          vm.imgHeight = vm.imgHeight * vm.computedHeight / vm.imgWidth
          vm.imgWidth = vm.computedHeight
        } else {
          vm.imgWidth = vm.imgWidth * vm.computedWidth / vm.imgHeight
          vm.imgHeight = vm.computedWidth
        }
        vm.styleObjectImg.backgroundSize = vm.imgWidth + "px " + vm.imgHeight + "px";
        vm.styleObjectImg.backgroundPosition = (vm.computedHeight - vm.imgWidth) / 2 + "px " + (vm.computedWidth - vm.imgHeight) / 2 + "px";
      } else {
        vm.styleObjectImg.width = vm.computedWidth + 'px';
        vm.styleObjectImg.height = vm.computedHeight + 'px';
        vm.styleObjectImg.left = '0px';
        vm.styleObjectImg.top = '0px';
        if (vm.computedHeight / vm.computedWidth < vm.imgHeight / vm.imgWidth) {
          vm.imgWidth = vm.imgWidth * vm.computedHeight / vm.imgHeight
          vm.imgHeight = vm.computedHeight
        } else {
          vm.imgHeight = vm.imgHeight * vm.computedWidth / vm.imgWidth
          vm.imgWidth = vm.computedWidth
        }
        vm.styleObjectImg.backgroundSize = vm.imgWidth + "px " + vm.imgHeight + "px";
        vm.styleObjectImg.backgroundPosition = (vm.computedWidth - vm.imgWidth) / 2 + "px " + (vm.computedHeight - vm.imgHeight) / 2 + "px";
      }

    },
    onDragStart () {
      return false;
    }
  }
};
</script>
<style scoped>
.rotate {
  height: 20px;
  width: 20px;
  display: inline-block;
  position: relative;
  margin: 3px 10px;
  border: 3px solid #6495ed;
  border-radius: 100%;
}
.rotate:before {
  content: '';
  width: 0;
  height: 0;
  display: inline-block;
  border-top: 7px solid #6495ed;
  border-right: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid transparent;
  position: absolute;
}
.rotate-left {
  border-left-color: transparent;
}
.rotate-left:before {
  left: -10px;
  top: -1px;
  transform: rotate(45deg);
}
.rotate-left:hover {
  border: 3px solid #00bfff;
  border-left-color: transparent;
}
.rotate-left:hover:before {
  border-top: 7px solid #00bfff;
}
.rotate-right {
  border-right-color: transparent;
}
.rotate-right:before {
  right: -10px;
  top: -1px;
  transform: rotate(-45deg);
}
.rotate-right:hover {
  border: 3px solid #00bfff;
  border-right-color: transparent;
}
.rotate-right:hover:before {
  border-top: 7px solid #00bfff;
}
</style>
