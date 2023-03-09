//定义我的飞机类，添加基本属性.
class MyPlane extends Base{
    hp=100;
    hpall=100;
    score=0;
    constructor(x,y,width,height,img,context){
        super(x,y,img,context,width,height);
        //如果初始化的时候 x ,y为0 那么重新计算下x,y让飞机停靠在下面中间
        if(x==0&&y==0){
            this.x=(width-120)/2;
            this.y=height-79;
        }
        let that=this;//给我的飞机对象this一个别名 that 方便在事件函数里面调用.
        document.onmousemove=function(e){//鼠标移动事件.冒泡
            // console.log(e.clientX,e.clientY); //获取鼠标相对于可视区的位置坐标
            let x1=that.x=e.clientX-60;//根据鼠标坐标计算出飞机的坐标
            let y1=that.y=e.clientY-40;
            that.jugePosition(x1,y1);
        }
        document.addEventListener("keydown",function(e){
            let x1=that.x,y1=that.y;//先拿到飞机坐标
            //根据按键 来改变飞机的坐标
            switch(e.code){
                case "ArrowLeft":
                    x1-=20;
                    break;
                case "ArrowRight":
                    x1+=20;
                    break;
                case "ArrowUp":
                    y1-=20;
                    break;
                case "ArrowDown":
                    y1+=20;
                    break;
                default:
            }
            that.jugePosition(x1,y1);
        });
    }
    jugePosition(x1,y1){//根据x,y坐标 判断是否符合要求 并赋值x,y坐标
        if(x1<0) x1=0; //我的飞机的x坐标不能小于0
        if(x1>this.width-120) x1=this.width-120;//我的飞机的x坐标不能大于屏幕宽度-飞机宽度
        if(y1<0) y1=0;//我的飞机的y坐标不能小于0 
        if(y1>this.height-79) y1=this.height-79;//我的飞机的y坐标不能大于屏幕高都-飞机高度
        this.x=x1;
        this.y=y1;
    }   
    draw(){
        if(this.hp<=0){
            this.context.globalAlpha=0.5;
        }else{
            this.context.globalAlpha=1;
        }
        //把我的飞机绘制在画布上
        this.context.drawImage(this.img,this.x,this.y);
        this.context.globalAlpha=1;
        this.context.strokeStyle="red";
        this.context.lineWidth=1;
        this.context.strokeRect(73,30,300,15);
        if(this.hp<=0){
            this.hp=0;
            return;
        }
        this.context.fillStyle="red";
        let hpwidth=(this.hp/this.hpall)*300;
        this.context.fillRect(73,30,hpwidth,15);

        

        

        
    }
}