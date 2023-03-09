// 创建Game构造器函数，并传入需要初始化的canvas对象
function Game(canvas){//this代码是当前对象.
    let width=window.innerWidth;//获取网页可视区宽度
    let height=window.innerHeight;//获取浏览器网页可视区高度
    this.width=canvas.width=width;//设置canvas的宽度为网页可视区宽度并记录下网页宽度到当前对象
    this.height=canvas.height=height;//设置canvas的高度为网页可视区高度并记录下网页高度到当前对象
    this.context=canvas.getContext("2d");//获取canvas画布的上下文绘制环境.把环境也存储到当前对象
    this.loadnum=0;//记录加载了多少素材图片 默认为0
    this.numimg=[];//用一个数组来存储数字图片
    this.myplaneimg=null;//用来存储我的飞机图片
    this.bgimgs=[];//用来存储背景图片
    this.bloodimg=[];//存放血包
    this.starimg=[];//存放星星
    this.enemyPlanImg=[];//用来存储敌机的图片
    this.bombimgs2=[];
    this.bombimgs=[];//用来存储炸弹显示图片
    this.bulletimg=null;//用来存储子弹图片
    this.bulletimg2=null;//用来存储子弹图片
    this.bulletimg3=null;//用来存储子弹图片
    this.hpimg=null;//用来存储血条图片
    this.audio=null;//用来存储音频
    this.bombaudio=null;
    this.bg1=null;//存储背景Background对象
    this.bg2=null;//存储背景Backgorund对象第二个背景对象
    this.myplane=null;//存储我的飞机对象
    this.myplaneimg2=null;
    this.myplaneimg3=null;
    this.bulletArray=[];//存储所有子弹的数组
    this.bulletTime=Date.now();//游戏开始的记录生成子弹的时间
    this.enemyTime=Date.now();//生成敌机的时间
    this.bloodTime=Date.now();//生成血包
    this.starTime=Date.now();//星星
    this.enemyArray=[];//存储敌机对象
    this.zdmusic=[];//存储集中的子弹的声音
    this.bombmusic=[];//baozhashhengyin
    this.bombArray=[];//存储炸弹对象
    this.bombArray2=[];
    this.funArray=[];
    this.isrun=true;
    this.timmerID=null;//存时间
    this.canvas=canvas;
    this.level=1;
    this.Rising=false;
    this.bloodArry=[];
    this.starArry=[];//星星储存包
}
Game.prototype.loadImg=function(path){//加载图片函数
    let that=this;//给当前game对象一个别名that
    // console.log("loadImg里面的this===>",this);//this指向game对象
    let img=new Image();
        img.src=path;
        img.onload=function(){
            that.loadnum++;//每成功加载一张图片就让加载资源数量+1
            //这里的this指向img对象所以这里要调用game对象用that
            //console.log("img图片对象里面 this===>",this);    
        }
        img.onerror=function(){
            alert(path+"加载失败");
        }
        return img;
}
Game.prototype.loadAudio=function(path){//加载音频的函数
    let that=this;
    let audio=new Audio();
        audio.src=path;
        audio.onloadedmetadata=function(){//当音频文件加载完成后触发的事件
            that.loadnum++;
        }
        audio.onerror=function(){//加载失败触发的事件
            alert(path+"加载失败");
        }
    return audio;
}
Game.prototype.drawProcess=function(){//绘制进度条，根据资源数量自动绘制进度条
    //绘制进度条
    this.context.fillStyle="black";
    this.context.fillRect(0,0,this.width,this.height);//把真个canvas填充为黑色
    let loadingX=(this.width-500)/2; //计算进度条的x坐标 (整个宽度-进度条宽度) / 2
    let loadingY=(this.height-50)/2;//计算进度条的y坐标 (整个高度-进度条高度) / 2
    this.context.strokeStyle="red";//设置进度条的样式颜色
    this.context.lineWidth=3;//设置进度条框的边框宽度
    this.context.strokeRect(loadingX,loadingY,500,50); //绘制一个长度为500,50的矩形框并上下居中
    this.context.fillStyle="red";//设置实心进度条样式
    //总资源数 33 
    let processWidth=this.loadnum/34*500;//计算进度条宽度 已加载数量/总数量 * 总进度条宽度
    this.context.fillRect(loadingX,loadingY,processWidth,50);//绘制实心进度条
    this.context.font="30px 微软雅黑";//绘制进度文本
    this.context.fillText(Math.floor(this.loadnum/34*100)+"%",this.width/2-50,this.height/2-50);
}
Game.prototype.loading=function(){//资源加载函数  -----了解 原型 和 原型链------
    for(let i=0;i<=11;i++){
        if(i<=9){//如果i是0-9加载数字
            let img=this.loadImg('./image/'+i+".png");//加载数字图片
            this.numimg.push(img);//把加载的数字图片存入数组 备用.
        }
        if(i>=1&&i<=6){//1-5加载背景图片
            let bg=this.loadImg('./image/bg_0'+i+".jpg");
            this.bgimgs.push(bg);
        }
        if(i>=1&&i<=8){//1-3加载敌机图片
            let pimg=this.loadImg('./image/dj'+i+".png");
            this.enemyPlanImg.push(pimg);
        }
        if(i>=1&&i<=6){//1-3加载敌机图片
            let pimg=this.loadImg('./image/enemy_0'+i+".png");
            this.enemyPlanImg.push(pimg);
        }
        if(i>=1&&i<=11){
            let bombimg=this.loadImg('./image/b'+i+".gif");
            this.bombimgs.push(bombimg);//加载炸弹图片并存入数组
        }
        if(i>=1&&i<=6){
            let bombimg2=this.loadImg('./image/bomb2_0'+i+".png");
            this.bombimgs2.push(bombimg2);//加载炸弹图片并存入数组
        }
    }
    this.myplaneimg=this.loadImg("./image/myplane1.png");//加载我的飞机图片并存储
    this.myplaneimg2=this.loadImg("./image/myplane2.png");
    this.myplaneimg3=this.loadImg("./image/myplane3.png");
    this.bulletimg=this.loadImg('./image/bullet1.png');//加载子弹图片
    this.bulletimg2=this.loadImg('./image/bullet2.png');//加载子弹2图片
    this.bulletimg3=this.loadImg('./image/bullet3.png');//加载子弹2图片
    this.hpimg=this.loadImg("./image/img_HP.png");//加载血条图片
    this.bloodimg=this.loadImg("./image/blood5_03.png");//加载血包图片+loamding+1
    this.starimg=this.loadImg("./image/star.png");//加载星星图片+loamding+1
    this.audio=this.loadAudio("./audio/zd.mp3");//加载音频文件
    this.bombaudio=this.loadAudio("./audio/bomb.mp3");//加载音频文件
}
Game.prototype.createAudio=function(){
    return this.loadAudio("./audio/zd.mp3");
}
Game.prototype.createbombAudio=function(){
    return this.loadAudio("./audio/bomb.mp3");
}
Game.prototype.start=function(){//在Game构造器函数上面添加start被实例共享.
    let that=this;
    this.loading();
    //创建背景对象
    
   
    let randomImg=Math.floor(Math.random()*6);//生成一个0-5的随机属性
    this.bg1=new Background(0,0,this.bgimgs[randomImg],
        this.context,this.width,this.height);
    //创建第二个背景图对象，Y坐标是-高度 其他参数一样

    this.bg2=new Background(0,-this.height,this.bgimgs[randomImg],this.context,this.width,this.height);
     //初始化我的飞机
    
   /* if(that.level==1){
        this.myplane=new MyPlane(0,0,this.width,this.height,this.myplaneimg2,this.context);
     }else if(that.level==2){
        this.myplane=new MyPlane(0,0,this.width,this.height,this.myplaneimg,this.context);
     }*/
     
     
    this.myplane=new MyPlane(0,0,this.width,this.height,this.myplaneimg2,this.context);
    function play(){
        if(that.loadnum>=34){//加载完成 就开始游戏
            that.run();//游戏运行函数
        }else{//没有加载完成就继续绘制进度条
            that.drawProcess();//绘制进度条
        }
        that.timmerID=requestAnimationFrame(play);
        
    }
    play();
    document.addEventListener("keydown",function(e){
        if(e.code==="Space"){
            if(that.Rising) return;
            if(that.isrun){
                that.isrun=false;
                cancelAnimationFrame(that.timmerID);
                that.context.fillStyle="red";
                that.context.shadowColor="yellow";
                that.context.shadowBlur=10;
                that.context.globalAlpha=0.5;
            
                //that.context.shadowColor="yellow";
                let x=that.width/2,y=that.height/2;
                that.context.arc(x,y,50,0,2*Math.PI);
                
                that.context.textAlign="center";
                that.context.font="30px 微软雅黑";
                that.context.fill();
                that.context.shadowBlur=0;
                that.context.globalAlpha=1;
                that.context.fillStyle="yellow";
                that.context.fillText("暂停",x,y);
                that.context.font="14px 微软雅黑";
                that.context.fillText("点击可下载",x,y+24);
                //that.context.globalAlpha=1;
            }else{
                that.isrun=true;
                play();
            }
        }
    });
    document.addEventListener("click",function(e){
        let x=e.clientX,y=e.clientY;
        let startx=that.width/2-50,endx=startx+100;
        let starty=that.height/2-50,endy=starty+100;
        if(x>startx&&x<endx&&y>starty&&y<endy&&!that.isrun){
            let imgCode=that.canvas.toDataURL();           
            let imgobject=document.createElement("img");
            imgobject.src=imgCode;
            imgobject.width=100;
            imgobject.height=100;
            let a=document.createElement("a");
            a.href=imgCode;
            a.download="截图.png";
            a.style.position="absolute";
            a.style.top=that.height/2+"px";
            a.style.left=that.width/2+"px";
            a.style.zIndex=9;
            a.style.padding="20px";
            a.style.background="white";
            a.style.textAlign="center";
            let span=document.createElement("span");
            span.innerHTML="点击下载"; 
            span.style.display="block";
            a.appendChild(imgobject);
            a.appendChild(span);
            document.body.appendChild(a);
           /* a.onclick=function(){
                a.click();
                a.remove();
            }*/
            a.click();
                a.remove();
        }
    });
    document.addEventListener("click",function(e){
        let x1=e.clientX,y1=e.clientY;
        let startx=that.width-150,endx=startx+100;
        let starty=that.height-100,endy=starty+50;
        if(x1>startx&&x1<endx&&y1>starty&&y1<endy){
            let imgCode=that.canvas.toDataURL();           
            let imgobject=document.createElement("img");
            imgobject.src=imgCode;
            imgobject.width=100;
            imgobject.height=100;
            let a =document.createElement("a");
            a.href=imgCode;
            a.download="截图.png";
            a.style.position="absolute";
            a.style.top=that.height-300+"px";
            a.style.left=that.width-160+"px";
            a.style.zIndex=9;
            a.style.padding="20px";
            a.style.background="white";
            a.style.textAlign="center";
            let span=document.createElement("span");
            span.innerHTML="点击下载"; 
            span.style.display="block";
            a.appendChild(imgobject);
            a.appendChild(span);
            document.body.appendChild(a);
              /*  a.onclick()=function(){
                    a.remove();
                }*/
                a.click();
                a.remove();
              

        }
    })
}
Game.prototype.drawPhoto=function(){  //画分数
    
    let loadingX=this.width-150; //计算进度条的x坐标 (整个宽度-进度条宽度) / 2
    let loadingY=this.height-100;//计算进度条的y坐标 (整个高度-进度条高度) / 2
    this.context.shadowColor="yellow"
    this.context.shadowBlur="10"
    this.context.fillStyle="red";
    this.context.globalAlpha=0.5;
    this.context.lineWidth=3;//设置进度条框的边框宽度
    this.context.fillRect(loadingX,loadingY,100,50); //绘制一个长度为500,50的矩形框并上下居中
    this.context.shadowBlur=0;
    this.context.globalAlpha=1;
    this.context.font="20px 微软雅黑";
    this.context.fillStyle="yellow";
    this.context.textAlign="center";
    this.context.fillText("点击下载",loadingX+50,this.height-70);

}
Game.prototype.drawLevel=function(level){
    let that=this;
     that.Rising=true;
    let x=this.width/2,y=this.height/2;
    let width=200,height=100;
    this.context.shadowColor="yellow";
    this.context.shadowBlur=10;
    this.context.fillStyle="red";
    this.context.globalAlpha=0.5;
    this.context.fillRect(x-(width/2),y-(height/2),width,height);
    this.context.globalAlpha=1;
    this.context.shadowBlur=0;
    this.context.fillStyle="yellow";
    this.context.font="30px 微软雅黑";
    this.context.textAlign="center";
    if(level==="end"){
        this.context.fillText("恭喜通关",x,y);
        this.context.font="20px 微软雅黑";
        this.context.fillText("点击重新开始",x,y+25);
    }else{
        this.context.fillText("Round"+level,x,y);
    this.context.font="20px 微软雅黑";
    this.context.fillText("点击进入第"+level+"关",x,y+25);
    }
    document.addEventListener("click",function(e){
        let mouseMinx=x-(width/2),mouseManx=mouseMinx+width;
        let mouseMiny=y-(height/2),mouseMany=mouseMiny+height;
        if(e.clientX>mouseMinx&&e.clientX<mouseManx&&e.clientY>mouseMiny&&e.clientY<mouseMany){
            if(level==="end"){
                that.context.clearRect(0,0,this.width,this.height);
                location.reload();
                return;
            }
            that.starArry=[];
            that.level=level;
            that.enemyArray=[];
            that.bloodArry=[];
            that.bulletArray=[];
            that.bombArray=[];
            that.Rising=false;//判断是否升级
        }
    });
}
Game.prototype.recordLevel=function(){
    let score=this.myplane.score;
    if(score<1000){

    }else if(score<2000){
           if(this.level==1){
            this.drawLevel(2);        
            return true;
           }
    }else if(score<3000){
          if(this.level==2){this.drawLevel(3);return true;}
    }else if(score<4000){
        if(this.level==3){this.drawLevel(4);return true;}
    }else if(score<5000){
        if(this.level==4){this.drawLevel(5);return true;}
    }else if(score>5000){
        this.drawLevel("end");
        return true;
    }
    return false;
}

Game.prototype.gameOver=function(){
    let width=300,height=100;
    let x=(this.width-width)/2,y=(this.height-height)/2;
    this.context.shadowColor="yellow";
    this.context.shadowBlur=10;
    this.context.fillStyle="red";
    this.context.globalAlpha=0.5;
    this.context.fillRect(x,y,width,height);
    this.context.globalAlpha=1;
    this.context.shadowBlur=0;
    this.context.fillStyle="yellow";
    this.context.font="30px bold 微软雅黑";
    this.context.textAlign="center";
    this.context.fillText("Gome over",x+150,y+40);
    this.context.font="16px bold 微软雅黑";
    this.context.fillText("按任意键重新开始游戏",x+150,y+70);
    document.addEventListener("keydown",function(){
        location.reload();
    });
}
Game.prototype.drawhp=function(){
    this.context.drawImage(this.hpimg,20,20);
}
Game.prototype.run=function(){//游戏运行函数
    let that=this;
    this.context.clearRect(0,0,this.width,this.height);
    
    this.bg1.draw();//游戏开启以后就开始绘制背景
    this.bg2.draw();//开始绘制第二个背景图

   if(this.level==1){
        this.myplane.draw();
    }else if(this.level==2){
        this.myplane.img.src="./image/myplane_11.png";
        this.myplane.draw();
    }else if(this.level==3){
        this.myplane.img.src="./image/myplane_15.png";
        this.myplane.draw();
    }else if(this.level==4){
        this.myplane.img.src="./image/myplane_03.png";
        this.myplane.draw();
    }else if(this.level==5){
        this.myplane.img.src="./image/myplane19.png";
        this.myplane.draw();
    }
    //this.myplane.draw();//绘制我的飞机
   //console.log(this.myplane.img.src);//找一个路径
    

    this.drawhp();
    this.fenshu();
    if(this.myplane.hp<=0){
        this.gameOver()
        return;
    }
    let islevel=this.recordLevel();
    if(islevel){
        return ;
    }
    this.starBullet();
    this.bloodBullet();
    this.manageBullet();//管理子弹的生成 和 绘制
    // console.log(this.bulletArray);
    this.manageEnemy();//管理敌机生成和绘制
    
}
Game.prototype.fenshu=function(){
    let that=this;
    //console.log("分数哈哈哈计划",that.myplane.score);
    let score=that.myplane.score;
    let scorestr=new String(score);
     //console.log("字符",scorestr);
    let scorearr=scorestr.split('');
    //console.log("字符数组",scorearr);

   let len=scorearr.length;
   let maxx=this.width-20;
   scorearr.forEach(function(s,index){
    //console.log("循环：",s,"下标：",index);
    let x=maxx-(32*(len-index));
    let numimge=that.numimg[s];
    that.context.drawImage(numimge,x,20,32,43);
   });

    if(that.myplane.score>=9999){
        location.reload();
    }

   that.drawPhoto();
}
    
Game.prototype.manageEnemy=function(){//管理敌机生成和绘制
    let that=this;
    let timenow=Date.now();//获取当前定时器里面时间
    let levelTime=1000;
    let Enemyspeeding=10;
    let randomImg="";
    switch(that.level){
        case 1: Enemyspeeding=5;levelTime=1000;Enemyfun=100;Enemyblood=70;
         randomImg=this.enemyPlanImg[Math.floor(Math.random()*3)];break;
        case 2: Enemyspeeding=10;levelTime=500;Enemyfun=60;Enemyblood=130;
         randomImg=this.enemyPlanImg[Math.floor(Math.random()*4+4)];break;
        case 3: Enemyspeeding=11;levelTime=300;Enemyfun=40;Enemyblood=180;
        randomImg=this.enemyPlanImg[Math.floor(Math.random()*4+8)];break;
        case 4: Enemyspeeding=12;levelTime=250;Enemyfun=30;Enemyblood=240;
        randomImg=this.enemyPlanImg[Math.floor(Math.random()*6+5)];break;
        case 5: Enemyspeeding=14;levelTime=150;Enemyfun=20;Enemyblood=300;
        randomImg=this.enemyPlanImg[Math.floor(Math.random()*8+6)];break;
    }

    if(timenow-this.enemyTime>levelTime){//创建敌机
        //let randomImg=this.enemyPlanImg[Math.floor(Math.random()*3)];//随机生成敌机图片
        let enemyX=Math.floor(Math.random()*(this.width-randomImg.width));//生成敌机随机x坐标
        let randomeSpeed=Math.floor(Math.random()*5)+Enemyspeeding;//2-10
        let randomeFun=Math.floor(Math.random()*5)+Enemyfun;
        let randomeBlood=Math.floor(Math.random()*10)+Enemyblood;
        let e=new Enemy(enemyX,-randomImg.height,this.width,this.height,randomImg,this.context,randomeSpeed,randomeBlood,randomeFun);
        let isIntersect=false;//记录当前生成的敌机是否和其他敌机相交 默认不相交
        that.enemyArray.forEach(function(ene){//循环所有敌机判断当前生成的敌机是否和其他敌机相交
            let isinc=that.checkIntersect(ene,e);
            if(isinc){//如果生成敌机和原来敌机有相交的情况 记录下来
                isIntersect=true;
            }
        });
        if(!isIntersect){//只有当当前生成的敌机和原来的敌机不相交才保存当前生成的敌机
            if(e.img.width>=200){
                e.blood=e.blood*2;
                e.integral=e.integral*2;
               // console.log(e);
            }else if(e.img.width<=100){
                e.blood=e.blood/2;
                //e.integral=e.integral/2;
            }
            this.enemyArray.push(e);//把生成的敌机存入敌机数组
            this.enemyTime=timenow;
        }
    }
    this.enemyArray.forEach(function(enemy,index){//循环绘制敌机
        let iscrash=that.checkCrash(that.myplane,enemy);
        if(iscrash){
            enemy.islife=false;
            that.myplane.hp-=30;
            that.bombmusic.push(that.createbombAudio());
            let bom=new Bomb(enemy.x+(enemy.img.width/2),enemy.y+(enemy.img.height/2),that.bombimgs2,that.context);
            that.bombArray.push(bom);
           // let bom2=new Bomb(enemy.x+(enemy.img.width/2),enemy.y+(enemy.img.height/2),that.bombimgs2,that.context);
           // that.bombArray2.push(bom2);
            that.myplane.score+=enemy.integral;             
        }
        enemy.draw();
        if(!enemy.islife){//!取反 true变为false false变为true
            that.enemyArray.splice(index,1);//当敌机没有生命的时候 消失.
        }
    });
    // console.log(this.enemyArray);
}
Game.prototype.bloodBullet=function(){//关于血包的生产
    let that=this;
    let timenow=Date.now();
    if(timenow-this.bloodTime>4000-50*that.level){
        let enemyX=Math.floor(Math.random()*(this.width-this.bloodimg.width));//生成敌机随机x坐标
        let randomeSpeed=Math.floor(Math.random()*5+5);//5-10
        let bll=new Blood(enemyX,-this.bloodimg.height,this.width,this.height,this.bloodimg,this.context,randomeSpeed);
        let isIntersect=false;//记录当前生成的敌机是否和其他敌机相交 默认不相交
        this.bloodArry.forEach(function(blo){//循环所有敌机判断当前生成的敌机是否和其他敌机相交
            let isinc=that.checkIntersect(blo,bll);
            if(isinc){//如果生成敌机和原来敌机有相交的情况 记录下来
                isIntersect=true;
            }
        });
        if(!isIntersect){//只有当当前生成的敌机和原来的敌机不相交才保存当前生成的敌机
            this.bloodArry.push(bll);//把生成的敌机存入敌机数组
            //console.log("生成的敌机",this.enemyArray);
            this.bloodTime=timenow;
        }
    }
    this.bloodArry.forEach(function(blood,index){
        let iscrash=that.checkCrash(that.myplane,blood);
        if(iscrash){
            blood.islife=false;
            if(that.myplane.hp>=70){
                that.myplane.hp=100;
            }else if(that.myplane.hp<70){
                that.myplane.hp+=blood.blooding;
            }
        }
        blood.draw();
        if(!blood.islife){//!取反 true变为false false变为true
            that.bloodArry.splice(index,1);//当敌机没有生命的时候 消失.
        }
    });
      
}
Game.prototype.starBullet=function(){//关于星星生产++分分
    let that=this;
    let timenow=Date.now();
    if(timenow-this.starTime>1000-that.level*50){
        let starX=Math.floor(Math.random()*(this.width-this.starimg.width));//生成星星随机x坐标
        let randomeSpeed=Math.floor(Math.random()*5+5);//5-10
        let star=new Star(starX,-this.starimg.height,this.width,this.height,this.starimg,this.context,randomeSpeed);
        let isIntersect=false;//记录当前生成的星星是否和其他星星相交 默认不相交
        this.starArry.forEach(function(sta){//循环所有星星判断当前生成的星星是否和其他星星相交
            let isinc=that.checkIntersect(sta,star);
            if(isinc){//如果生成星星和原来星星有相交的情况 记录下来
                isIntersect=true;
            }
        });
        if(!isIntersect){//只有当当前生成的星星和原来的星星不相交才保存当前生成的星星
            this.starArry.push(star);//把生成的星星存入星星数组
            //console.log("生成的星星",this.enemyArray);
            this.starTime=timenow;
        }
    }
    this.starArry.forEach(function(starr,index){
        let iscrash=that.checkCrash(that.myplane,starr);
        if(iscrash){
            starr.islife=false;
            that.myplane.score+=starr.sta;
        }
        starr.draw();
        if(!starr.islife){//!取反 true变为false false变为true
            that.starArry.splice(index,1);//当星星没有生命的时候 消失.
        }
    });
      
}
Game.prototype.manageBullet=function(){//管理子弹的生成 和 绘制
    let that=this;
    let timenow=Date.now();//获取当前定时器里面时间
    //console.log("时间",timenow);
    let levelTime=1000;
    let Enemyspeeding=10;
    switch(that.level){
        case 1: 
        Enemyspeeding=10;levelTime=1000;break;
        case 2: Enemyspeeding=15;levelTime=900;break;
        case 3: Enemyspeeding=20;levelTime=700;break;
    }
    if(timenow-this.bulletTime>100){//判断当前时间减去上一次生成子弹的时间如果大于1000表示过了1秒
        //创建一个颗子弹 (120飞机宽度-20子弹宽度)/2=子弹x相对于飞机的x坐标的偏移
        if(that.level==1){
            let bulletX=this.myplane.x+50;
            let b=new Bullet(bulletX,this.myplane.y,this.context,this.bulletimg,20,20);
           this.bulletArray.push(b);
        }else if(that.level==2){
            let bulletX=this.myplane.x+50;
            let b2=new Bullet(bulletX-30,this.myplane.y,this.context,this.bulletimg,25,20);
            this.bulletArray.push(b2);
             let b3=new Bullet(bulletX+30,this.myplane.y,this.context,this.bulletimg,25,20);
             this.bulletArray.push(b3);
        }else if(this.level==3){
            let bulletX=this.myplane.x+50;
            let b=new Bullet(bulletX-5,this.myplane.y,this.context,this.bulletimg,10,20);
           this.bulletArray.push(b);
           let b2=new Bullet(bulletX-50,this.myplane.y,this.context,this.bulletimg,20,20);
            this.bulletArray.push(b2);
             let b3=new Bullet(bulletX+50,this.myplane.y,this.context,this.bulletimg,20,20);
             this.bulletArray.push(b3);
        }else if(this.level==4){
            let bulletX=this.myplane.x+50;
            let b=new Bullet(bulletX,this.myplane.y,this.context,this.bulletimg,20,30);
           this.bulletArray.push(b);
           let b2=new Bullet(bulletX-50,this.myplane.y,this.context,this.bulletimg2,20,25);
            this.bulletArray.push(b2);
             let b3=new Bullet(bulletX+50,this.myplane.y,this.context,this.bulletimg2,20,25);
             this.bulletArray.push(b3);
        }else if(this.level==5){
            let bulletX=this.myplane.x+50;
            let b=new Bullet(bulletX-35,this.myplane.y,this.context,this.bulletimg3,10,30);
           this.bulletArray.push(b);
           let b2=new Bullet(bulletX-50,this.myplane.y,this.context,this.bulletimg2,25,40);
            this.bulletArray.push(b2);
             let b3=new Bullet(bulletX+50,this.myplane.y,this.context,this.bulletimg2,25,40);
             this.bulletArray.push(b3);
        }
        //let bulletX=this.myplane.x+50;
        //let b=new Bullet(bulletX,this.myplane.y,this.context,this.bulletimg,10,20);
       //this.bulletArray.push(b);
       //  let b2=new Bullet(bulletX-50,this.myplane.y,this.context,this.bulletimg,20);
        //this.bulletArray.push(b2);
         //let b3=new Bullet(bulletX+50,this.myplane.y,this.context,this.bulletimg,20);
         //this.bulletArray.push(b3);
        //把生成子弹时间记录下来，等下一次超过1s之后再次生成子弹
        this.bulletTime=timenow;
    }
    //循环数组 把数组里面所有子弹绘制出来.
    this.bulletArray.forEach(function(b,index){
        that.enemyArray.forEach(function(enemy){//循环所有的敌机
            let iscrash=that.checkCrash(b,enemy);//检测敌机和子弹是否相交
            if(iscrash){
                b.islife=false;//证明子弹已经打到敌机 子弹要消失.
                // that.zdmusic.push(that.audio);//当子弹击中敌机的时候 存储音频到数组
               /* that.audio.play().catch(e=>{
                    //console.log('当前默认不许')
                });*/
                that.zdmusic.push(that.createAudio());
                enemy.blood-=b.hurt;//敌机的生命值减去子弹伤害
                if(enemy.blood<=0){//判断被击中后敌机的血量如果小于等于0 那么敌机应该消失
                    enemy.islife=false;
                    that.bombmusic.push(that.createbombAudio());
                    //同时在这个敌机位置创建一个炸弹对象。 赋值的坐标应该是敌机的中心坐标。
                    let bom=new Bomb(enemy.x+(enemy.img.width/2),enemy.y+(enemy.img.height/2),that.bombimgs,that.context);
                    that.bombArray.push(bom);
                   // let bom2=new Bomb(enemy.x+(enemy.img.width/2),enemy.y+(enemy.img.height/2),that.bombimgs2,that.context);
                    //that.bombArray2.push(bom2);
                    //console.log(that.bombArray2);
                    that.myplane.score+=enemy.integral;
                    console.log=(that.bombArray);
                   // console.log(that.myplane.score);                                       
                }
            }
        });
        b.draw();
        if(!b.islife){//判断子弹是否还有生命，如果没有false就从数组删除子弹
            that.bulletArray.splice(index,1);
        }
    });
     that.bombmusic.forEach(function(bombaudio,index){//循环播放声音
        bombaudio.play();
        //play()方法需要在用户和网页有互动以后才能调用.. 默认情况网页不允许直接自动播放音乐.
        //为了隐私.
        that.bombmusic.splice(index,1);
    });
    that.zdmusic.forEach(function(audio,index){//循环播放声音
        audio.play();
        //play()方法需要在用户和网页有互动以后才能调用.. 默认情况网页不允许直接自动播放音乐.
        //为了隐私.
        that.zdmusic.splice(index,1);
    });
    that.bombArray.forEach(function(bom,index){
        if(!bom.islife){
            that.bombArray.splice(index,1);//删除炸弹
        }
        bom.draw();
       /* i=Math.round(Math.random());
        console.log("等于",i);
        if(i==0){bom.draw();}else{bom1.draw();}*/
        
    });
}

Game.prototype.checkCrash=function(a,x){//a和x是对象 检测a对象和x对象是否相交 如果相交返回true 否则false
    let x1=x.x;
    let x2=x1+x.img.width;
    let y1=x.y;
    let y2=y1+x.img.height;
    let a1=a.x;
    let a2=a1+a.img.width;
    let b1=a.y;
    let b2=b1+a.img.height;
    if(!(x1>a2||x2<a1||y1>b2||y2<b1)){  
        return true;
    }
    return false;
}
Game.prototype.checkIntersect=function(a,x){//判断两个对象在x轴上面是否相交 如果相交true不相交为false
    let x1=x.x;
    let x2=x1+x.img.width;
    let a1=a.x;
    let a2=a1+a.img.width;
    if(!(x1>a2||x2<a1)){  
        return true;
    }
    return false;
}
// 网页加载完成后 开启游戏.
window.onload=function(){
    let canvas=document.getElementById("planegame");
    let g=new Game(canvas);
        g.start();
}
//在游戏正式显示之前应该先加载图片 和 音频文件.否则绘制失败.
//1.先加载图片 ，把游戏里面所有涉及到的图片 和音频都加载到程序里面并存储到对象里面