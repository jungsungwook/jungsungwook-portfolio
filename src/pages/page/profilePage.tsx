const ProfilePage = () => {
    return (
            <div style={{
                // 수직 정렬
                display: "flex",
                flexDirection: "column",
            }}>
                <div className="profile"
                    style={{
                        // 화면 가운데로
                        display: "flex",
                        alignItems: "flex-end",
                        flexDirection: "row",
                    }}
                >
                    <div className="profile-img">
                        <img
                            src="/profile.jpg"
                            style={{
                                width: "120px",
                                height: "150px",
                                border: "0.1px solid rgba(0,0,0,.15)",
                            }}
                        />
                    </div>
                    <div className="profile-info"
                        style={{
                            //  왼쪽으로 붙이기
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                            // 맨 위로 붙이기
                            marginTop: "0px",
                            // 왼쪽으로 붙이기
                            marginLeft: "20px",
                            // 간격
                            gap: "9px",
                        }}
                    >
                        <div className="profile-name">
                            <span className="en"
                                style={{
                                    // 이름 크게
                                    fontSize: "30px",
                                }}
                            >
                                <b>정</b>
                                <b>성</b>
                                <b>욱</b>
                            </span>
                            <span className="en">
                                <span style={{
                                    fontSize: "20px"
                                    // 연한 회색
                                    , color: "#999",
                                }}> | </span>
                                1998년
                                (만 24세)
                            </span>
                        </div>
                        <div className="profile-email">
                            <span className="en">
                                jswcyber@naver.com
                            </span>
                        </div>
                        <div className="profile-address">
                            <span className="en">
                                서울특별시 송파구
                            </span>
                        </div>
                    </div>
                </div>
                <div className="profile-sentence"
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginTop: "20px",
                    }}
                >
                    <span className="en"
                        style={{
                            fontSize: "18px",
                            // 왼쪽 정렬
                            textAlign: "left",
                            // 위아래 간격
                            lineHeight: "1.2",
                        }}
                    >
                        다양한 사람들과 소통하며<br />
                        새로운 기술과 언어에 구애 받지 않는<br />
                        도전하는 백엔드 개발자 정성욱입니다.
                    </span>
                </div>
                <hr style={{
                    width: "100%",
                    margin: "20px 0px",
                    border: "0.1px solid rgba(0,0,0,.15)",
                }} />
                <div className="profile-edu"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <div className="profile-edu-title"
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            Education
                        </span>
                    </div>
                    <div className="profile-edu-content"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                        }}
                    >
                        <div className="profile-edu-content-title"
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <span className="en"
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                }}
                            >
                                강남대학교
                            </span>
                            <span className="en"
                                style={{
                                    fontSize: "14px",
                                    color: "#999",
                                }}
                            >
                                (경기)
                            </span>
                        </div>
                        <div className="profile-edu-content-subtitle"
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <span className="en"
                                style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                소프트웨어응용학과 소프트웨어전공/가상현실복수전공
                            </span>
                        </div>
                        <div className="profile-edu-content-date"
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <span className="en"
                                style={{
                                    fontSize: "16px",
                                }}
                            >
                                2017.03 ~ 2019.12
                            </span>
                        </div>
                        <div className="profile-edu-content-desc"
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                            }}
                        >
                            <span className="en"
                                style={{
                                    fontSize: "16px",
                                }}
                            >
                                휴학 중
                            </span>
                        </div>
                    </div>
                </div>
                <hr style={{
                    width: "100%",
                    margin: "20px 0px",
                    border: "0.1px solid rgba(0,0,0,.15)",
                }} />
                <div className="profile-certificate"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <div className="profile-certificate-title"
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        >
                            Certificate
                        </span>
                    </div>
                    <div className="profile-certificate-content"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "5px",
                        }}
                    >
                        <div>
                            <div className="profile-certificate-content-title"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <span className="en"
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    정보처리산업기사
                                </span>
                                <span className="en"
                                    style={{
                                        fontSize: "16px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    2021.09
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="profile-certificate-content-title"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <span className="en"
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    정보처리기능사
                                </span>
                                <span className="en"
                                    style={{
                                        fontSize: "16px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    2016.04
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className="profile-certificate-content-title"
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}
                            >
                                <span className="en"
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Oracle Certified Java Programmer(OCJP)
                                </span>
                                <span className="en"
                                    style={{
                                        fontSize: "16px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    2016.04
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ProfilePage;