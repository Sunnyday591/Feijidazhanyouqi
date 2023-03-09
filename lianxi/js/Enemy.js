//敌机类
class Enemy extends Base{
    speed=1;
    blood=20; //敌机的血量
    islife=true;//记录敌机是否存活  true活得 false挂了
    integral=31;//分数
    constructor(x,y,width,height,img,context,speed=10,blood=100,integral=131){
        super(x,y,img,context,width,height);
        this.speed=speed;
        this.blood=blood;
        this.integral=integral; //分数
    }
    draw(){
        this.y+=this.speed;
        this.context.drawImage(this.img,this.x,this.y);
        if(this.y>this.height){
            this.islife=false;//当敌机的Y坐标超出可视区 那么让敌机消失
        }
    }
}