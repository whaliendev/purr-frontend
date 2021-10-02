<template>
  <div>
    <el-row justify="center" align="middle">
      <div class="bg"></div>
      <el-col :xs="22" :sm="18" :md="16" :lg="16" :xl="12">
        <div class="container animated fadeInUp">
          <!--  login card  -->
          <el-card shadow="always" id="#login-card" v-if="isLoginMode">
            <section class="purr-logo">
              <span>Purr</span>
              <el-icon :size="16" :color="iconColor" @click="toggleMode">
                <setting />
              </el-icon>
            </section>
            <el-form :model="loginForm.model" :rules="loginForm.rules">
              <el-form-item prop="username">
                <el-input
                  prefix-icon="el-icon-user"
                  placeholder="用户名/邮箱"
                  v-model="loginForm.model.username"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  prefix-icon="el-icon-lock"
                  placeholder="登录密码"
                  v-model="loginForm.model.password"
                  type="password"
                  :show-password="true"
                ></el-input>
              </el-form-item>
              <reactive-button
                native-type="submit"
                text="登录"
                type="danger"
                size="medium"
              >
              </reactive-button>
            </el-form>
          </el-card>
          <!--  end of login card-->
          <!--  start of settings card-->
          <el-card shadow="always" id="#settings-card" v-if="!isLoginMode">
            <section class="purr-logo">
              <span>Purr<small>API设置</small></span>
              <el-icon :size="16" :color="iconColor" @click="toggleMode">
                <back />
              </el-icon>
            </section>
            <el-form :model="settingsFrom.model" :rules="settingsFrom.rules">
              <el-form-item prop="apiUrl">
                <el-popover
                  trigger="click"
                  placement="bottom"
                  content="如果前后端不是分别部署，请不要修改此项"
                >
                  <template #reference>
                    <el-input
                      prefix-icon="el-icon-link"
                      placeholder="e.g.: https://purr.group, 注意不用携带/api"
                      v-model="settingsFrom.model.apiUrl"
                    ></el-input>
                  </template>
                </el-popover>
              </el-form-item>
              <reactive-button
                size="medium"
                type="danger"
                text="恢复默认"
                @click="resetApiUrl"
              >
              </reactive-button>
              <reactive-button size="medium" type="danger" text="保存设置">
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

export default defineComponent({
  components: { Setting, Back, ReactiveButton },
  setup() {
    const iconColor = ref(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--el-color-danger')
        .trim()
    );

    // 切换登录设置
    const loginMode = ref('login');
    const isLoginMode = computed(() => loginMode.value === 'login');
    const toggleMode = () => {
      loginMode.value = loginMode.value === 'login' ? 'settings' : 'login';
      console.log(loginMode.value);
    };

    // 与login相关的操作
    const loginForm = reactive({
      model: {
        username: '',
        password: ''
      },
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
        ]
      },
      loading: false
    });

    // 与设置相关的操作
    const settingsFrom = reactive({
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

    onBeforeMount(() => {
      settingsFrom.model.apiUrl =
        window.location.protocol + '//' + window.location.host;
    });
    const resetApiUrl = () => {
      settingsFrom.model.apiUrl =
        window.location.protocol + '//' + window.location.host;
    };

    return {
      iconColor,
      isLoginMode,
      loginMode,
      toggleMode,
      loginForm,
      settingsFrom,
      resetApiUrl
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
