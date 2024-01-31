import dynamic from 'next/dynamic';
import { ImageResize } from 'quill-image-resize-module-ts';

import ReactQuill, { Quill, ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ForwardedQuillComponent extends ReactQuillProps {
    forwardedRef: React.Ref<ReactQuill>;
}

const QuillEditor = dynamic(
    async () => {
        const { default: QuillComponent } = await import('react-quill');
        QuillComponent.Quill.register('modules/imageResize', ImageResize);
        const _Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => {
            const newModules = {...props.modules, imageResize: {
                parchment: Quill.import("parchment"),
                modules: ["Resize", "DisplaySize"],
            }}
            props.modules = newModules;
            return <QuillComponent ref={forwardedRef} {...props} />
        };
        return _Quill;
    },
    { loading: () => <div>...loading</div>, ssr: false },
);

export default QuillEditor;