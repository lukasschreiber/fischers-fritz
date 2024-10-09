export function Popup(props: React.ComponentPropsWithoutRef<"div"> & { open: boolean; onClose?: () => void }) {
    return (
        <div className={`${props.open ? "absolute" : "hidden"} top-full left-1/2 -translate-x-1/2`}>
            <div className="mt-2 bg-white text-gray-800 border px-2 py-1 shadow-lg rounded-md">
                {props.children}
            </div>
        </div>
    );
}
