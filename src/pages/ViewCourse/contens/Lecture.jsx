import { Tabs, Spin, message, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import CommentBox from "../../../components/CommentBox";
import { useSelector } from "react-redux";
import { configs } from "../../../configs";
import NoteLecture from "../../../components/NoteLecture";

const { TabPane } = Tabs;

const Lecture = () => {
  const { lectureId } = useParams();
  const user = useSelector((state) => state.auth.userInfo);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const timestamp = searchParams.get("timestamp");

  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoKey, setVideoKey] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef(null);

  const fetchLecture = async () => {
    try {
      const response = await axios.get(
        `${configs.API_BASE_URL}/lectures/${lectureId}`
      );
      setLecture(response.data);
      setVideoKey(`video-${lectureId}-${Date.now()}`);
    } catch (error) {
      message.error(error.response?.data?.message || "Lỗi khi tải bài giảng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!lectureId) return;
    fetchLecture();
  }, [lectureId]);

  useEffect(() => {
    const video = videoRef.current;
    const seekTo = Number(timestamp);
  
    if (!video || isNaN(seekTo)) return;
  
    const handleSeek = () => {
      video.currentTime = seekTo;
    };
  
    video.addEventListener("loadedmetadata", handleSeek);
  
    return () => {
      video.removeEventListener("loadedmetadata", handleSeek);
    };
  }, [videoKey, timestamp]);

  useEffect(() => {
    const video = videoRef.current;
    const seekTo = Number(timestamp);

    if (!video || isNaN(seekTo)) return;

    const handleSeek = () => {
      video.currentTime = seekTo;
    };

    if (video.readyState >= 1) {
      handleSeek();
    } else {
      video.addEventListener("loadedmetadata", handleSeek);
      return () => video.removeEventListener("loadedmetadata", handleSeek);
    }
  }, [timestamp, location]);

  const handleTimeUpdate = () => {
    const time = videoRef.current?.currentTime || 0;
    setCurrentTime(Math.floor(time));
  };

  if (loading) {
    return (
      <Spin
        tip="Đang tải bài giảng..."
        style={{ display: "flex", justifyContent: "center", padding: 100 }}
      />
    );
  }

  return (
    <div style={{ width: "100%", paddingBottom: 100 }}>
      {lecture?.video?.file_url && (
        <div
          key={lectureId}
          style={{
            width: "100%",
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <video
            key={videoKey}
            width="80%"
            style={{ maxWidth: "70vw" }}
            controls
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={lecture.video.file_url} type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ phát video.
          </video>
        </div>
      )}

      <div style={{ padding: "0px 64px" }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tổng quan" key="1">
            <h3>{lecture?.title || "Không có tiêu đề"}</h3>
            <Typography.Paragraph style={{ whiteSpace: "pre-line" }}>
              {lecture?.description || "Không có mô tả."}
            </Typography.Paragraph>
          </TabPane>
          <TabPane tab="Hỏi đáp" key="2">
            <CommentBox contentType="lecture" contentId={lecture.id} />
          </TabPane>
          <TabPane tab="Ghi chú" key="3">
            <NoteLecture currentTime={currentTime} videoRef={videoRef} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Lecture;
