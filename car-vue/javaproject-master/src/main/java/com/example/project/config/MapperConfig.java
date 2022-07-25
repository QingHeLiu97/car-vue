package com.example.project.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
//@MapperScan("com.example.project.mapper")
public class MapperConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){
        //分页插件
        MybatisPlusInterceptor mybatisPlusInterceptor  = new MybatisPlusInterceptor();
        PaginationInnerInterceptor pageInterceptor = new PaginationInnerInterceptor();
        // 设置请求的页面大于最大页后操作，true调回到首页，false继续请求。默认false
        pageInterceptor.setOverflow(false);
        // 单页分页条数限制，默认无限制
        pageInterceptor.setMaxLimit(50L);
        // 设置数据库类型
        pageInterceptor.setDbType(DbType.MYSQL);
        mybatisPlusInterceptor.addInnerInterceptor(pageInterceptor);
        return mybatisPlusInterceptor;
    }
}
