const joi = require('joi')
// 通用验证中间件函数
const commonValidateFn = (rules) => ((req, res, next) => {
    const userinfo = req.body
    const validateRes = rules.validate(userinfo, { abortEarly: false, allowUnknown: true })
    if (validateRes.error) throw validateRes.error
    else next()
})
const gongdeRule = joi.number().required().integer()  //通用用户名验证规则
const postGongdeRules = joi.object({
    total_gongde: gongdeRule
})
exports.postGongdeValidator = commonValidateFn(postGongdeRules)
const postSettingsRules = joi.object(
    {
        gongdePerCount: joi.number().required().integer().max(999),
        autoMuYu: joi.boolean().required(),
        autoMuYuFrequency: joi.number().required().min(0.1).max(3)
    }
)
exports.postSettingsValidator = commonValidateFn(postSettingsRules)