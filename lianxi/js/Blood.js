class Blood extends Base{
    speed=1;
    blood=100;
    islife=true;//记录敌机是否存活  true活得 false挂了
    blooding=30;//加血量
    constructor(x,y,width,height,img,context,speed=10,blood=100){
        super(x,y,img,context,width,height);
        this.speed=speed;
        this.blood=blood;
        
    }
    draw(){
        this.y+=this.speed;
        this.context.drawImage(this.img,this.x,this.y);
        if(this.y>this.height){
            this.islife=false;//当敌机的Y坐标超出可视区 那么让敌机消失
        }
    }
}