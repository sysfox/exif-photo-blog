import { AiContent } from './useAiImageQueries';
import { HiSparkles } from 'react-icons/hi';
import { AI_AUTO_GENERATED_FIELDS_ALL, AiAutoGeneratedField } from '.';
import { ComponentProps, useMemo } from 'react';
import LoaderButton from '@/components/primitives/LoaderButton';

export default function AiButton({
  aiContent,
  requestFields = AI_AUTO_GENERATED_FIELDS_ALL,
  shouldConfirm,
  ...props
}: {
  aiContent: AiContent
  requestFields?: AiAutoGeneratedField[]
  shouldConfirm?: boolean
  className?: string
} & ComponentProps<typeof LoaderButton>) {
  const isLoading = useMemo(() =>
    (requestFields ?? []).map(field => {
      switch (field) {
      case 'title':
        return aiContent.isLoadingTitle;
      case 'caption':
        return aiContent.isLoadingCaption;
      case 'tags':
        return aiContent.isLoadingTags;
      case 'semantic':
        return aiContent.isLoadingSemantic;
      default:
        return false;
      }
    }).some(Boolean)
  , [
    requestFields,
    aiContent.isLoadingCaption,
    aiContent.isLoadingSemantic,
    aiContent.isLoadingTags,
    aiContent.isLoadingTitle,
  ]);

  return (
    <LoaderButton
      icon={<HiSparkles size={16} />}
      onClick={e => {
        if (
          !shouldConfirm ||
          confirm('Are you sure you want to overwrite existing content?')
        ) {
          aiContent.request(requestFields);
        } else {
          e.preventDefault();
        }
      }}
      isLoading={isLoading}
      {...props}
    />
  );
}
