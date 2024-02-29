from flask import Flask, Response, request
import cv2

app = Flask(__name__)

# 使用OpenCV捕获RTSP视频流
def gen_frames(rtsp_stream_url):  
    cap = cv2.VideoCapture(rtsp_stream_url)
    while True:
        success, frame = cap.read()  # 读取视频帧
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result

@app.route('/video_feed')
def video_feed():
    # 视频流路由。将视频流作为响应返回。
    rtsp_stream_url = request.args.get('rtsp_stream_url', '')  # 从URL参数中获取RTSP流地址
    print(rtsp_stream_url)
    return Response(gen_frames(rtsp_stream_url),
                    mimetype='multipart/x-mixed-replace; boundary=frame')
    
@app.route('/')
def index():
    return 'Hello World!'


app.run(host='0.0.0.0', port=5000)