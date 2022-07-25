/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.11-log : Database - communitytwo
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`communitytwo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_german2_ci */;

USE `communitytwo`;

/*Table structure for table `complaint` */

DROP TABLE IF EXISTS `complaint`;

CREATE TABLE `complaint` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `assess_a` int(11) NOT NULL DEFAULT '5',
  `assess_b` int(11) NOT NULL DEFAULT '5',
  `assess_c` int(11) NOT NULL,
  `content` varchar(255) NOT NULL DEFAULT '暂无评价',
  `user_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `complaint_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

/*Data for the table `complaint` */

insert  into `complaint`(`id`,`assess_a`,`assess_b`,`assess_c`,`content`,`user_id`,`create_time`) values (1,5,5,5,'非常好',814596106,'2022-02-20 15:42:54'),(2,5,5,5,'没有评价',814596106,'2022-02-20 15:43:05'),(3,5,5,2,'服务过于怠慢',814596109,'2022-03-14 05:53:07'),(4,4,3,4,'设施老化，及时维修，小花园的长椅脱漆',814596109,'2022-03-30 14:30:09'),(5,5,4,3,'',814596109,'2022-04-04 14:02:49'),(6,3,5,3,'',814596106,'2022-04-04 15:47:42'),(7,5,5,5,'',814596117,'2022-04-15 10:14:48'),(8,5,4,5,'',814596116,'2022-04-15 10:44:53'),(9,5,5,5,'',814596118,'2022-04-15 22:03:18'),(10,5,5,4,'',814596109,'2022-04-16 14:43:18');

/*Table structure for table `contribution` */

DROP TABLE IF EXISTS `contribution`;

CREATE TABLE `contribution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `user_phone` varchar(11) NOT NULL COMMENT '手机号',
  `user_name` varchar(255) NOT NULL COMMENT '用户名',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `project` varchar(255) NOT NULL COMMENT '缴费项目',
  `type` varchar(255) DEFAULT NULL COMMENT '支付方式',
  `price` varchar(255) NOT NULL COMMENT '支付金额',
  `status` int(11) NOT NULL DEFAULT '1',
  `content` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `contribution_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `contribution` */

insert  into `contribution`(`id`,`user_id`,`user_phone`,`user_name`,`create_time`,`project`,`type`,`price`,`status`,`content`) values (15,814596116,'18777870099','业主 1-2-304','2022-04-15 10:25:05','3月垃圾处理费+电梯费+小区绿化费','微信','300',1,''),(16,814596109,'13977125169','业主1 1-1-508','2022-04-15 10:25:31','3月垃圾处理费+电梯费+小区绿化费','支付宝','300',1,''),(17,814596106,'13628888888','业主 1-1-809','2022-04-15 10:25:55','3月垃圾处理费+电梯费+小区绿化费','微信','300',1,''),(18,814596117,'13457108416','业主2 1-1-209','2022-04-15 10:26:27','3月垃圾处理费+电梯费+小区绿化费','支付宝','300',1,''),(19,814596116,'18777870099','业主 1-2-304','2022-04-15 17:28:33','4月垃圾处理费+电梯费+小区绿化费','微信','300',1,''),(20,814596106,'19177863290','业主 1-1-809','2022-04-16 11:51:38','3月垃圾处理费+电梯费+小区绿化费','微信','300',1,''),(21,814596109,'13977125169','业主1 1-1-508','2022-04-16 14:43:31','4月垃圾处理费+小区绿化费','微信','300',1,'');

/*Table structure for table `notice` */

DROP TABLE IF EXISTS `notice`;

CREATE TABLE `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `content` longtext COMMENT '内容',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `notice_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COMMENT='公告';

/*Data for the table `notice` */

insert  into `notice`(`id`,`title`,`content`,`status`,`create_time`) values (2,'社区简介','金象社区地处广西壮族自治区南宁市良庆区大沙田开发区东南部,毗邻五象岭森林公园,占地面积1.53平方公里,是个混合型社区。目前，共有人口9486户，23899人;其中常住人口6690户，17280人;流动人口2796户，6619人。社区街道共73条，15个生活小区，企事业单位18个，中小学4所，幼儿园15个，社区定点医疗站1个。金象社区党支部于2002年6月25日成立，支部现有在册党员63名，其中男38名，女25名，在职38名，退休18名，农民5名，个体户9名。社区流动党员18人，驻辖区党支部15个，驻单位双重管理党员37人。党支部以争创“先锋连手促发展、流动家园普和谐”为主题全力打造党建示范点。通过建设一站式便民服务厅、党员先锋岗、党建活动阵地等全方位、多层面大力提升社区服务居民的水平;通过开展“创先争优”、“结对共建、先锋同行”等活动倡导党员干部以爱心凝聚人心，形成了社区服务居民、党员服务社区、党群共建社区的良性循环。曾荣获“南宁市先进基层党组织”、“良庆区参与首付南宁市创建全国文明城市工作先进单位”、“全国综合减灾示范社区”等33项荣誉。',1,'2022-02-20 01:11:37'),(5,'《关于流动人员管理的问题》','尊敬的各位业主：3月15日上午9时，召开了由良庆区流动人员管理办公室组织的各部门协调会。针对金象社区群租房现象十分突出，租户人员成分复杂、流动性大，以及中介机构和房东擅自改变建筑结构、杂物乱堆乱放、消防通道堵塞等严重社会问题，进行专题调研。会上成立了金象社区专项整治工作办公室，由区流管办、街道、房管、税务、公安、消防等政府部门及居委会、业委会、物业组成。办公室将协调各部门联合执法，并督导检查落实和验收。为配合此项工作，现将每栋楼、单元的群租房间号予以公示，张贴在楼门口及电梯间内。如有不符或遗漏，请于2022年3月20日前到4号楼楼长室或客服登记，经查实后予以变更。请各业主积极配合并举报遗漏的群租户。',1,'2022-03-16 12:16:00'),(11,'《关于社区疫情防控》','疫情防控，人人有责，各居民自行约束。\n一、全市小区(村)、单位人员非必要不外出，一般在小区内活动。小区实行“一门进出”，安排专人、志愿者24小时值守，人员出入必须落实扫码、测温、登记、戴口罩等措施。来我市探亲访友、出差、旅游人员非必要不离开居住地，尽量减少外出活动。\n\n二、企事业单位保持正常运转，减少非必要外出和聚集，鼓励支持员工居家办公、远程办公、在单位(经营场所)住宿，控制到办公场所工作人数,减少相互间接触，做好通风、消毒等工作。',1,'2022-04-15 22:18:52'),(13,'《告居民书》','《告居民书》\n居民朋友们:\n接疫情防控部门通知，防范区\"提级管理，按照“管控区\"要求执行!按照上述防疫要求,本小区继续按照\"管控区\"管理“人不出小区、严禁聚集，原则上居家。若有其他通知，将第一时间更新告知, 感谢大家的支持。',1,'2022-04-16 14:41:31');

/*Table structure for table `pay_free` */

DROP TABLE IF EXISTS `pay_free`;

CREATE TABLE `pay_free` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `price` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `username` varchar(20) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;

/*Data for the table `pay_free` */

insert  into `pay_free`(`id`,`user_id`,`price`,`status`,`create_time`,`phone`,`username`,`note`) values (16,814596117,'300',1,'2022-04-15 02:20:56','13457108416','业主2 1-1-209','3月垃圾处理费+电梯费+小区绿化费'),(17,814596109,'300',1,'2022-04-16 06:42:10','13977125169','业主1 1-1-508','4月垃圾处理费+小区绿化费'),(18,814596106,'300',1,'2022-04-15 08:41:07','19177863290','业主 1-1-809','3月垃圾处理费+电梯费+小区绿化费'),(19,814596116,'300',1,'2022-04-15 08:41:56','18777870099','业主 1-2-304','4月垃圾处理费+电梯费+小区绿化费'),(38,814596118,'300',0,'2022-04-15 08:37:47','18448545808','业主 1-2-309','4月垃圾处理费+电梯费+小区绿化费'),(39,814596117,'300',0,'2022-04-15 08:39:34','13457108416','业主2 1-1-209','4月垃圾处理费+电梯费+小区绿化费'),(43,814596109,'300',1,'2022-04-16 06:42:10','13977125169','业主1 1-1-508','4月垃圾处理费+小区绿化费');

/*Table structure for table `servicing` */

DROP TABLE IF EXISTS `servicing`;

CREATE TABLE `servicing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL COMMENT '联系人',
  `user_phone` varchar(255) DEFAULT NULL COMMENT '联系号码',
  `address` varchar(255) NOT NULL COMMENT '所在地址',
  `equipment_name` varchar(255) NOT NULL COMMENT '设备名称',
  `content` varchar(255) NOT NULL COMMENT '设备内容',
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `servicing_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COMMENT='报修表';

/*Data for the table `servicing` */

insert  into `servicing`(`id`,`user_name`,`user_phone`,`address`,`equipment_name`,`content`,`status`,`create_time`) values (6,'用户1 1-1-508','13977125169','1-1-5楼','声控灯','声控灯不亮',0,'2022-04-15 01:15:22'),(7,'业主2 1-1-209','13457108416','1-1-209','厨房','下水道堵塞',0,'2022-04-15 10:15:44'),(9,'业主1 1-1-508','13977125169','1-1-508','厕所','厕所堵塞',1,'2022-04-15 21:45:55'),(10,'业主 1-2-309','18448545808','1-2','电梯','电梯按钮失灵',1,'2022-04-15 22:08:06'),(11,'业主1 1-1-508','13977125169','1-1-508','厕所','厕所堵塞',0,'2022-04-16 14:43:08');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '姓名',
  `avatar` varchar(255) NOT NULL DEFAULT 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' COMMENT '头像',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `id_card` varchar(18) NOT NULL COMMENT '身份证号',
  `address_card` varchar(255) NOT NULL COMMENT '身份证地址',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `role` varchar(10) NOT NULL DEFAULT 'admin' COMMENT '角色',
  `token` varchar(255) DEFAULT NULL COMMENT '用户token',
  `password` varchar(32) NOT NULL DEFAULT '123456',
  `residential` varchar(255) NOT NULL DEFAULT ' 河池市金城区',
  UNIQUE KEY `user_idCard_uindex` (`id_card`),
  UNIQUE KEY `user_phone_uindex` (`phone`),
  UNIQUE KEY `user_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=814596124 DEFAULT CHARSET=utf8 COMMENT='用户表';

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`avatar`,`phone`,`id_card`,`address_card`,`status`,`create_time`,`role`,`token`,`password`,`residential`) values (2,'物业工作者1','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png','13557086024','450102199703074691','广西壮族自治区河池市金城区',1,'2022-02-14 13:38:23','admin','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyIn0.B2xj-vO1sLy5qWVq14lLtb0qYx_KsjMVaTYT0SvBDTg','123456','admin1'),(814596109,'业主1 1-1-508','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png','13977125169','450102199703077294','广西壮族自治区贺州市八步区八步街道',1,'2022-03-13 09:29:40','custom','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ1OTYxMDkifQ.eKzp7rd2BDfOGmqVHo9y4xeuyMiCUR3fnqHmuynwQC8','123456','1-1-508'),(814596117,'业主2 1-1-209','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png','13457108416','450123199803077867','广西省南宁市隆安县',1,'2022-04-15 10:13:28','custom','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ1OTYxMTcifQ.s3sELwjXCkfwaSp1EKHBajrbifgb4kZ5ZBt4AkHBdlY','123456','1-1-209'),(814596118,'业主 1-2-309','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png','18448545808','450123199803079387','广西南宁',1,'2022-04-15 11:19:39','custom','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ1OTYxMTgifQ.y9IfHfYdwu6IXQx464pq4da-zygxMSPFlayCSG-FGIk','123456','1-2-309'),(814596106,'业主 1-1-809','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png','19177863290','451202199003073475','广西省南宁市隆安县',1,'2022-02-19 22:29:48','custom','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ1OTYxMDYifQ.RiNMNs2g1HkmxPuXjU3vQQEqXlL3Njh7GIpkwrQZt-c','123456','1-1-809'),(814596105,'物业工作者2','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png','13627788998','451202199003074697','广西省南宁市',1,'2022-02-19 22:25:08','admin','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ1OTYxMDUifQ.jZWy7kIoyqnjjdENvDhMoUhjdlWeHW2KHmhQHxeEvz8','123456','admin2'),(814596123,'用户','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png','15677876010','451202199803073369','广西',1,'2022-04-16 14:41:00','custom',NULL,'123456','1-2-405'),(814596116,'业主 1-2-304','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png','18777870099','451202199803074521','广西省河池市金城江区河池镇五队',1,'2022-04-09 15:15:33','custom','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ1OTYxMTYifQ.nLbaq5HMkT-gsvZJklV2rfUdeja_XEOi3EdxyLzcCvw','123456','1-2-304'),(814596108,'管理员','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png','19911204932','452701199811030520','广西南宁',1,'2022-03-12 08:51:49','superAdmin','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQ1OTYxMDgifQ.dq3_UoVMNR22UmHxO7yliZgTquJIdqbL7CK2bsxniwM','123456','admin');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
