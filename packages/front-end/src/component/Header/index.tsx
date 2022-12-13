import React, { useContext } from "react"
import { RouteConfigComponentProps } from "react-router-config"
import styles from "./style.module.scss"
import { observer } from "mobx-react"
import { useStore } from "../../store"
import MetaMaskSDK from "@metamask/sdk"
import { Button, Dropdown, Space, Input } from "antd"
import type { MenuProps } from "antd"
import {
    DownOutlined,
    SmileOutlined,
    UserOutlined,
    HeartOutlined,
} from "@ant-design/icons"

interface IProps extends RouteConfigComponentProps {}

const items: MenuProps["items"] = [
    {
        key: "1",
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.antgroup.com"
            >
                Profile
            </a>
        ),
    },
    {
        key: "2",
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.aliyun.com"
            >
                Favorite
            </a>
        ),
        icon: <HeartOutlined />,
    },
    {
        key: "3",
        label: (
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.luohanacademy.com"
            >
                Watchlist
            </a>
        ),
        icon: <SmileOutlined />,
    },
]

export const Header: React.FC<IProps> = observer(() => {
    const { auth } = useStore()
    return (
        <div className={styles.header}>

            <div className={styles.logoText}>Renting Stars</div>
            {!auth.user ? (
                <Button
                    onClick={() => {
                        auth.getPrivateKey()
                    }}
                >
                    Connect to the Wallet
                </Button>
            ) : (
                <div className={styles.inputAndUser}>
                    <Input placeholder="Search for you NFT"/>
                    <Dropdown menu={{ items }}>
                        <Space>
                            <UserOutlined className={styles.userIcon} />
                            <DownOutlined />
                        </Space>
                    </Dropdown>
                </div>
            )}
        </div>
    )
})
