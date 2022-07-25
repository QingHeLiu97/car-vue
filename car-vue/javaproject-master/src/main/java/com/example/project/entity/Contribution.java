package com.example.project.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

/**
 * Created with IntelliJ IDEA.
 *
 * @Author: XXXXX
 * @Date: 2022/02/18/0:16
 * @Description:
 */
@Data
public class Contribution {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private Integer userId;
    private String userPhone;
    private String userName;
    private String createTime;
    private String project;
    private String type;
    private String price;
    private String content;
    private Integer status;
}
