<script setup lang="ts">
import ArrowDown from '@/assets/ArrowDown.svg?component'
const NavEls: { label: string; icon: string; key: number }[] = [
  {
    label: 'My Accounts',
    icon: 'MyAccount.svg',
    key: 0,
  },
  {
    label: 'Transactions',
    icon: 'Transaction.svg',
    key: 1,
  },
  {
    label: 'Manage Cards',
    icon: 'ManageCards.svg',
    key: 2,
  },
  {
    label: 'Deposit Money',
    icon: 'DepositMoney.svg',
    key: 3,
  },
  {
    label: 'Convert Money',
    icon: 'ConvertMoney.svg',
    key: 4,
  },
  {
    label: 'Live Chat',
    icon: './LiveChat.svg',
    key: 5,
  },
]
const toggleSidebarVisibility = () => {
  const appContainer = document.querySelector('#app')

  if (!appContainer) {
    return
  }

  appContainer.classList.toggle('sidebar-visible')

  if (appContainer.classList.contains('sidebar-visible')) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}
</script>

<template>
  <aside id="app-sidebar" class="app-sidebar">
    <slot name="header" />
    <div @click="toggleSidebarVisibility" class="app-sidebar-toggle">
      <ArrowDown />
    </div>
    <div class="app-sidebar__content">
      <nav>
        <ul>
          <template v-for="item in NavEls" :key="item.key">
            <li tabindex="0" :title="item.label">
              <img :src="item.icon" />
              <span>
                {{ item.label }}
              </span>
            </li>
          </template>
        </ul>
      </nav>
    </div>
    <div class="app-sidebar__featured">
      <slot name="featured" />
    </div>
  </aside>
</template>

<style lang="scss">
.app-sidebar {
  width: 228px;
  background: #0e0d52;
  box-shadow: 0px 3px 7px #d7d9de;
  border-radius: 4px;
  max-height: calc(100vh - 32px);
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
}

.app-sidebar__content {
  padding-top: 24px;

  nav ul li {
    padding-left: 20px;
    display: flex;
    align-items: center;
    gap: 16px;
    cursor: pointer;

    img {
      width: 24px;
      height: 24px;
    }

    span {
      font-family: Montserrat;
      font-size: 14px;
      line-height: 51px;
      color: #cad5f9;
    }
  }
}

.app-sidebar__featured {
  margin-top: auto;
}

.app-sidebar-toggle {
  display: none;
}

@media screen and (max-width: 767px) {
  .app-sidebar {
    margin-left: 0;
    margin-top: 16px;
  }

  .app-sidebar-toggle {
    background-color: #edf6ff;
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    right: -40px;
    top: 0px;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      transition: transform 0.3s ease-in-out;
      transform: rotate(-90deg);

      .sidebar-visible & {
        transform: rotate(90deg);
      }
    }
  }
}
</style>
