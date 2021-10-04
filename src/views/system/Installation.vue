<template>
  <div>
    <el-row justify="center" align="middle">
      <el-col :xs="22" :sm="18" :md="16" :lg="16" :xl="12">
        <div class="container animated fadeIn">
          <el-card :shadow="'always'">
            <div>
              <section id="purr-logo">
                <span>Purr<small>安装向导</small></span>
              </section>
              <section id="welcome-message">
                <el-alert type="success" :closable="false">
                  <i class="el-icon-position"></i>
                  欢迎使用&nbsp;Purr&nbsp;{{
                    VERSION
                  }},&nbsp;简单配置之后开始使用吧！
                </el-alert>
              </section>
              <section>
                <el-form
                  ref="installationForm"
                  :model="form.model"
                  :rules="form.rules"
                  @submit.prevent="submitForm"
                >
                  <el-divider content-position="left">
                    博客作者信息
                  </el-divider>
                  <el-form-item prop="username">
                    <el-input
                      placeholder="用户昵称"
                      type="text"
                      prefix-icon="el-icon-user"
                      v-model="form.model.username"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="email">
                    <el-input
                      placeholder="用户邮箱"
                      type="text"
                      v-model="form.model.email"
                    >
                      <template #prefix>
                        <font-awesome-icon
                          :icon="['far', 'envelope']"
                        ></font-awesome-icon>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input
                      placeholder="登录密码（8-20位）"
                      type="password"
                      prefix-icon="el-icon-lock"
                      :show-password="true"
                      v-model="form.model.password"
                    >
                      <template #suffix>
                        <span ref="strengthChecker" id="strengthHint"></span>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="confirmPassword">
                    <el-input
                      placeholder="确认登录密码"
                      type="password"
                      prefix-icon="el-icon-lock"
                      :show-password="true"
                      v-model="form.model.confirmPassword"
                    >
                    </el-input>
                  </el-form-item>
                  <el-divider content-position="left"> 站点信息 </el-divider>
                  <el-form-item prop="hostname">
                    <el-input
                      type="text"
                      prefix-icon="el-icon-link"
                      v-model="form.model.hostname"
                      readonly
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="blogName">
                    <el-input
                      placeholder="博客标题"
                      type="text"
                      prefix-icon="el-icon-house"
                      v-model="form.model.blogName"
                    >
                    </el-input>
                  </el-form-item>
                  <reactive-button
                    type="primary"
                    native-type="submit"
                    icon="el-icon-check"
                    :errored="form.installErrored"
                    :loading="form.installing"
                    errored-text="安装失败"
                    loaded-text="安装成功"
                    size="large"
                    text="安装"
                    @click="handleInstall"
                    @callback="handleInstallCallback"
                  >
                  </reactive-button>
                </el-form>
              </section>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onBeforeMount } from 'vue';
import ReactiveButton from '../../components/Button/ReactiveButton';
import { useRouter } from 'vue-router';
import metaApi from '../../api/meta';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { setDocumentTitle } from '../../utils/domUtil';
import { useLogger } from 'vue-logger-plugin';

export default defineComponent({
  components: { ReactiveButton },
  setup: function () {
    const logger = useLogger();

    const router = useRouter();
    const store = useStore();

    const VERSION = ref('1.0.0');

    // template ref strengthChecker
    const strengthChecker = ref(null);
    // password checker for async validator
    const passwordStrengthChecker = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('* 密码长度最低不小于8'));
      }
      if (value.length > 30) {
        callback(new Error('* 密码长度最长不超过30'));
      }

      const strengthValue = {
        caps: false,
        length: false,
        special: false,
        numbers: false,
        small: false
      };
      for (let index = 0; index < value.length; index++) {
        let char = value.charCodeAt(index);
        if (!strengthValue.caps && char >= 65 && char <= 90) {
          strengthValue.caps = true;
        } else if (!strengthValue.numbers && char >= 48 && char <= 57) {
          strengthValue.numbers = true;
        } else if (!strengthValue.small && char >= 97 && char <= 122) {
          strengthValue.small = true;
        } else if (
          (!strengthValue.special && char >= 32 && char <= 47) ||
          (char >= 58 && char <= 64) ||
          (char >= 91 && char <= 96) ||
          (char >= 123 && char <= 126)
        ) {
          strengthValue.special = true;
        }
      }

      let strengthIndicator = 0;
      for (const metric in strengthValue) {
        if (strengthValue[metric]) strengthIndicator++;
      }

      const strongColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--el-color-success');
      const mediumColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--el-color-warning');
      const weakColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--el-color-error');
      if (strengthIndicator <= 2) {
        strengthChecker.value.innerText = 'Weak';
        strengthChecker.value.style.color = weakColor;
        callback(
          new Error(
            '* 密码强度过弱，要求至少包含数字、大写字母、小写字母、特殊字符中的三种'
          )
        );
      } else if (value.length >= 8 && strengthIndicator === 4) {
        strengthChecker.value.innerText = 'Strong';
        strengthChecker.value.style.color = strongColor;
        callback();
      } else {
        strengthChecker.value.innerText = 'Medium';
        strengthChecker.value.style.color = mediumColor;
        callback();
      }
    };
    const passwordConfirmChecker = (rule, value, callback) => {
      if (value !== form.model.password) {
        callback(new Error('* 两次输入密码不一致'));
      }
      callback();
    };
    // form data
    const form = reactive({
      model: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        hostname: '',
        blogName: ''
      },
      rules: {
        username: [
          { required: true, message: '* 用户名不能为空', trigger: ['change'] },
          { max: 50, message: '* 用户昵称长度不能超过50', trigger: ['change'] }
        ],
        email: [
          { required: true, message: '* email不能为空', trigger: ['change'] },
          { type: 'email', message: '* 请输入合法的email', trigger: 'change' }
        ],
        password: [
          { required: true, message: '* 密码不能为空', trigger: ['change'] },
          {
            validator: passwordStrengthChecker,
            trigger: 'change'
          }
        ],
        confirmPassword: [
          {
            required: true,
            message: '* 确认密码不能为空',
            trigger: 'change'
          },
          {
            validator: passwordConfirmChecker,
            trigger: 'change'
          }
        ],
        hostname: [
          {
            required: true,
            message: '* 博客地址不能为空',
            trigger: ['change']
          }
        ],
        blogName: [
          {
            required: true,
            message: '* 博客标题不能为空',
            trigger: 'change'
          },
          {
            max: 100,
            message: '* 博客标题过长',
            trigger: 'change'
          }
        ]
      },
      installErrored: false,
      installing: false
    });
    // form dom element
    const installationForm = ref(null);

    // methods
    const verifyIsInstalled = async () => {
      const response = await metaApi.isInstalled();
      logger.info(response.data);
      if (response.data.data) {
        await router.replace({ name: 'login' });
      }
    };

    const handleInstall = () => {
      installationForm.value.validate((valid) => {
        if (valid) {
          form.installing = true;
          store
            .dispatch('app/install', form.model)
            .then((response) => {
              logger.info(response);
              const success = response.data.success;
              if (success) {
                form.installing = false;
                setDocumentTitle(form.model.blogName);
              } else {
                form.installErrored = true;
                form.installing = false;
              }
            })
            .catch(() => {
              form.installErrored = true;
              form.installing = false;
            });
        }
      });
    };

    const handleInstallCallback = () => {
      if (form.installErrored) {
        form.installErrored = false;
      } else {
        ElMessage.success({
          center: true,
          message: '安装成功！',
          duration: 1000
        });
        router.replace({ name: 'login' });
      }
    };

    const submitForm = async () => {
      await handleInstall();
      setTimeout(handleInstallCallback, 400);
    };

    // lifecycle hooks
    // onCreated
    verifyIsInstalled();
    onBeforeMount(() => {
      form.model.hostname =
        window.location.protocol + '//' + window.location.host;
    });

    return {
      VERSION,
      strengthChecker,
      form,
      installationForm,
      handleInstallCallback,
      handleInstall,
      submitForm
    };
  }
});
</script>

<style lang="scss" scoped>
// applied to all icon
:deep(.el-input__prefix) {
  margin: 0 6px;
}

// fix for fontawesome icon
:deep(.el-input__icon) {
  width: 1em;
}

:deep(.el-input__prefix) svg {
  vertical-align: middle;
}
// end of fix for fontawesome icon

// el-divider
:deep(.el-divider--horizontal) {
  margin-top: 36px;
}

:deep(.el-divider__text.is-left) {
  left: 14px;
  padding-left: 10px;
  font-size: 15px;
}

// welcome message
:deep(.el-alert__description) {
  font-size: 14px;
}

:deep(.el-card__body) {
  padding-bottom: 30px;
}

:deep(.el-input__suffix) {
  right: 10px;
}

:deep(.el-form-item__error) {
  position: relative;
  top: 0;
  margin-bottom: -10px;
}

.el-row {
  height: 100vh;
}

.el-col {
  max-width: 640px;
  //position: relative;
  //top: 12%;
}

.el-button {
  width: 100%;
  margin: 8px 0;
}

#purr-logo {
  display: flex;
  justify-content: center;
  font-size: 32px;
  font-weight: 900;
  margin-bottom: 10px;

  span {
    vertical-align: text-bottom;
    display: inline-block;
    color: var(--el-color-primary);
    background-image: linear-gradient(315deg, #0acffe 0%, #495affaa 100%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }

  small {
    font-size: 0.4em;
    margin-left: 12px;
  }
}

#welcome-message {
  margin: 15px auto 0 auto;
}

#strengthHint {
  margin-right: 6px;
}
</style>
