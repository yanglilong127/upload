const express=require('express');
const expressStatic=require('express-static');
const bodyParser=require('body-parser');     //post方式数值
const multer=require('multer');
const open=require('open');     //自动打开浏览器
const fs=require('fs');

//创建服务器
const server=express();
//自动打开浏览器
open('http://localhost:8088/file_input.html','chrome');
//监听端口号8081
server.listen(8088,(err)=>{
    if(err)
        throw new err;
    else 
        console.log('成功监听8088端口。');
});
const storage=multer.diskStorage({  //上传属性定制
    destination:function(req,file,cb){
        cb(null,'./upload');   //保存的路径       
    },
    filename:function(req,file,cb){  //保存的文件名
        cb(null,file.originalname);
    }           
});         
const upload=multer({storage:storage}); 
//获取数据请求  post方式
server.use(bodyParser.urlencoded({
    extended:true,
    maxAge:5*1024*1024
}));


server.use('/tijiao',upload.array('files'),function(req,res,next){
	//var file=req.file;  //待解压的文件名
	//console.log(req.files);
	res.send({msg:'ok'})
});

//静态文件放置位置，即根目录
server.use(expressStatic('./file_input'));
