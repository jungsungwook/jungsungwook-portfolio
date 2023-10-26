import { atom } from 'recoil';

const enableScrollState = atom({
    key: 'enableScrollState',
    default: true,
});

export { enableScrollState };