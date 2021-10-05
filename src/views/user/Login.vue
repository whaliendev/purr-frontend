<template>
  <div>
    <el-row align="middle" justify="center">
      <div class="bg"></div>
      <el-col :lg="16" :md="16" :sm="18" :xl="12" :xs="22">
        <div class="container animated fadeInUp">
          <!--  login card  -->
          <el-card v-if="isLoginMode" id="#login-card" shadow="always">
            <div class="purr-logo">
              <span>Purr</span>
              <el-icon :color="purrColorDanger" :size="16" @click="toggleMode">
                <setting />
              </el-icon>
            </div>
            <el-form
              ref="domLoginForm"
              :model="loginForm.model"
              :rules="loginForm.rules"
              @submit.prevent="submitLoginForm"
            >
              <el-form-item prop="username">
                <el-input
                  v-model="loginForm.model.username"
                  placeholder="用户名/邮箱"
                  prefix-icon="el-icon-user"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginForm.model.password"
                  :show-password="true"
                  placeholder="登录密码"
                  prefix-icon="el-icon-lock"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="isSuccessful">
                <slider-verification
                  :is-successful="loginForm.model.isSuccessful"
                  :slider-bg="purrColorDanger"
                  :success-bg="purrColorSuccess"
                  is-locked="false"
                  @update:is-successful="loginForm.model.isSuccessful = $event"
                >
                  <template #icon>
                    <font-awesome-icon :icon="['fas', 'plane']" />
                  </template>
                </slider-verification>
              </el-form-item>
              <reactive-button
                :errored="loginForm.errored"
                :loading="loginForm.loading"
                errored-text="登录失败"
                loaded-text="登陆成功"
                native-type="submit"
                size="medium"
                text="登录"
                type="danger"
                @callback="handleLoginCallback"
                @click="handleLogin"
              >
              </reactive-button>
            </el-form>
          </el-card>
          <!--  end of login card-->
          <!--  start of settings card-->
          <el-card v-if="!isLoginMode" id="#settings-card" shadow="always">
            <div class="purr-logo">
              <span>Purr<small>API设置</small></span>
              <el-icon :color="purrColorDanger" :size="16" @click="toggleMode">
                <back />
              </el-icon>
            </div>
            <el-form
              ref="domSettingsForm"
              :model="settingsFrom.model"
              :rules="settingsFrom.rules"
              @submit.prevent="submitSettingsForm"
            >
              <el-form-item prop="apiUrl">
                <el-popover
                  content="如果前后端不是分别部署，请不要修改此项"
                  placement="bottom"
                  trigger="click"
                >
                  <template #reference>
                    <el-input
                      v-model="settingsFrom.model.apiUrl"
                      placeholder="e.g.: https://purr.group, 注意不用携带/api"
                      prefix-icon="el-icon-link"
                    ></el-input>
                  </template>
                </el-popover>
              </el-form-item>
              <reactive-button
                size="medium"
                text="恢复默认"
                type="danger"
                @click="resetApiUrl"
              >
              </reactive-button>
              <reactive-button
                :errored="settingsFrom.errored"
                :loading="settingsFrom.loading"
                errored-text="更新失败"
                loaded-text="更新成功"
                native-type="submit"
                size="medium"
                text="保存设置"
                type="danger"
                @callback="handleUpdateCallback"
                @click="handleUpdate"
              >
              </reactive-button>
            </el-form>
          </el-card>
          <!--  end of settings card-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { computed, defineComponent, onBeforeMount, reactive, ref } from 'vue';
import ReactiveButton from '../../components/Button/ReactiveButton';
import Setting from '../../components/Icon/Setting';
import Back from '../../components/Icon/Back';
import SliderVerification from '../../components/Slider/SliderVerification';
import { useStore } from 'vuex';
import { useLogger } from 'vue-logger-plugin';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default defineComponent({
  components: { SliderVerification, Setting, Back, ReactiveButton },
  setup() {
    const store = useStore();
    const logger = useLogger();
    const router = useRouter();

    const purrColorDanger = ref(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--el-color-danger')
        .trim()
    );
    const purrColorWarning = ref(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--el-color-warning')
        .trim()
    );
    const purrColorSuccess = ref(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--el-color-success')
        .trim()
    );

    // 切换登录设置
    const loginMode = ref('login');
    const isLoginMode = computed(() => loginMode.value === 'login');
    const toggleMode = () => {
      loginMode.value = loginMode.value === 'login' ? 'settings' : 'login';
    };

    // 与login相关的操作
    const domLoginForm = ref(null);
    const loginForm = reactive({
      model: {
        username: '',
        password: '',
        isSuccessful: false
      },
      loading: false,
      errored: false,

      rules: {
        username: [],
        password: [
          { required: true, message: '* 密码不能为空', trigger: ['change'] },
          {
            min: 8,
            max: 30,
            message: '* 密码长度为8-30位',
            trigger: ['change']
          }
        ],
        isSuccessful: []
      }
    });
    const handleLogin = () => {
      domLoginForm.value.validate((valid) => {
        if (valid) {
          loginForm.loading = true;
          const loginData = {
            username: loginForm.model.username,
            password: loginForm.model.password
          };
          logger.info(loginData);
          store
            .dispatch('login', loginData)
            .then((response) => {
              if (response.data.success) {
                loginForm.loading = false;
              } else {
                loginForm.errored = true;
                loginForm.loading = false;
              }
            })
            .catch(() => {
              loginForm.errored = true;
              loginForm.loading = false;
            });
        }
      });
    };
    const handleLoginCallback = () => {
      if (loginForm.errored) {
        loginForm.errored = false;
      } else {
        ElMessage.success({
          center: true,
          message: '登录成功！',
          duration: 1000
        });
        router.replace({ name: 'dashboard' });
      }
    };
    const submitLoginForm = async () => {
      await handleLogin();
      setTimeout(handleLoginCallback, 400);
    };

    // 与设置相关的操作
    const domSettingsForm = ref(null);
    const settingsForm = reactive({
      model: {
        apiUrl: ''
      },
      rules: {
        apiUrl: [
          {
            required: true,
            message: '* api 基地址不能为空',
            trigger: 'change'
          },
          {
            validator: (rule, value, callback) => {
              if (value.endsWith('http')) {
                callback(new Error('* api地址不合法'));
              }
              callback();
            },
            trigger: 'change'
          }
        ]
      },
      loading: false,
      errored: false
    });
    const handleUpdate = () => {
      domSettingsForm.value.validate((valid) => {
        if (valid) {
          settingsForm.loading = true;
          const settingsData = {
            apiUrl: settingsForm.model.apiUrl
          };
          logger.info(settingsData);
          store.dispatch('app/updateApiUrl', settingsData).then((response) => {
            if (response.data.success) {
              settingsForm.loading = false;
            } else {
              settingsForm.loading = false;
              settingsForm.errored = true;
            }
          });
        }
      });
    };
    const handleUpdateCallback = () => {
      if (settingsForm.errored) {
        settingsForm.errored = false;
      } else {
        ElMessage.success({
          center: true,
          message: '更新成功！',
          duration: 1000
        });
      }
    };
    const submitSettingsForm = async () => {
      await handleUpdate();
      setTimeout(handleUpdateCallback, 400);
    };

    onBeforeMount(() => {
      settingsForm.model.apiUrl =
        window.location.protocol + '//' + window.location.host;
    });
    const resetApiUrl = () => {
      const url = window.location.protocol + '//' + window.location.host;
      store.dispatch('app/updateApiUrl', { apiUrl: url }).then((response) => {
        if (response.data.success) {
          settingsForm.model.apiUrl = url;
          ElMessage.success({
            center: true,
            message: '更新成功',
            duration: 1000
          });
        }
      });
    };

    return {
      purrColorDanger,
      purrColorSuccess,
      purrColorWarning,
      isLoginMode,
      loginMode,
      toggleMode,
      loginForm,
      settingsFrom: settingsForm,
      resetApiUrl,
      handleLogin,
      domLoginForm,
      handleLoginCallback,
      domSettingsForm,
      handleUpdate,
      handleUpdateCallback,
      submitLoginForm,
      submitSettingsForm
    };
  }
});
</script>

<style lang="scss" scoped>
:deep(.el-row) {
  height: 100vh;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background-image: url('../../assets/bg_login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top 16%;
  }

  .container {
    position: relative;

    // frosted glass effect
    &::after {
      content: ' ';
      position: absolute;
      width: 96%;
      height: 96%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: -5;
      background-image: url('../../assets/bg_login.jpg');
      background-position: left 75% top 16%;
      background-size: cover;
      background-repeat: no-repeat;
      filter: blur(8px);
    }
  }

  .purr-logo {
    display: flex;
    justify-content: center;
    font-size: 32px;
    font-weight: 900;
    margin-bottom: 16px;

    span {
      display: inline-block;
      margin-left: auto;
      background-color: var(--el-color-danger);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }

    small {
      font-size: 0.4em;
      margin-left: 12px;
    }
  }
}

.el-col {
  max-width: 400px;
}

.el-card {
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.32);
}

.el-button {
  display: block;
  width: 100%;
  margin: 28px auto 8px;
  opacity: 0.72;
}

.el-icon {
  display: block;
  margin: 6px 8px 0 auto;
  align-self: center;
}

.el-icon:hover {
  filter: brightness(108);
}
</style>
