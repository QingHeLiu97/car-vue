package com.example.project.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
@Data
public class User{
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String name;
    private String avatar;
    private String phone;
    private String password;
    private String idCard;
    private String addressCard;
    private Boolean status;
    private String createTime;
    private String residential;
    private String role;
    private String token;
}
