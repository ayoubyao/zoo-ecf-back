import type { NextPage } from 'next';
import Index from '@/app/(dashboard)/user/index'

import React from 'react';

export interface IUserListPageProps {};

const UserListPage: NextPage<IUserListPageProps> = (props) => {
    

    return <Index />;
};

export default UserListPage;