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
    IdcardOutlined,
} from "@ant-design/icons"
import { Link } from "react-router-dom"

interface IProps extends RouteConfigComponentProps {}

export const Header: React.FC<IProps> = observer(() => {
    const { auth } = useStore()

    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <a
                    onClick={(e) => {
                        e.preventDefault()
                        if (auth.user) {
                            alert(
                                `You are connected with this Wallet ${auth.user[0]}`
                            )
                        }
                    }}
                    rel="noopener noreferrer"
                >
                    Profile
                </a>
            ),
            icon: <IdcardOutlined />,
        },
        {
            key: "2",
            label: <a rel="noopener noreferrer">Favorite</a>,
            icon: <HeartOutlined />,
        },
        {
            key: "3",
            label: <a rel="noopener noreferrer">Watchlist</a>,
            icon: <SmileOutlined />,
        },
    ]

    return (
        <div className={styles.header}>
            <Link to="/home" className={styles.notUgly}>
                <div className={styles.logoText}>Renting Stars</div>
            </Link>

            <Link to="gallery" className={styles.notUgly}>
                <div className={styles.Gallery}>Gallery</div>
            </Link>

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
                    <Input size="large" placeholder="Search for you NFT" />
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
