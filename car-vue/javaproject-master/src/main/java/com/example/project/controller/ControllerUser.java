    package com.example.project.controller;

    import com.example.project.config.UserLoginToken;
    import com.example.project.entity.User;
    import com.example.project.service.UserService;
    import com.fasterxml.jackson.databind.util.JSONPObject;
    import com.mysql.cj.xdevapi.JsonString;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;


    @RestController
    @RequestMapping("user")
    public class ControllerUser {
        @Autowired
        private UserService userService;

        @UserLoginToken
        @GetMapping("pages")
        @ResponseBody
        public Object findPage(
                @RequestParam(value = "current", defaultValue = "1") Integer current,
                @RequestParam(value = "pageSize",defaultValue = "10") Integer pageSize,
                @RequestParam(value = "role",defaultValue = "") String role,
                @RequestParam(value = "name",defaultValue = "") String name,
                @RequestParam(value = "phone",defaultValue = "") String phone,
                @RequestParam(value = "idCard",defaultValue = "") String idCard,
                @RequestParam(value = "status", defaultValue = "-1") Integer status
        ){
            return userService.findPage(current,pageSize,role,name,phone,idCard,status);
        }

        @UserLoginToken
        @PostMapping("insert")
        @ResponseBody
        public Object insert(@RequestBody User user){
            return userService.insertUser(user);
        }

        @UserLoginToken
        @PostMapping("update")
        @ResponseBody
        public Object update(@RequestBody User user){
            return userService.updateUser(user);
        }

        @UserLoginToken
        @GetMapping("delete")
        @ResponseBody
        public Object delete(@RequestParam(value = "id", defaultValue = "") Integer id){
            return userService.deleteUser(id);
        }

        @UserLoginToken
        @GetMapping("findUserById")
        @ResponseBody
        public User findUserById(@RequestParam(required = false ,value = "data") String id){
            return userService.findUserById(id);
        }

    }
