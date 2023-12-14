const AwardPage = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
        }}>
            <div className="profile-skill"
                style={{
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
                <div className="profile-skill-title"
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
                        Awards
                    </span>
                </div>
                <hr style={{
                    width: "95%",
                    margin: "5px 0 0 0",
                    border: "2px solid rgba(0,0,0,.15)",
                }} />
                <div className="profile-skill-content"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        width: "100%",
                    }}
                >
                    <div className="profile-skill-content-item"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            2016
                        </span>
                        <div className="experience-content">
                            <span className="en"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                서울특별시 IT창의성대회 <span style={{
                                    fontSize: "14px",
                                    color: "#95680e",
                                }}>| 동상</span>
                            </span>
                        </div>
                    </div>
                    <hr style={{
                        width: "95%",
                        margin: "5px 0 0 0",
                        border: "0.1px solid rgba(0,0,0,.15)",
                    }} />
                    <div className="profile-skill-content-item"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            2017
                        </span>
                        <div className="experience-content">
                            <span className="en"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                강남대학교 소프트웨어학부 학술대회
                            </span>
                            <span className="en"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                (1학기) 출품 작품 : Unity를 이용한 FPS게임 <span style={{
                                    fontSize: "14px",
                                    color: "#A3A3A3",
                                }}>| 우수상</span> <span style={{
                                    fontSize: "14px",
                                    color: "#2E9AFE",
                                }} onClick={() => { window.open("/project/1", "_blank") }}>[ 자세히 보기 ]</span>
                            </span>
                            <span className="en"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                (2학기) 출품 작품 : Unity를 이용한 게임 <span style={{
                                    fontSize: "14px",
                                    color: "#A3A3A3",
                                }}>| 우수상</span> <span style={{
                                    fontSize: "14px",
                                    color: "#2E9AFE",
                                }} onClick={() => { window.open("/project/1", "_blank") }}>[ 자세히 보기 ]</span>
                            </span>
                        </div>
                    </div>
                    <hr style={{
                        width: "95%",
                        margin: "5px 0 0 0",
                        border: "0.1px solid rgba(0,0,0,.15)",
                    }} />
                    <div className="profile-skill-content-item"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            2018
                        </span>
                        <div className="experience-content">
                            <span className="en"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                강남대학교 소프트웨어학부 학술대회
                            </span>
                            <span className="en"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                (2학기) 출품 작품 : 파이썬과 유니티로 개발한 모의투자 서비스 및 어플리케이션 <span style={{
                                    fontSize: "14px",
                                    color: "#A3A3A3",
                                }}>| 우수상</span> <span style={{
                                    fontSize: "14px",
                                    color: "#2E9AFE",
                                }} onClick={() => { window.open("/project/1", "_blank") }}>[ 자세히 보기 ]</span>
                            </span>
                        </div>
                    </div>
                    <hr style={{
                        width: "95%",
                        margin: "5px 0 0 0",
                        border: "0.1px solid rgba(0,0,0,.15)",
                    }} />
                    <div className="profile-skill-content-item"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                        }}
                    >
                        <span className="en"
                            style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                            }}
                        >
                            2019
                        </span>
                        <div className="experience-content">
                            <span className="en"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                강남대학교 소프트웨어학부 학술대회
                            </span>
                            <span className="en"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                (1학기) 출품 작품 : OpenCV 및 Tensorflow를 이용한 게임 내 자율주행 프로그램 <span style={{
                                    fontSize: "14px",
                                    color: "#D5A11E",
                                }}>| 최우수상</span> <span style={{
                                    fontSize: "14px",
                                    color: "#2E9AFE",
                                }} onClick={() => { window.open("/project/1", "_blank") }}>[ 자세히 보기 ]</span>
                            </span>
                            <span className="en"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                (2학기) 출품 작품 : Tensorflow와 LSTM 모델을 활용한 카카오톡 대화내용 분석 프로그램 <span style={{
                                    fontSize: "14px",
                                    color: "#D5A11E",
                                }}>| 최우수상</span> <span style={{
                                    fontSize: "14px",
                                    color: "#2E9AFE",
                                }} onClick={() => { window.open("/project/1", "_blank") }}>[ 자세히 보기 ]</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AwardPage;