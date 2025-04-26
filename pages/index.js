
import { useState } from 'react';

export default function Home() {
  const [sitters, setSitters] = useState([]);
  const [parentForm, setParentForm] = useState({
    parentName: '',
    childAge: '',
    location: '',
    schedule: '',
    needs: '',
  });
  const [sitterForm, setSitterForm] = useState({
    sitterName: '',
    experience: '',
    languages: '',
    availableTime: '',
    location: '',
    photoUrl: '',
  });
  const [matchedSitter, setMatchedSitter] = useState(null);

  const handleParentChange = (e) => {
    setParentForm({ ...parentForm, [e.target.name]: e.target.value });
  };

  const handleSitterChange = (e) => {
    setSitterForm({ ...sitterForm, [e.target.name]: e.target.value });
  };

  const handleParentSubmit = () => {
    const match = sitters.find(
      (sitter) =>
        sitter.location.toLowerCase().includes(parentForm.location.toLowerCase()) &&
        sitter.availableTime.toLowerCase().includes(parentForm.schedule.toLowerCase())
    );
    setMatchedSitter(match);
    alert('부모 신청 완료! 매칭된 시터를 확인하세요.');
  };

  const handleSitterSubmit = () => {
    if (!sitterForm.photoUrl) sitterForm.photoUrl = 'https://via.placeholder.com/100';
    setSitters([...sitters, sitterForm]);
    setSitterForm({
      sitterName: '', experience: '', languages: '', availableTime: '', location: '', photoUrl: '',
    });
    alert('시터 등록 완료!');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '1rem' }}>👶 부모 신청서</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
        <input name="parentName" placeholder="부모 이름" value={parentForm.parentName} onChange={handleParentChange} />
        <input name="childAge" placeholder="아이 나이" value={parentForm.childAge} onChange={handleParentChange} />
        <input name="location" placeholder="희망 지역" value={parentForm.location} onChange={handleParentChange} />
        <input name="schedule" placeholder="희망 시간대" value={parentForm.schedule} onChange={handleParentChange} />
        <input name="needs" placeholder="요청사항" value={parentForm.needs} onChange={handleParentChange} />
        <button onClick={handleParentSubmit}>신청하기</button>
      </div>

      {matchedSitter && (
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', maxWidth: '400px' }}>
          <h2>✅ 매칭된 시터</h2>
          <img src={matchedSitter.photoUrl} alt="시터" style={{ width: '80px', borderRadius: '50%' }} />
          <p><strong>이름:</strong> {matchedSitter.sitterName}</p>
          <p><strong>경력:</strong> {matchedSitter.experience}</p>
          <p><strong>언어:</strong> {matchedSitter.languages}</p>
          <p><strong>시간대:</strong> {matchedSitter.availableTime}</p>
          <p><strong>지역:</strong> {matchedSitter.location}</p>
        </div>
      )}

      <h1 style={{ fontSize: '24px', marginTop: '3rem', marginBottom: '1rem' }}>🧑‍🏫 시터 등록</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
        <input name="sitterName" placeholder="이름" value={sitterForm.sitterName} onChange={handleSitterChange} />
        <input name="experience" placeholder="경력" value={sitterForm.experience} onChange={handleSitterChange} />
        <input name="languages" placeholder="가능 언어" value={sitterForm.languages} onChange={handleSitterChange} />
        <input name="availableTime" placeholder="가능 시간대" value={sitterForm.availableTime} onChange={handleSitterChange} />
        <input name="location" placeholder="가능 지역" value={sitterForm.location} onChange={handleSitterChange} />
        <input name="photoUrl" placeholder="사진 URL (선택)" value={sitterForm.photoUrl} onChange={handleSitterChange} />
        <button onClick={handleSitterSubmit}>등록하기</button>
      </div>

      <h2 style={{ fontSize: '20px', marginTop: '3rem' }}>📋 등록된 시터 목록</h2>
      <div style={{ display: 'grid', gap: '16px', marginTop: '1rem' }}>
        {sitters.map((sitter, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '8px', maxWidth: '400px' }}>
            <img src={sitter.photoUrl} alt="시터" style={{ width: '60px', borderRadius: '50%' }} />
            <p><strong>{sitter.sitterName}</strong></p>
            <p>{sitter.languages}</p>
            <p>{sitter.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
