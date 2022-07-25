package com.example.project.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.project.common.Result;
import com.example.project.entity.User;
import com.example.project.mapper.MapperUser;
import com.example.project.utils.BizException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    @Autowired
    private MapperUser mapperUser;

    public Object login(User user){
        User userInfo = mapperUser.accountLogin(user.getResidential(),user.getPassword());
        if(userInfo == null){
            throw new BizException("500","账号或密码不正确");
        }
        if(!userInfo.getStatus()){
            throw new BizException("500","您的账号已被禁用");
        }
        userInfo.setToken(getToken(userInfo));
        mapperUser.updateById(userInfo);
        Result result = new Result();
        return result.success(userInfo);
    }

    public String getToken(User user) {
        String token="";
        token= JWT.create().withAudience(String.valueOf(user.getId())).sign(Algorithm.HMAC256(user.getPassword()));
        return token;
    }
}
