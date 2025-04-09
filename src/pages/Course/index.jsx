import React, { useState, useEffect } from "react";
import { Card, Input, Select, Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import CourseCard from "../../components/CourseCard";
import axios from "axios";

const { Option } = Select;
const { Search } = Input;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sort, setSort] = useState("best");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 12;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:5000/categories");
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const fetchCourses = async (pageNumber = page, reset = false) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/courses/student",
        {
          params: {
            searchValue,
            category,
            type,
            sort,
            page: pageNumber,
            limit: pageSize,
          },
        }
      );

      const newCourses = response.data.data || [];

      if (reset) {
        setCourses(newCourses);
      } else {
        setCourses((prev) => [...prev, ...newCourses]);
      }

      if (newCourses.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Lỗi khi tải khóa học:", error);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchCourses(1, true);
  }, [searchValue, category, type, sort]);

  const fetchNext = () => {
    setPage((prevPage) => {
      const nextPage = prevPage + 1;
      fetchCourses(nextPage);
      return nextPage;
    });
  };

  return (
    <Row gutter={[40, 0]} className="mt-5">
      {/* Sidebar lọc */}
      <Col span={6}>
        <Card title="Lọc theo" bordered={false}>
          <div className="mb-2 font-semibold">Loại khóa học</div>
          <Select
            placeholder="Chọn loại"
            value={type}
            onChange={(value) => setType(value)}
            allowClear
            className="mb-4"
            style={{ width: "100%" }}
          >
            <Option value="online">Online</Option>
            <Option value="offline">Offline</Option>
          </Select>

          <div className="mb-2 font-semibold">Chủ đề</div>
          <Select
            placeholder="Chọn danh mục"
            value={category}
            onChange={(value) => setCategory(value)}
            allowClear
            style={{ width: "100%" }}
            className="mb-4"
          >
            {categories.map((cate) => (
              <Option key={cate.id} value={cate.id}>
                {cate.name}
              </Option>
            ))}
          </Select>
        </Card>
      </Col>

      {/* Kết quả */}
      <Col span={18}>
        <Row gutter={16}>
          <Col span={18}>
            <Search
              placeholder="Tìm khóa học"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={() => fetchCourses(1, true)}
              enterButton
              className="mb-4"
            />
          </Col>
          <Col span={6}>
            <Select
              value={sort}
              style={{ width: "100%" }}
              className="mb-4"
              onChange={(value) => setSort(value)}
            >
              <Option value="best">Phù hợp nhất</Option>
              <Option value="newest">Mới nhất</Option>
              <Option value="priceLow">Giá thấp đến cao</Option>
              <Option value="priceHigh">Giá cao đến thấp</Option>
            </Select>
          </Col>
        </Row>

        <h3>Danh sách khóa học</h3>
        <InfiniteScroll
          dataLength={courses.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={<p style={{ textAlign: "center" }}>Đang tải khóa học...</p>}
        >
          <div style={{ overflowX: "hidden", padding: "10px 0px" }}>
            <Row gutter={[16, 16]}>
              {courses.map((course) => (
                <Col span={8} key={course.id}>
                  <CourseCard course={course} />
                </Col>
              ))}
            </Row>
          </div>
        </InfiniteScroll>
      </Col>
    </Row>
  );
};

export default Courses;
