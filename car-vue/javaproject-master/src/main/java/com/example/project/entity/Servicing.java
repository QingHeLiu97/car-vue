package com.example.project.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

/**
 * Created with IntelliJ IDEA.
 *
 * @Author: XXXXX
 * @Date: 2022/02/18/11:10
 * @Description:
 */
@Data
public class Servicing {
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String userPhone;
    private String userName;
    private String address;
    private String equipmentName;
    private String content;
    private Integer status;
    private String createTime;
}
