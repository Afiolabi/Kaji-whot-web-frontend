/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

const CelebrityOnboarding = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    console.log('Celebrity application:', data);
    // Submit to API
    setStep(step + 1);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Celebrity Verification</h1>
        <p className="text-gray-600">Complete the verification process to unlock celebrity features</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                s <= step ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              {s < step ? <CheckCircle className="w-6 h-6" /> : s}
            </div>
            {s < 3 && (
              <div className={`w-32 h-1 ${s < step ? 'bg-primary-500' : 'bg-gray-300'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Step 1: Identity Verification</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Government ID
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <input type="file" className="hidden" {...register('idDocument')} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selfie Verification
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload a clear selfie</p>
                <input type="file" className="hidden" {...register('selfie')} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-600"
            >
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Step 2: Social Media Verification</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram Handle
              </label>
              <input
                type="text"
                placeholder="@username"
                className="input-field"
                {...register('instagram')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter Handle
              </label>
              <input
                type="text"
                placeholder="@username"
                className="input-field"
                {...register('twitter')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Follower Count
              </label>
              <input
                type="number"
                placeholder="Total followers across platforms"
                className="input-field"
                {...register('followerCount')}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary-500 text-white font-bold rounded-lg hover:bg-primary-600"
            >
              Continue
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Step 3: Profile Setup</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stage Name
              </label>
              <input
                type="text"
                placeholder="Your celebrity name"
                className="input-field"
                {...register('stageName')}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                placeholder="Tell your fans about yourself"
                className="input-field"
                {...register('bio')}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
            >
              Submit Application
            </button>
          </form>
        )}

        {step > 3 && (
          <div className="text-center py-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600">
              Your celebrity verification is under review. We'll notify you within 24-48 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CelebrityOnboarding;